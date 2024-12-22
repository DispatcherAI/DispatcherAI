import json
import os
import asyncio
from dotenv import load_dotenv
from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, PlainTextResponse
from concurrent.futures import TimeoutError as ConnectionTimeoutError
from twilio.twiml.voice_response import VoiceResponse
from retell import Retell
from .custom_types import (
    ConfigResponse,
    ResponseRequiredRequest,
)
from .twilio_server import TwilioClient
from .llm import LlmClient  # or use .llm_with_func_calling
import uuid
from datetime import datetime
from server.db import update_call, get_call, get_all_calls
from server.socket_manager import manager
from server.evals import eval, hume_eval
from server.geocoding import geocode, street_view
from server.db_prisma import (
    get_all_calls, 
    get_call, 
    create_call,
    delete_call, 
    update_call, 
    get_call_analytics, 
    get_call_analytics_for_call, 
    update_call_analytics, 
    upsert_call_analytics,
    update_call_transcript
)


print(os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv(override=True, dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
retell = Retell(api_key=os.environ["RETELL_API_KEY"])

# Custom Twilio if you want to use your own Twilio API Key
twilio_client = TwilioClient()

router = APIRouter(
    prefix="/retell",
    tags=["retell"],
    responses={404: {"description": "Not found"}},
)


# Handle webhook from Retell server. This is used to receive events from Retell server.
# Including call_started, call_ended, call_analyzed
@router.post("/webhook")
async def handle_webhook(request: Request):
    try:
        post_data = await request.json()
        valid_signature = retell.verify(
            json.dumps(post_data, separators=(",", ":")),
            api_key=str(os.environ["RETELL_API_KEY"]),
            signature=str(request.headers.get("X-Retell-Signature")),
        )
        if not valid_signature:
            print(
                "Received Unauthorized",
                post_data["event"],
                post_data["data"]["call_id"],
            )
            return JSONResponse(status_code=401, content={"message": "Unauthorized"})
        if post_data["event"] == "call_started":
            print("Call started event", post_data["data"]["call_id"])
        elif post_data["event"] == "call_ended":
            print("Call ended event", post_data["data"]["call_id"])
        elif post_data["event"] == "call_analyzed":
            print("Call analyzed event", post_data["data"]["call_id"])
        else:
            print("Unknown event", post_data["event"])
        return JSONResponse(status_code=200, content={"received": True})
    except Exception as err:
        print(f"Error in webhook: {err}")
        return JSONResponse(
            status_code=500, content={"message": "Internal Server Error"}
        )

# Twilio voice webhook. This will be called whenever there is an incoming or outgoing call.
# Register call with Retell at this stage and pass in returned call_id to Retell.
@router.post("/twilio-voice-webhook/{agent_id_path}")
async def handle_twilio_voice_webhook(request: Request, agent_id_path: str):
    try:
        # Check if it is machine
        post_data = await request.form()
        if "AnsweredBy" in post_data and post_data["AnsweredBy"] == "machine_start":
            twilio_client.end_call(post_data["CallSid"])
            return PlainTextResponse("")
        elif "AnsweredBy" in post_data:
            return PlainTextResponse("")

        call_response = retell.call.register(
            agent_id=agent_id_path,
            audio_websocket_protocol="twilio",
            audio_encoding="mulaw",
            sample_rate=8000,  # Sample rate has to be 8000 for Twilio
            from_number=post_data["From"],
            to_number=post_data["To"],
            metadata={
                "twilio_call_sid": post_data["CallSid"],
            },
        )
        print(f"Call response: {call_response}")

        response = VoiceResponse()
        start = response.connect()
        start.stream(
            url=f"wss://api.retellai.com/audio-websocket/{call_response.call_id}"
        )
        return PlainTextResponse(str(response), media_type="text/xml")
    except Exception as err:
        print(f"Error in twilio voice webhook: {err}")
        return JSONResponse(
            status_code=500, content={"message": "Internal Server Error"}
        )


# Only used for web call frontend to register call so that frontend don't need api key.
# If you are using Retell through phone call, you don't need this API. Because
# this.twilioClient.ListenTwilioVoiceWebhook() will include register-call in its function.
@router.post("/register-call-on-your-server")
async def handle_register_call(request: Request):
    try:
        post_data = await request.json()
        call_response = retell.call.register(
            agent_id=post_data["agent_id"],
            audio_websocket_protocol="web",
            audio_encoding="s16le",
            sample_rate=post_data[
                "sample_rate"
            ],  # Sample rate has to be 8000 for Twilio
        )
        print(f"Call response: {call_response}")
    except Exception as err:
        print(f"Error in register call: {err}")
        return JSONResponse(
            status_code=500, content={"message": "Internal Server Error"}
        )


@router.websocket("/llm-websocket/{call_id}")
async def websocket_handler(websocket: WebSocket, call_id: str):
    """
    WebSocket to exchange text input/output with Retell server.
    Spawns background tasks for any heavy/eval logic, so the user doesn't wait.
    """
    try:
        db = websocket.app.state.db  # Access the Prisma DB from app state
        await websocket.accept()
        llm_client = LlmClient()

        # Send optional config to Retell server
        config = ConfigResponse(
            response_type="config",
            config={
                "auto_reconnect": True,
                "call_details": True,
            },
            response_id=1,
        )
        await websocket.send_json(config.__dict__)

        # Signal server readiness
        response_id = 0
        first_event = llm_client.draft_begin_message()
        await websocket.send_json(first_event.__dict__)

        # In case we want to overwrite the URL param call_id with the real one from Retell
        call_id = None

        async def handle_message(request_json):
            nonlocal call_id
            nonlocal response_id

            interaction_type = request_json["interaction_type"]

            if interaction_type == "call_details":
                # We learn about the call details early
                print(json.dumps(request_json, indent=2))
                from_number = request_json["call"]["from_number"]
                call_id = request_json["call"]["call_id"]
                print("Caller number:", from_number)

                user = await db.user.find_first(where={"phoneNumber": from_number})
                print("User:", user)
                await create_call(db, call_id, user.id)
                if not user:
                    # Not registered => end call with TTS message
                    res = {
                        "response_id": request_json["response_id"] + 1,
                        "content": "This number is not registered. Please register a free account with this number.",
                        "content_complete": True,
                        "end_call": True,
                    }
                    await websocket.send_json(res)
                    
                return

            elif interaction_type == "ping_pong":
                # Keep connection alive, typical for Retell
                await websocket.send_json({
                    "response_type": "ping_pong",
                    "timestamp": request_json["timestamp"]
                })
                return

            elif interaction_type == "update_only":
                # Update transcript in DB (non-blocking I/O, minimal)
                await update_call_transcript(db, call_id, json.dumps(request_json))
                return

            elif interaction_type in ("response_required", "reminder_required"):
                response_id = request_json["response_id"]
                req_obj = ResponseRequiredRequest(
                    interaction_type=request_json["interaction_type"],
                    response_id=response_id,
                    transcript=request_json["transcript"],
                )
                print(
                    f"Received {interaction_type}, response_id={response_id}, "
                    f"last_transcript={request_json['transcript'][-1]['content']}"
                )

                # Draft the LLM response (user hears it immediately)
                response_completed = True
                async for event in llm_client.draft_response(req_obj):
                    await websocket.send_json(event.__dict__)
                    if req_obj.response_id < response_id:
                        # A new request started, abandon this one
                        response_completed = False
                        break

                # If we successfully responded, we do post-processing
                if response_completed and call_id:

                    # Offload the heavier tasks (eval, hume_eval, analytics) to a background task
                    # so we don't block the websocket from receiving more messages
                    transcript_copy = request_json["transcript"][:]
                    asyncio.create_task(
                        run_eval_and_analytics(db, call_id, transcript_copy)
                    )

        async for data in websocket.iter_json():
            # For each incoming message from Retell, handle it in a separate task
            asyncio.create_task(handle_message(data))

    except WebSocketDisconnect:
        print(f"LLM WebSocket disconnected for {call_id}")
    except ConnectionTimeoutError as e:
        print(f"Connection timeout error for {call_id}")
    except Exception as e:
        print(f"Error in LLM WebSocket: {e} for {call_id}")
        await websocket.close(1011, "Server error")
    finally:
        print(f"LLM WebSocket connection closed for {call_id}")

# ----------------------------------------------------------
# A separate async function that does the heavier evaluation
# and analytics logic without blocking the main handler.
# ----------------------------------------------------------
async def run_eval_and_analytics(db, call_id: str, transcript: list):
    try:
        if not transcript:
            print("No transcript, nothing to eval.")
            return
        
        print("Running eval and analytics for call", call_id, "\n")

        # 1) Get current call data (if you need it)
        #    Assuming get_call is async; if not, wrap in to_thread
        call_analytics = await get_call_analytics(db, call_id)
        current_data = {
            "recommendation": getattr(call_analytics, 'recommendation', ''),
            "severity": getattr(call_analytics, 'severity', ''),
            "type": getattr(call_analytics, 'type', ''),
            "name": getattr(call_analytics, 'name', ''),
            "title": getattr(call_analytics, 'title', ''),
            "summary": getattr(call_analytics, 'summary', ''),
            "location_name": getattr(call_analytics, 'location', '')
        }
        current_data_str = json.dumps(current_data)
        
        print("Call data", current_data_str, "\n")

        # 2) Evaluate the last user content
        last_content = transcript[-1]["content"]
        
        print("Last content", last_content, "\n")
        # hume_eval and eval are presumably async; if not, wrap with to_thread
        hume_task = hume_eval(last_content)
        eval_task = eval(last_content, current_data_str)
        results = await asyncio.gather(hume_task, eval_task)

        updated_data = {
            "emotions": results[0],
            **results[1],
        }
        
        # 3) Geocode if needed
        if updated_data.get("location_name"):
            geo_result = geocode(updated_data["location_name"])
            if geo_result and len(geo_result) > 0 and "geometry" in geo_result[0]:
                updated_data["location_coords"] = geo_result[0]["geometry"]["location"]
                lat = updated_data["location_coords"]["lat"]
                lng = updated_data["location_coords"]["lng"]
                updated_data["street_view"] = street_view(lat, lng)    
        

        # 4) Upsert analytics (one-to-one with call)
        await upsert_call_analytics(
            db,
            call_analytics_id=call_analytics.id,
            call_id=call_id,
            updated_data={
                "severity": updated_data.get("severity"),
                "summary": updated_data.get("summary"),
                "sentiment": json.dumps(updated_data.get("emotions", {})),
                "topics": updated_data.get("topics", []),
                "location": updated_data.get("location_name"),
                "latitude": updated_data.get("location_coords", {}).get("lat"),
                "longitude": updated_data.get("location_coords", {}).get("lng"),
                "name": updated_data.get("name"),
                "address": updated_data.get("location_name"),
                "recommendation": updated_data.get("recommendation"),
                "streetView": updated_data.get("street_view"),
            }
        )

        print(f"[{call_id}] Background eval/analytics completed successfully.")

    except Exception as exc:
        print(f"Error in background eval for call {call_id} at line {exc.__traceback__.tb_lineno}: {exc}")