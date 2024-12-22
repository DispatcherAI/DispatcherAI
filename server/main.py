from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
from server.socket_manager import manager
from server.retell.server import router as retell_router
from server.hume.agent import router as hume_router
from server.retell.twilio_server import TwilioClient
from contextlib import asynccontextmanager

# Import the necessary function from the db module
from server.db_prisma import (
    get_all_calls, 
    get_call
)

from prisma import Prisma

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Create and connect Prisma
    db = Prisma()
    await db.connect()
    print("Connected to db")
    # 2. Attach the db instance to app.state
    app.state.db = db

    # 3. Yield control back to FastAPI for the app to run
    yield

    # 4. Disconnect Prisma when the app stops
    await db.disconnect()
    print("Disconnected from db")
app = FastAPI(lifespan=lifespan)
client = TwilioClient()

app.include_router(retell_router)
app.include_router(hume_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client_id: Optional[str] = None):
    if client_id is None:
        client_id = websocket.query_params.get("client_id")

    if client_id is None:
        await websocket.close(code=4001)
        return
    
    db = websocket.app.state.db

    # save this client into server memory
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_json()
            event = data["event"]
            print(event)
            if event == "get_db":
                # Retrieve all calls from the database for this specific user_id (client_id)
                all_calls = await get_all_calls(db, client_id)
                message = {
                    "event": "db_response",
                    "data": all_calls,
                }
                # Send the calls data back to the client
                await manager.send_personal_message(message, websocket)
            elif event == "transfer":
                print("Transferring call...", data)
                call_id = data["id"]
                call = await get_call(db, call_id)
                if call and call.get("mode") == "retell":
                    client.transfer_call(call["id"], "+14085858267")

    except WebSocketDisconnect:
        print("Disconnecting...", client_id)
        await manager.disconnect(client_id)
    except Exception as e:
        print("Error:", str(e))
        await manager.disconnect(client_id)


if __name__ == "__main__":
    # uvicorn main:app --reload
    # ws://localhost:8000/ws?client_id=123
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Links
# wss://successful-sari-dispatcherai-4330ee48.koyeb.app/retell/llm-websocket