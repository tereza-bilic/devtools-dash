from typing import Literal, Optional
from pydantic import BaseModel
import enum

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Console = "Console"
    Network = "Network"
    Sources = "Sources"

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

def get_level_by_key(key: str) -> Optional[Level]:
    for level in levels:
        if level.key == key:
            return level
    return None

def get_levels_by_category(category: CategoryEnum) -> list[Level]:
    return [level for level in levels if level.category == category]
