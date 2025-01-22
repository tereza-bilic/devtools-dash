from base64 import b64encode
from random import randint
from typing import Any

def s1_hash_function(num):
    x = num * 9301 + 49297
    x = x % 233280
    x = x * 3
    return b64encode(str(x).encode()).decode()[:6].upper()


def s1_intialize_level(level_session: Any):
    random_5_digit_number = randint(10000, 99999)
    level_session.finish_secret = s1_hash_function(random_5_digit_number)
    level_session.level_metadata = {"input_number": random_5_digit_number}
