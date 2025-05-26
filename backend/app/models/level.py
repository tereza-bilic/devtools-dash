from typing import Any, Callable, Literal, Optional
from pydantic import BaseModel
import enum

from app.utils.level.elements.e4_helpers import e4_initialize_level
from app.utils.level.elements.e6_helpers import e6_initialize_level
from app.utils.level.console.c3_helpers import c3_initialize_level
from app.utils.level.sources.s1_helpers import s1_initialize_level
from app.utils.level.sources.s2_helpers import s2_initialize_level

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Console = "Console"
    Network = "Network"
    Sources = "Sources"
    Performance = "Performance"

LevelKey = Literal["e1", "e2", "e3", "e4", "e5", "e6", "n1", "n2", "n3", "s1", "s2", "s3", "c1", "c2", "c3"]

class Level(BaseModel):
    key: LevelKey
    category: CategoryEnum
    order_in_category: int
    difficulty: int
    session_factory: Optional[Callable[[Any], None]] = None


levels: list[Level] = [
    Level(key="e1", category=CategoryEnum.Elements, order_in_category=1, difficulty=1),
    Level(key="e2", category=CategoryEnum.Elements, order_in_category=2, difficulty=1),
    Level(key="e3", category=CategoryEnum.Elements, order_in_category=3, difficulty=2),
    Level(key="e4", category=CategoryEnum.Elements, order_in_category=4, difficulty=1, session_factory=e4_initialize_level),
    Level(key="e5", category=CategoryEnum.Elements, order_in_category=5, difficulty=1, session_factory=e4_initialize_level),
    Level(key="e6", category=CategoryEnum.Elements, order_in_category=6, difficulty=1, session_factory=e6_initialize_level),
    Level(key="n1", category=CategoryEnum.Network, order_in_category=1, difficulty=1),
    Level(key="n2", category=CategoryEnum.Network, order_in_category=2, difficulty=2),
    Level(key="n3", category=CategoryEnum.Network, order_in_category=3, difficulty=3),
    Level(key="s1", category=CategoryEnum.Sources, order_in_category=1, difficulty=1, session_factory=s1_initialize_level),
    Level(key="s2", category=CategoryEnum.Sources, order_in_category=2, difficulty=2, session_factory=s2_initialize_level),
    Level(key="s3", category=CategoryEnum.Sources, order_in_category=3, difficulty=2),
    Level(key="c1", category=CategoryEnum.Console, order_in_category=1, difficulty=1),
    Level(key="c2", category=CategoryEnum.Console, order_in_category=2, difficulty=2),
    Level(key="c3", category=CategoryEnum.Console, order_in_category=3, difficulty=2, session_factory=c3_initialize_level),
]

def get_level_by_key(key: str) -> Optional[Level]:
    for level in levels:
        if level.key == key:
            return level
    return None

def get_levels_by_category(category: CategoryEnum) -> list[Level]:
    return [level for level in levels if level.category == category]

def get_levels() -> list[Level]:
    return levels
