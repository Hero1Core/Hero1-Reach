from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.youtube_service import get_full_channel_data

router = APIRouter()

@router.get("/youtube/{channel_id}")
async def get_channel(channel_id: str):
    try:
        result = await get_full_channel_data(channel_id)
        if isinstance(result, dict) and result.get("error"):
            return JSONResponse(content={"error": "فشل"}, status_code=500)
        return result
    except Exception:
        return JSONResponse(content={"error": "فشل"}, status_code=500)
