from typing import AsyncGenerator
import redis.asyncio as aioredis
from app.core.config import settings

redis_pool = aioredis.ConnectionPool.from_url(
    settings.redis_url,
    encoding="utf-8",
    decode_responses=True,
    max_connections=20,
)


async def get_redis_client() -> AsyncGenerator[aioredis.Redis, None]:
    client = aioredis.Redis(connection_pool=redis_pool)
    try:
        yield client
    finally:
        await client.close()
