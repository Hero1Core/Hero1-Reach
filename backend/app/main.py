from fastapi import FastAPI
from app.routers import youtube

app = FastAPI(title="Hero1 API")

app.include_router(youtube.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Hero1 API is running"}
