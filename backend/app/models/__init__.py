from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)

    # One-to-many relationship with LevelSession
    level_sessions = relationship("LevelSession", back_populates="user")
