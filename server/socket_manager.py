from typing import Dict
from fastapi import WebSocket
from server.redis_client import get_redis_client
import logging
import json
import asyncio

logging.basicConfig(level=logging.INFO)

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.redis_client = None

    async def initialize_redis(self):
        if not self.redis_client:
            self.redis_client = await get_redis_client()

    async def connect(self, websocket: WebSocket, client_id: str):
        await self.initialize_redis()
        await websocket.accept()
        self.active_connections[client_id] = websocket
        await self.redis_client.set(client_id, "connected")
        print(f"Client {client_id} connected")

    async def disconnect(self, client_id: str):
        try:
            del self.active_connections[client_id]
            await self.redis_client.delete(client_id)
        except KeyError:
            pass

    async def send_personal_message(self, data: dict, websocket: WebSocket):
        await websocket.send_json(data)

    async def broadcast(self, data: dict):
        await self.initialize_redis()
        await self.redis_client.publish("call_updates", json.dumps(data))
        for connection in self.active_connections.values():
            await connection.send_json(data)

# Create the manager instance, but don't initialize Redis yet
manager = ConnectionManager()

# Add this function to initialize the manager
async def initialize_manager():
    await manager.initialize_redis()