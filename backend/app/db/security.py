from datetime import datetime, timedelta, timezone
from jose import jwt

from app.core.config import settings


ALGORITHM = "HS256"


def create_access_token(subject: str, expires_minutes: int = 30) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)

    payload = {
        "sub": subject,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.secret_key,
        algorithm=ALGORITHM,
    )
