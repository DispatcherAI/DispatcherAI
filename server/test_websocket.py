import asyncio
import websockets

async def hello():
    uri = "ws://localhost:8001"
    async with websockets.connect(uri) as websocket:
        print("Connected to WebSocket")
        
        # Wait for the initial connection message
        response = await websocket.recv()
        print(f"Received: {response}")
        
asyncio.get_event_loop().run_until_complete(hello())

