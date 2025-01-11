from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
import random, string

from app.models.level import getLevelByKey
from app.models.level_session import LevelSession, create_level_session, get_level_sessions_by_user_id

async def start_level(db_session: AsyncSession, user_id: int, level_key: str) -> LevelSession:
    level = getLevelByKey(level_key)
    if not level:
        raise ValueError(f"Level with key {level_key} does not exist")

    existing_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    for session in existing_sessions:
        if session.level_key == level_key and not session.completed:
            return session

    level_secret = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    level_session = LevelSession(
        user_id=user_id,
        level_key=level_key,
        started_at=datetime.now(),
        finish_secret=level_secret
    )
    await create_level_session(db_session, level_session)
    return level_session
