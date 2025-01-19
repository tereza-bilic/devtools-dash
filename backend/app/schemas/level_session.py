from pydantic import BaseModel
from datetime import date, datetime

class CompletedLevelResponse(BaseModel):
    id: int
    started_at: datetime
    finished_at: datetime
    level_key: str
