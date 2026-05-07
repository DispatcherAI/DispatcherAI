import json
import os
import asyncio
from dotenv import load_dotenv
from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from concurrent.futures import TimeoutError as ConnectionTimeoutError
from retell import Retell
from .custom_types import (
    ConfigResponse,
    ResponseRequiredRequest,
)
from .llm import LlmClient  # or use .llm_with_func_calling
from server.evals import emotion_eval, eval
from server.phone_numbers import normalize_phone_number
from server.db_prisma import (
    charge_phone_call_credits,
    create_call,
    update_call, 
    get_call_analytics, 
    upsert_call_analytics,
    update_call_transcript
)


load_dotenv(
    dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
)
retell = Retell(api_key=os.environ["RETELL_API_KEY"])

router = APIRouter(
    prefix="/retell",
    tags=["retell"],
    responses={404: {"description": "Not found"}},
)


def get_user_phone_candidates(call: dict) -> list[str]:
    """Return likely registered-user phone numbers from a Retell call payload."""
    from_number = normalize_phone_number(call.get("from_number"))
    to_number = normalize_phone_number(call.get("to_number"))
    retell_number = normalize_phone_number(os.getenv("RETELL_PHONE_NUMBER"))
    direction = str(
        call.get("direction")
        or call.get("call_direction")
        or call.get("call_type")
        or ""
    ).lower()

    is_outbound = "outbound" in direction or (
        bool(retell_number) and from_number == retell_number
    )
    preferred_numbers = (
        [to_number, from_number] if is_outbound else [from_number, to_number]
    )

    candidates = []
    for phone_number in preferred_numbers:
        if not phone_number or phone_number == retell_number:
            continue
        if phone_number not in candidates:
            candidates.append(phone_number)

    return candidates


async def find_registered_user_for_call(db, call: dict):
    metadata = call.get("metadata") or {}
    user_id = metadata.get("user_id") or metadata.get("userId")
    clerk_user_id = metadata.get("clerkUserId") or metadata.get("clerk_user_id")

    if user_id:
        user = await db.user.find_unique(where={"id": user_id})
        if user:
            return user

    if clerk_user_id:
        user = await db.user.find_unique(where={"clerkUserId": clerk_user_id})
        if user:
            return user

    for phone_number in get_user_phone_candidates(call):
        user = await db.user.find_unique(where={"phoneNumber": phone_number})
        if user:
            return user

    return None


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


# Only used for web call frontend to register call so that frontend don't need api key.
@router.post("/register-call-on-your-server")
async def handle_register_call(request: Request):
    try:
        post_data = await request.json()
        call_response = retell.call.register(
            agent_id=post_data["agent_id"],
            audio_websocket_protocol="web",
            audio_encoding="s16le",
            sample_rate=post_data["sample_rate"],
        )
        print(f"Call response: {call_response}")
        return JSONResponse(status_code=200, content=jsonable_encoder(call_response))
    except Exception as err:
        print(f"Error in register call: {err}")
        return JSONResponse(
            status_code=500, content={"message": "Internal Server Error"}
        )


@router.post("/create-phone-call")
async def handle_create_phone_call(request: Request):
    try:
        post_data = await request.json()
        from_number = post_data.get("from_number") or os.environ["RETELL_PHONE_NUMBER"]
        to_number = post_data["to_number"]
        agent_id = post_data.get("agent_id") or os.getenv("RETELL_AGENT_ID")

        call_kwargs = {
            "from_number": from_number,
            "to_number": to_number,
        }
        if agent_id:
            call_kwargs["override_agent_id"] = agent_id
        if post_data.get("retell_llm_dynamic_variables"):
            call_kwargs["retell_llm_dynamic_variables"] = post_data[
                "retell_llm_dynamic_variables"
            ]
        metadata = post_data.get("metadata") or {}
        user_id = post_data.get("user_id") or post_data.get("userId")
        clerk_user_id = post_data.get("clerkUserId") or post_data.get("clerk_user_id")
        if user_id:
            metadata["user_id"] = user_id
        if clerk_user_id:
            metadata["clerkUserId"] = clerk_user_id
        if metadata:
            call_kwargs["metadata"] = metadata

        call_response = retell.call.create_phone_call(**call_kwargs)
        print(f"Phone call response: {call_response}")
        return JSONResponse(status_code=200, content=jsonable_encoder(call_response))
    except Exception as err:
        print(f"Error in create phone call: {err}")
        return JSONResponse(
            status_code=500, content={"message": "Internal Server Error"}
        )


