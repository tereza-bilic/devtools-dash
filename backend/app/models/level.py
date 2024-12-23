from sqlalchemy import Column, Enum, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Network = "Network"

class Level(Base):
    id = Column(Integer, primary_key=True, index=True)
    category = Column(Enum(CategoryEnum), nullable=False)
    difficulty = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    order_in_category = Column(Integer, nullable=False)

    # One-to-many relationship with LevelSession
    level_sessions = relationship("LevelSession", back_populates="level")
