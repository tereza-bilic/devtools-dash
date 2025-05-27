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

LevelKey = Literal["e1", "e2", "e3", "e4", "e5", "e6", "e7", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "s1", "s2", "s3", "c1", "c2", "c3", "s4"]

class Level(BaseModel):
    key: LevelKey
    title: str
    category: CategoryEnum
    order_in_category: int
    difficulty: int
    session_factory: Optional[Callable[[Any], None]] = None


levels: list[Level] = [
    Level(key="e1", title="Hidden in Plain Sight", category=CategoryEnum.Elements, order_in_category=1, difficulty=1),
    Level(key="e2", title="Phantom Elements", category=CategoryEnum.Elements, order_in_category=2, difficulty=1),
    Level(key="e3", title="Labeling Friends", category=CategoryEnum.Elements, order_in_category=3, difficulty=2),
    Level(key="e4", title="Matrix Blues", category=CategoryEnum.Elements, order_in_category=4, difficulty=1, session_factory=e4_initialize_level),
    Level(key="e5", title="Pixel Cipher", category=CategoryEnum.Elements, order_in_category=5, difficulty=1, session_factory=e4_initialize_level),
    Level(key="e6", title="Colorful Secrets", category=CategoryEnum.Elements, order_in_category=6, difficulty=1, session_factory=e6_initialize_level),
    Level(key="e7", title="Aftermath", category=CategoryEnum.Elements, order_in_category=7, difficulty=2),
    Level(key="n1", title="Message in Transit", category=CategoryEnum.Network, order_in_category=1, difficulty=1),
    Level(key="n2", title="WebSocket Whispers", category=CategoryEnum.Network, order_in_category=2, difficulty=2),
    Level(key="n3", title="Digital Fortune", category=CategoryEnum.Network, order_in_category=3, difficulty=3),
    Level(key="n4", title="Slow Connection", category=CategoryEnum.Network, order_in_category=4, difficulty=2),
    Level(key="n5", title="Head Case", category=CategoryEnum.Network, order_in_category=5, difficulty=1),
    Level(key="n6", title="Cache Me If You Can", category=CategoryEnum.Network, order_in_category=6, difficulty=2),
    Level(key="n7", title="Password Protected", category=CategoryEnum.Network, order_in_category=7, difficulty=2),
    Level(key="s1", title="Vanishing Act", category=CategoryEnum.Sources, order_in_category=1, difficulty=1, session_factory=s1_initialize_level),
    Level(key="s2", title="Event Horizon", category=CategoryEnum.Sources, order_in_category=2, difficulty=2, session_factory=s2_initialize_level),
    Level(key="s3", title="Bug Bounty", category=CategoryEnum.Sources, order_in_category=3, difficulty=2),
    Level(key="s4", title="Error Tracker", category=CategoryEnum.Sources, order_in_category=4, difficulty=2),
    Level(key="c1", title="Console Chronicles", category=CategoryEnum.Console, order_in_category=1, difficulty=1),
    Level(key="c2", title="Silent Conversation", category=CategoryEnum.Console, order_in_category=2, difficulty=2),
    Level(key="c3", title="Frame Whisperer", category=CategoryEnum.Console, order_in_category=3, difficulty=2, session_factory=c3_initialize_level),
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