@router.websocket("/llm-websocket/{call_id}")
async def websocket_handler(websocket: WebSocket, call_id: str):
    """
    WebSocket to exchange text input/output with Retell server.
    Spawns background tasks for any heavy/eval logic, so the user doesn't wait.
    """
    call_created = False
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
        call_created = False

        async def handle_message(request_json):
            nonlocal call_id
            nonlocal call_created
            nonlocal response_id

            interaction_type = request_json["interaction_type"]

            if interaction_type == "call_details":
                # We learn about the call details early
                print(json.dumps(request_json, indent=2))
                call = request_json["call"]
                call_id = call["call_id"]
                user_phone_candidates = get_user_phone_candidates(call)
                print("User phone candidates:", user_phone_candidates)

                user = await find_registered_user_for_call(db, call)
                print("User:", user)
                
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

                existing_call = await db.call.find_unique(where={"id": call_id})
                if not existing_call:
                    charged_user = await charge_phone_call_credits(db, user.id)
                    if not charged_user:
                        res = {
                            "response_id": request_json["response_id"] + 1,
                            "content": "No credits remaining. Please add credits to receive phone calls.",
                            "content_complete": True,
                            "end_call": True,
                        }
                        await websocket.send_json(res)
                        return
                    
                await create_call(db, call_id, user.id)
                call_created = True
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
                if call_id:
                    await update_call_transcript(
                        db,
                        call_id,
                        {"transcript": request_json.get("transcript", [])},
                    )
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

                    # Offload the heavier eval/analytics work to a background task
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
        if call_created and call_id:
            await update_call(db, call_id, {"inProgress": False})
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
        last_content = transcript[-1]["content"]
        
        print("Last content", last_content, "\n")
        # Keep analytics on OpenAI so the Retell path only depends on Retell + OpenAI.
        emotion_task = emotion_eval(last_content)
        eval_task = eval(transcript, current_data_str)
        results = await asyncio.gather(emotion_task, eval_task)
        emotions = results[0] if isinstance(results[0], list) else []
        eval_data = results[1] if isinstance(results[1], dict) else {}

        updated_data = {
            "emotions": emotions,
            **eval_data,
        }

        print("Updated data", updated_data, "\n")
        

        # 4) Upsert analytics (one-to-one with call)
        await upsert_call_analytics(
            db,
            call_analytics_id=call_analytics.id,
            call_id=call_id,
            updated_data={
                "type": updated_data.get("type") or None,
                "severity": updated_data.get("severity") or None,
                "summary": updated_data.get("summary"),
                "sentiment": updated_data.get("emotions", []),
                "topics": updated_data.get("topics", []),
                "location": updated_data.get("location_name"),
                "latitude": updated_data.get("location_coords", {}).get("lat"),
                "longitude": updated_data.get("location_coords", {}).get("lng"),
                "name": updated_data.get("name"),
                "title": updated_data.get("title"),
                "address": updated_data.get("location_name"),
                "recommendation": updated_data.get("recommendation"),
                "streetView": updated_data.get("street_view"),
            }
        )

        print(f"[{call_id}] Background eval/analytics completed successfully.")

    except Exception as exc:
        print(f"Error in background eval for call {call_id} at line {exc.__traceback__.tb_lineno}: {exc}")