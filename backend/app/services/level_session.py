from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
import random, string

from app.core.config import logger
from app.models.level import get_level_by_key
from app.models.level_session import LevelSession, create_level_session, get_level_session_by_id, get_level_session_by_user_and_key, get_level_sessions_by_user_id, update_level_session
from app.errors.not_found_error import NotFoundError
from app.errors.forbidden_error import ForbiddenError
from app.schemas.level_session import CompletedLevelResponse, LevelSessionResponse

async def get_completed(db_session: AsyncSession, user_id: int, id: int) -> CompletedLevelResponse:
    level_session = await get_level_session_by_id(db_session, id)
    if not level_session or not level_session.completed or not level_session.finished_at:
        raise NotFoundError(f"Level session with id {id} not found or not completed")
    if level_session.user_id != user_id:
        raise ForbiddenError(f"Level session with id {id} does not belong to user {user_id}")
    return CompletedLevelResponse(
        id=level_session.id,
        started_at=level_session.started_at,
        finished_at=level_session.finished_at,
        level_key=level_session.level_key,
        difficulty=level_session.level.difficulty if level_session.level else None,
        try_count=level_session.try_count
        )

async def start_level_public(db_session: AsyncSession, user_id: int, level_key: str) -> LevelSessionResponse:
    level_session = await start_level(db_session, user_id, level_key)
    return LevelSessionResponse(
        id=level_session.id,
        started_at=level_session.started_at,
        finished_at=level_session.finished_at,
        completed=level_session.completed,
        level_key=level_session.level_key
    )

async def start_level(db_session: AsyncSession, user_id: int, level_key: str) -> LevelSession:
    level = get_level_by_key(level_key)
    if not level:
        logger.warning(f"Did not find level with key {level_key} while starting level")
        raise NotFoundError(f"Level with key {level_key} does not exist")
    logger.info(f"Found level with key {level_key} while starting level")

    existing_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    for session in existing_sessions:
        if session.level_key == level_key and not session.completed:
            logger.info(f"Found existing session for user {user_id} and level {level_key}, secret is {session.finish_secret}")
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

    if level.session_factory:
        logger.info(f"Initializing level session for user {user_id} and level {level_key}")
        level.session_factory(level_session)
    logger.info(f"Creating new session for user {user_id} and level {level_key}")
    await create_level_session(db_session, level_session)
    logger.info(f"Created new session for user {user_id} and level {level_key}")
    return level_session

async def submit_level(db_session: AsyncSession, user_id: int, level_key: str, level_secret: str) -> LevelSession:
    level = get_level_by_key(level_key)
    if not level:
        logger.warning(f"Did not find level with key {level_key} while starting level")
        raise NotFoundError(f"Level with key {level_key} does not exist")
    logger.info(f"Found level with key {level_key} while starting level")

    existing_session = await get_level_session_by_user_and_key(db_session, user_id, level_key)

    if not existing_session:
        logger.warning(f"Did not find existing session for user {user_id} and level {level_key}")
        raise NotFoundError(f"No session found for user {user_id} and level {level_key}")


    existing_session.try_count += 1

    if existing_session.finish_secret == level_secret or existing_session.level.is_tutorial:
        existing_session.completed = True
        existing_session.finished_at = datetime.now()
        await update_level_session(db_session, existing_session)
        logger.info(f"Updated session for user {user_id} and level {level_key}")
    else:
        # Even if the solution is incorrect, we still update the try count
        await update_level_session(db_session, existing_session)
        logger.warning(f"Invalid secret for user {user_id} and level {level_key}, user submitted {level_secret}, expected {existing_session.finish_secret}")

    return existing_session

async def get_by_user(db_session: AsyncSession, user_id: int) -> list[LevelSessionResponse]:
    level_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    return [
        LevelSessionResponse(
            id=session.id,
            started_at=session.started_at,
            finished_at=session.finished_at,
            completed=session.completed,
            level_key=session.level_key
        ) for session in level_sessions
    ]
