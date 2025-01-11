from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
import random, string

from app.core.config import logger
from app.models.level import getLevelByKey
from app.models.level_session import LevelSession, create_level_session, get_level_sessions_by_user_id

async def start_level(db_session: AsyncSession, user_id: int, level_key: str) -> LevelSession:
    level = getLevelByKey(level_key)
    if not level:
        logger.warning(f"Did not find level with key {level_key} while starting level")
        raise ValueError(f"Level with key {level_key} does not exist")
    logger.info(f"Found level with key {level_key} while starting level")

    existing_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    for session in existing_sessions:
        if session.level_key == level_key and not session.completed:
            logger.info(f"Found existing session for user {user_id} and level {level_key}")
            return session

    level_secret = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    level_session = LevelSession(
        user_id=user_id,
        completed=False,
        level_key=level_key,
        level_metadata={},
        started_at=datetime.now(),
        finish_secret=level_secret
    )
    logger.info(f"Creating new session for user {user_id} and level {level_key}")
    await create_level_session(db_session, level_session)
    logger.info(f"Created new session for user {user_id} and level {level_key}")
    return level_session
