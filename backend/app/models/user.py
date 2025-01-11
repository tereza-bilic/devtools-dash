from datetime import datetime
from typing import Optional
from sqlalchemy import Integer, String, select, DateTime
from sqlalchemy.orm import relationship, mapped_column, Mapped
from app.db.base import Base
from sqlalchemy.ext.asyncio import AsyncSession

class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nickname: Mapped[str]
    password_hash: Mapped[str]
    last_login: Mapped[Optional[datetime]]

    # Relationships
    level_sessions = relationship("LevelSession", back_populates="user")

async def get_user_by_nickname(session: AsyncSession, nickname: str) -> Optional[User]:
    return (await session.scalars(select(User).filter(User.nickname == nickname).limit(1))).first()

async def update_db_user(session: AsyncSession, user: User) -> User:
    await session.commit()
    await session.refresh(user)
    return user

async def create_db_user(session: AsyncSession, user: User) -> User:
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
