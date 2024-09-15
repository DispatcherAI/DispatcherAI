import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from server.socket_manager import manager
from server.redis_client import get_redis_client

from server.retell.server import router as retell_router
from server.hume.agent import router as hume_router
from server.db import get_call
from server.retell.twilio_server import TwilioClient

# Import the necessary function from the db module
from server.db import get_all_calls

from redis.asyncio import Redis
from redis.exceptions import TimeoutError as RedisTimeoutError

class CustomTimeoutError(Exception):
    pass

app = FastAPI()
client = TwilioClient()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#? test data
async def populate_test_data():
    redis_client = await get_redis_client()
    sample_data = {
        #? sample data based on the Prisma Call Schema
        "call:1": {"id": "1", "location": "123 Main St", "type": "Medical", "severityType": "CRITICAL", "status": "Active"},
        "call:2": {"id": "2", "location": "456 Elm St", "type": "Fire", "severityType": "CRITICAL", "status": "Active"},
        "call:3": {"id": "3", "location": "789 Oak St", "type": "Robbery", "severityType": "CRITICAL", "status": "Resolved"}
    }
    for key, value in sample_data.items():
        value["title"] = f"{value['type']} at {value['location']}"
        await redis_client.hmset(key, value)
    print("Test emergency data populated")

@app.on_event("startup")
async def startup_event():
    await populate_test_data()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        print("WebSocket connected")
        print("Attempting to connect to Redis...")
        redis_client = await get_redis_client()
        
        # Fetch and send initial data
        call_keys = await redis_client.keys("call:*")
        emergency_data = {}
        for key in call_keys:
            call_data = await redis_client.hgetall(key)
            # Fix: Remove decode() calls
            emergency_data[key] = {k: v for k, v in call_data.items()}
        
        await websocket.send_json({
            "type": "initial_data",
            "data": emergency_data
        })

        # ... rest of the websocket logic ...

        await websocket.send_text("Websocket connected to Redis")
        
        #? send test data to redis
        try:
            #fetch all emergency call keys from redis
            call_keys = await redis_client.keys("call:*")

            emergency_data = {}

            for key in call_keys:
                call_data = await redis_client.hgetall(key)
                emergency_data[key] = call_data
            # Send emergency data to the client
            await websocket.send_json({
                "type": "emergency_data",
                "data": emergency_data
            })

            await asyncio.sleep(5) # retrieves data from redis every 5 seconds

           
        except Exception as redis_error:
            print(f"Redis test failed: {str(redis_error)}")
            await websocket.send_text(f"Redis test failed: {str(redis_error)}")
        
        except AsyncTimeoutError: # handle asyncio timeout
            print("Asyncio timeout occurred")
        except RedisTimeoutError: # handle redis timeout
            print("Redis timeout occurred")
        
        print("Entering message loop")
        while True: # while websocket is open (call is ongoing)
            print("Waiting for data...")
            data = await websocket.receive_text() # receive data from websocket
            print(f"Received data: {data}")
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout = 10.0) # use asyncio to handle timeout
                print(f"Received data: {data}")
            except Exception as redis_error:
                print(f"Redis operation failed: {str(redis_error)}")
                await websocket.send_text(f"Server received: {data}")
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"Error in websocket_endpoint: {str(e)}")
    finally:
        print("WebSocket disconnected")
        await manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
