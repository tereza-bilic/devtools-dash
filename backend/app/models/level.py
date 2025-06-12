from typing import Any, Callable, Literal, Optional
from pydantic import BaseModel
import enum

from app.utils.level.elements.e4_helpers import e4_initialize_level
from app.utils.level.elements.e6_helpers import e6_initialize_level
from app.utils.level.console.c3_helpers import c3_initialize_level
from app.utils.level.sources.s1_helpers import s1_initialize_level
from app.utils.level.sources.s2_helpers import s2_initialize_level
from app.utils.level.console.c4_helpers import c4_initialize_level

class CategoryEnum(enum.Enum):
    Elements = "Elements"
    Console = "Console"
    Network = "Network"
    Sources = "Sources"
    Performance = "Performance"

LevelKey = Literal["e1", "e2", "e3", "e4", "e5", "e6", "e7", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "s1", "s2", "s3", "c1", "c2", "c3", "s4", "c4", "e8", "s5", "n8", "e9", "c5", "c6", "e10", "p1", "n9"]

class Level(BaseModel):
    key: LevelKey
    title: str
    category: CategoryEnum
    order_in_category: int
    is_tutorial: bool = False
    difficulty: int
    session_factory: Optional[Callable[[Any], None]] = None


levels: list[Level] = [
    Level(
        key="e1",
        title="Hidden in Plain Sight",
        category=CategoryEnum.Elements,
        order_in_category=1,
        difficulty=1
    ),
    Level(key="e2", title="Phantom Elements", category=CategoryEnum.Elements, order_in_category=2, difficulty=1),
    Level(key="e3", title="Labeling Friends", category=CategoryEnum.Elements, order_in_category=3, difficulty=3),
    Level(key="e4", title="Blues Clues", category=CategoryEnum.Elements, order_in_category=4, difficulty=1, session_factory=e4_initialize_level),
    Level(key="e5", title="Paint the Town Red", category=CategoryEnum.Elements, order_in_category=5, difficulty=1, session_factory=e4_initialize_level),
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
    Level(key="s3", title="Retracing the Steps", category=CategoryEnum.Sources, order_in_category=3, difficulty=2),
    Level(key="s4", title="Error Tracker", category=CategoryEnum.Sources, order_in_category=4, difficulty=2),
    Level(key="c1", title="Console Chronicles", category=CategoryEnum.Console, order_in_category=1, difficulty=1),
    Level(key="c2", title="Silent Conversation", category=CategoryEnum.Console, order_in_category=2, difficulty=2),
    Level(key="c3", title="Frame Whisperer", category=CategoryEnum.Console, order_in_category=3, difficulty=3, session_factory=c3_initialize_level),
    Level(key="c4", title="Evaluation Station", category=CategoryEnum.Console, order_in_category=4, difficulty=3, session_factory=c4_initialize_level),
    Level(key="e8", title="Join The Dark Side", category=CategoryEnum.Elements, order_in_category=8, difficulty=2),
    Level(key="s5", title="Only When It's Right", category=CategoryEnum.Sources, order_in_category=5, difficulty=2),
    Level(key="n8", title="The Initiation", category=CategoryEnum.Network, order_in_category=8, difficulty=2),
    Level(key="e9", title="Spring Cleaning", category=CategoryEnum.Elements, order_in_category=9, difficulty=1),
    Level(key="c5", title="Saving Variables", category=CategoryEnum.Console, order_in_category=5, is_tutorial=True, difficulty=1),

    Level(key="c6", title="Logs", category=CategoryEnum.Console, order_in_category=6, is_tutorial=True, difficulty=1),

    Level(key="e10", title="The Boxes - Flex 'n' Grid", category=CategoryEnum.Elements, order_in_category=10, is_tutorial=True, difficulty=1),

    Level(key="p1", title="Shifting around", category=CategoryEnum.Performance, order_in_category=1, difficulty=2),

    Level(key="n9", title="Respond To Me", category=CategoryEnum.Network, order_in_category=9, difficulty=2),
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
