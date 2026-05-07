import os
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv()  # Also support a repo-root .env when running from root.

from fastapi.encoders import jsonable_encoder
import asyncio

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
from server.socket_manager import manager
from server.retell.server import router as retell_router
from contextlib import asynccontextmanager

# Import the necessary function from the db module
from server.db_prisma import (
    get_all_calls,
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

app.include_router(retell_router)

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
                # Send initial calls data
                all_calls = await get_all_calls(db, client_id)
                serialized_calls = jsonable_encoder(all_calls)
                message = {
                    "event": "db_response", 
                    "data": serialized_calls,
                }
                await manager.send_personal_message(message, websocket)
                
                # Start periodic updates every 5 seconds
                while True:
                    await asyncio.sleep(5)
                    all_calls = await get_all_calls(db, client_id)
                    serialized_calls = jsonable_encoder(all_calls)
                    message = {
                        "event": "db_response",
                        "data": serialized_calls,
                    }
                    await manager.send_personal_message(message, websocket)
            elif event == "transfer":
                # Retell-managed numbers handle transfers through the Retell agent's
                # Transfer Call tool, not through this backend.
                await manager.send_personal_message(
                    {
                        "event": "transfer_unavailable",
                        "message": "Configure transfer behavior in the Retell agent.",
                    },
                    websocket,
                )

    except WebSocketDisconnect:
        print("Disconnecting...", client_id)
        await manager.disconnect(client_id)
    except Exception as e:
        print(f"Error at line {e.__traceback__.tb_lineno}:", str(e))
        await manager.disconnect(client_id)


if __name__ == "__main__":
    # uvicorn main:app --reload
    # ws://localhost:8000/ws?client_id=123
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Cloud Run production backend:
# https://dispatch-815644024160.us-west1.run.app
