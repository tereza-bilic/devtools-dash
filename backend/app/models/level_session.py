from datetime import datetime
from typing import Optional, List, Dict, Any
from sqlalchemy import DateTime, ForeignKey, JSON, Integer, String, select, func, and_, tuple_
from sqlalchemy.orm import relationship, mapped_column, Mapped
from app.db.base import Base
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.level import CategoryEnum, LevelKey
from app.models.level import get_levels_by_category, get_level_by_key

class LevelSession(Base):
    __tablename__ = "level_session"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    completed: Mapped[bool]
    finish_secret: Mapped[Optional[str]]
    started_at: Mapped[datetime]
    finished_at: Mapped[Optional[datetime]]
    level_key: Mapped[LevelKey] = mapped_column(String, nullable=False)
    level_metadata: Mapped[JSON] = mapped_column(JSON)
    try_count: Mapped[int] = mapped_column(Integer, default=0)

    # Foreign keys
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="level_sessions")

    @property
    def level(self):
        return get_level_by_key(self.level_key)

async def get_level_session_by_id(session: AsyncSession, id: int) -> Optional[LevelSession]:
    return (await session.scalars(select(LevelSession).filter(LevelSession.id == id).limit(1))).first()


async def get_last_completed_level_session(session: AsyncSession, user_id: int, key: str) -> Optional[LevelSession]:
    return (await session.scalars(
        select(LevelSession).filter(LevelSession.user_id == user_id, LevelSession.level_key == key, LevelSession.completed == True).order_by(LevelSession.finished_at.desc()).limit(1)
        )).first()

async def get_level_session_by_user_and_key(session: AsyncSession, user_id: int, level_key: str) -> Optional[LevelSession]:
    return (await session.scalars(
        select(LevelSession).filter(LevelSession.user_id == user_id, LevelSession.level_key == level_key, LevelSession.completed == False).limit(1)
        )).first()

async def get_level_sessions_by_user_id(session: AsyncSession, user_id: int) -> list[LevelSession]:
    return list((await session.scalars(select(LevelSession).filter(LevelSession.user_id == user_id))).all())

async def get_level_sessions_by_user_and_category(session: AsyncSession, user_id: int, category: CategoryEnum) -> list[LevelSession]:
    user_level_sessions = await get_level_sessions_by_user_id(session, user_id)
    category_levels = list(map(lambda level: level.key, get_levels_by_category(category)))
    return list(filter(lambda level_session: level_session.level_key in category_levels, user_level_sessions))

async def create_level_session(session: AsyncSession, levelSession: LevelSession) -> LevelSession:
    session.add(levelSession)
    await session.commit()
    await session.refresh(levelSession)
    return levelSession

async def update_level_session(session: AsyncSession, levelSession: LevelSession) -> LevelSession:
    await session.commit()
    await session.refresh(levelSession)
    return levelSession

async def get_completed_sessions_for_leaderboard(session: AsyncSession) -> list:
    """
    Get completed level sessions data for leaderboard calculations.
    Returns data needed for calculating the leaderboard.
    """
    from app.models.user import User
    from sqlalchemy import select, func, and_

    # Get all completed level sessions with their duration and user nickname
    stmt = (
        select(
            LevelSession.user_id,
            LevelSession.level_key,
            LevelSession.try_count,
            func.extract('epoch', LevelSession.finished_at - LevelSession.started_at).label('duration'),
            User.nickname.label('user_nickname')
        )
        .join(User, LevelSession.user_id == User.id)
        .where(
            and_(
                LevelSession.completed == True,
                LevelSession.finished_at != None
            )
        )
    )

    result = await session.execute(stmt)
    return list(result.fetchall())
