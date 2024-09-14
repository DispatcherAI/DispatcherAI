# server/redis_client.py
import os
from redis import asyncio as aioredis

async def get_redis_client():
    redis = await aioredis.from_url(f"redis://{os.getenv('REDIS_HOST', 'localhost')}:{os.getenv('REDIS_PORT', 6379)}")
    return redis