from typing import Optional
from pydantic import BaseModel
import enum

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Network = "Network"

class Level(BaseModel):
    key: str
    category: CategoryEnum
    order_in_category: int
    difficulty: int

levels: list[Level] = [
    Level(key="demo", category=CategoryEnum.Elements, order_in_category=1, difficulty=1),
    Level(key="other", category=CategoryEnum.Elements, order_in_category=2, difficulty=1),
]

def getLevelByKey(key: str) -> Optional[Level]:
    for level in levels:
        if level.key == key:
            return level
    return None

def getLevelsByCategory(category: CategoryEnum) -> list[Level]:
    return [level for level in levels if level.category == category]
