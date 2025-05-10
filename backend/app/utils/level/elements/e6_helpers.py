from random import choice
from typing import Any


def e6_initialize_level(session: Any) -> None:
    secret = ''.join(choice('ABCDEF0123456789') for _ in range(6))
    session.finish_secret = secret
    