from itertools import product
from random import choice, shuffle
from typing import Any


def s2_initialize_level(session: Any) -> None:
    secret = ''.join(choice('AB0123456789') for _ in range(4))
    session.finish_secret = secret
    
def s2_all_combinations() -> list[str]:
    results = [''.join(combination) for combination in product('AB0123456789', repeat=4)]
    shuffle(results)
    return results