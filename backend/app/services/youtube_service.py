from typing import Any, Dict

import httpx

RAPIDAPI_HOST = "youtube138.p.rapidapi.com"
RAPIDAPI_KEY = "8d292a3bcbmsh7ef42a0ef7e2496p1ab321jsnda6446a205bf"

CHANNEL_DETAILS_URL = "https://youtube138.p.rapidapi.com/channel/details/"
CHANNEL_VIDEOS_URL = "https://youtube138.p.rapidapi.com/channel/videos/"


async def get_full_channel_data(channel_id: str) -> Dict[str, Any]:
    headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
    }

    channel_payload = {"id": channel_id}
    videos_payload = {
        "id": channel_id,
        "filter": "videos_latest",
        "cursor": "",
        "hl": "en",
        "gl": "US",
    }

    timeout = httpx.Timeout(10.0, read=30.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            # طلب تفاصيل القناة
            resp_channel = await client.post(
                CHANNEL_DETAILS_URL, headers=headers, json=channel_payload
            )
            resp_channel.raise_for_status()
            channel_data = resp_channel.json()

            # طلب آخر الفيديوهات
            resp_videos = await client.post(
                CHANNEL_VIDEOS_URL, headers=headers, json=videos_payload
            )
            resp_videos.raise_for_status()
            videos_data = resp_videos.json()

            return {"channel": channel_data, "videos": videos_data}

        except (httpx.RequestError, httpx.HTTPStatusError):
            return {"error": "فشل الاتصال"}
        except Exception:
            return {"error": "فشل الاتصال"}
