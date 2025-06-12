from pydantic import BaseModel
from datetime import date, datetime

class CompletedLevelResponse(BaseModel):
    id: int
    started_at: datetime
    finished_at: datetime
    level_key: str
    difficulty: int | None
    try_count: int
    title: str


class LevelSessionResponse(BaseModel):
    id: int
    started_at: datetime
    finished_at: datetime | None
    completed: bool
    level_key: str
    try_count: int | None = 0
