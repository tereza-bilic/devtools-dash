from sqlalchemy import Column, Boolean, DateTime, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base

class LevelSession(Base):
    id = Column(Integer, primary_key=True, index=True)
    completed = Column(Boolean, default=False)
    started_at = Column(DateTime, nullable=False)
    finished_at = Column(DateTime, nullable=True)
    level_metadata = Column(JSON)

    # Foreign keys
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    level_id = Column(Integer, ForeignKey("level.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="level_sessions")
    level = relationship("Level", back_populates="level_sessions")
