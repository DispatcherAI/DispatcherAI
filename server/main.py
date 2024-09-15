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

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("WebSocket connection attempt received")
    await websocket.accept()
    try:
        print("WebSocket connected")
        print("Attempting to connect to Redis...")
        redis_client = await get_redis_client()
        print("Redis connection successful")
        
        await websocket.send_text("Connected to Redis")
        
        # Test Redis connection
        try:
            await redis_client.set("test_key", "test_value")
            test_value = await redis_client.get("test_key")
            await websocket.send_text(f"Redis test successful. Retrieved value: {test_value}")
        except Exception as redis_error:
            print(f"Redis test failed: {str(redis_error)}")
            await websocket.send_text(f"Redis test failed: {str(redis_error)}")
        
        except AsyncTimeoutError:
            print("Asyncio timeout occurred")
        except RedisTimeoutError:
            print("Redis timeout occurred")
        
        while True:
            data = await websocket.receive_text()
            print(f"Received data: {data}")
            try:
                await redis_client.set("test_key", data)
                value = await redis_client.get("test_key")
                await websocket.send_text(f"Received and stored in Redis: {value}")
            except Exception as redis_error:
                print(f"Redis operation failed: {str(redis_error)}")
                await websocket.send_text(f"Server received: {data}")
    except Exception as e:
        print(f"Error in websocket_endpoint: {str(e)}")
    finally:
        print("WebSocket disconnected")
        await manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
