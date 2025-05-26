from pydantic import BaseModel
from typing import Optional, List

class UserLevelPoints(BaseModel):
    level_key: str
    level_name: str
    difficulty: int
    points: float
    best_time: float  # In seconds
    user_best_time: float  # In seconds
    completed_sessions: int

class LeaderboardUserEntry(BaseModel):
    user_id: int
    user_nickname: str
    total_points: float
    levels_completed: int
    level_points: List[UserLevelPoints]

class LeaderboardResponse(BaseModel):
    users: List[LeaderboardUserEntry]
