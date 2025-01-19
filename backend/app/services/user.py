from datetime import datetime, timedelta, timezone
from typing import Optional
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt

from app.models.user import User, get_user_by_nickname, update_db_user, create_db_user
from app.core.config import settings
from app.schemas.user import CreatedUserResponse, LoginUserResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")

    return encoded_jwt

async def login_user(session: AsyncSession, nickname: str, password: str) -> Optional[LoginUserResponse]:
    db_user = await get_user_by_nickname(session, nickname)
    if db_user is None:
        return None

    if not pwd_context.verify(password, db_user.password_hash):
        return None

    db_user.last_login = datetime.now()
    await update_db_user(session, db_user)

    access_token = create_access_token(data={"sub": str(db_user.id), "nick": db_user.nickname})
    result = LoginUserResponse(nickname=db_user.nickname,access_token=access_token)

    return result

async def create_user(session: AsyncSession, nickname: str, password: str) -> Optional[LoginUserResponse]:
    user_with_same_nickname = await get_user_by_nickname(session, nickname)
    if user_with_same_nickname:
        return None

    password_hash = pwd_context.hash(password)
    user = User(nickname=nickname, password_hash=password_hash)
    user = await create_db_user(session, user)

    access_token = create_access_token(data={"sub": str(user.id), "nick": user.nickname})

    return LoginUserResponse(nickname=user.nickname, access_token=access_token)
