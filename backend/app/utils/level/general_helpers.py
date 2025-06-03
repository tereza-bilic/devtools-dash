
import random
import string

def create_secret_generator():
    random_cache = {}
    return lambda length, real_secret_as_seed: random_secret(random_cache, length, real_secret_as_seed)


def random_secret(random_cache: dict, length: int, real_secret_as_seed: str = 'undefined') -> str:
    rnd = random_cache.get(real_secret_as_seed)
    if rnd is None:
        rnd = random.Random()
        if real_secret_as_seed != 'undefined':
            rnd.seed(real_secret_as_seed)
        random_cache[real_secret_as_seed] = rnd
    return ''.join(rnd.choice(string.ascii_letters + string.digits).upper() for _ in range(length))
