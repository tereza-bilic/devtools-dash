from typing import Literal, Optional
from pydantic import BaseModel
import enum

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Network = "Network"

LevelKey = Literal['e1', 'e2', 'n1']

class Level(BaseModel):
    key: LevelKey
    category: CategoryEnum
    order_in_category: int
    difficulty: int

levels: list[Level] = [
    Level(key="e1", category=CategoryEnum.Elements, order_in_category=1, difficulty=1),
    Level(key="e2", category=CategoryEnum.Elements, order_in_category=2, difficulty=1),
]

def getLevelByKey(key: str) -> Optional[Level]:
    for level in levels:
        if level.key == key:
            return level
    return None

def getLevelsByCategory(category: CategoryEnum) -> list[Level]:
    return [level for level in levels if level.category == category]
