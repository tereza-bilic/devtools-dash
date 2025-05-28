from app.core.config import logger
from base64 import b64encode
from typing import Any
from urllib.parse import quote


# transformes the secret so its encoded in base64 then adds a couple letters then splits it into 6 parts and joins them with a dash
def c4_initialize_level(level_session: Any):
    random_6_digit_number = level_session.finish_secret
    encoded = b64encode(str(random_6_digit_number).encode()).decode('utf-8')
    # Add some letters to the encoded string
    noisy = encoded[::-1]

    noisy += 'JOKE'  # Adding some letters to the end
    # Split into 6 parts
    parts = [noisy[i:i+5] for i in range(0, len(noisy), 5)]
    # Join with a dash
    final = '$'.join(parts[:6])

    # URL encode the final string
    encoded_once = quote(final)

    logger.info(f"Initialized C4 level with finish secret: {encoded_once}")
    level_session.level_metadata = {"input_text": encoded_once}
