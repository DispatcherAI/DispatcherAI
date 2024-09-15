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

from redis.asyncio import Redis
from redis.exceptions import TimeoutError as RedisTimeoutError

class CustomTimeoutError(Exception):
    pass

app = FastAPI()

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
    test_data = {
        "911 Call": "911 Call",
        "911 Call 2": "911 Call 2",
        "911 Call 3": "911 Call 3"
    }
    for key, value in test_data.items():
        await redis_client.set(key, value)
    print("Test data populated")

@app.on_event("startup")
async def startup_event():
    await populate_test_data()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket): # testing websocket connection with redis
    print("WebSocket connection attempt received")
    await websocket.accept()
    try:
        print("WebSocket connected")
        print("Attempting to connect to Redis...")
        redis_client = await get_redis_client()
        print("Redis connection successful")
        
        await websocket.send_text("Websocket connected to Redis")
        
        #? send test data to redis
        try:
            for i in range(1,4):
                call_data = await redis_client.get(f"911 Call {i}") # retrieve based on key
                await websocket.send_json({"type": "test_data", "data": call_data}) # return a json of the data
                print(f"Sent call: {i} data to client")
        
        # Test Redis connection
        # try:
        #     await redis_client.set("test_key", "911 Call") # creates a hash map of key-value pairs in redis
        #     test_value = await redis_client.get("test_key")
        #     await websocket.send_text(f"Redis test successful. Retrieved value: {test_value}")
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
