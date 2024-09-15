# server/redis_client.py
import redis.asyncio as aioredis
import os

async def get_redis_client():
    try:
        redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379')
        print(f"Connecting to Redis at {redis_url}")
        client = aioredis.from_url(redis_url, decode_responses=True)
        await client.ping()
        print("Redis ping successful")
        return client
    except Exception as e:
        print(f"Error connecting to Redis: {str(e)}")
        raise
