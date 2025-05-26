from pydantic import BaseModel

from app.models.level import CategoryEnum

class LevelResponse(BaseModel):
    level_key: str
    category: CategoryEnum
    order_in_category: int
    difficulty: int
    completed: bool
    in_progress: bool
    duration: int | None = None  # Duration in seconds, optional for in-progress levels

class CategoryResponse(BaseModel):
    name: str
    completed_count: int
    total_count: int
