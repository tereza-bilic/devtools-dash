from random import choice
from typing import Any


numbers_matrices: dict[str, list[str]] = {
    "0": [
        " 111111 ",
        "1      1",
        "1      1",
        "1      1",
        "1      1",
        "1      1",
        " 111111 ",
        "        ",
    ],
    "1": [
        "      11",
        "     1 1",
        "    1  1",
        "       1",
        "       1",
        "       1",
        "       1",
        "        ",
    ],
    "2": [
        " 111111 ",
        "1      1",
        "       1",
        "      1 ",
        "     1  ",
        "    1   ",
        " 111111 ",
        "        ",
    ],
    "3": [
        " 111111 ",
        "1      1",
        "       1",
        "      1 ",
        "       1",
        "1      1",
        " 111111 ",
        "        ",
    ],
    "4": [
        "1      1",
        "1      1",
        "1      1",
        " 111111 ",
        "       1",
        "       1",
        "       1",
        "        ",
    ],
    "5": [
        " 111111 ",
        "1       ",
        "1       ",
        " 111111 ",
        "       1",
        "       1",
        " 111111 ",
        "        ",
    ],
    "6": [
        " 111111 ",
        "1       ",
        "1       ",
        " 111111 ",
        "1      1",
        "1      1",
        " 111111 ",
        "        ",
    ],
    "7": [
        " 111111 ",
        "1      1",
        "       1",
        "      1 ",
        "     1  ",
        "    1   ",
        "   1    ",
        "        ",
    ],
    "8": [
        " 111111 ",
        "1      1",
        "1      1",
        " 111111 ",
        "1      1",
        "1      1",
        " 111111 ",
        "        ",
    ],
    "9": [
        " 111111 ",
        "1      1",
        "1      1",
        " 111111 ",
        "       1",
        "       1",
        " 111111 ",
        "        ",
    ]
}

def e4_initialize_level(session: Any) -> None:
    secret = ''.join(choice(list(numbers_matrices.keys())) for _ in range(6))
    session.finish_secret = secret

def convert_to_ascii_matrix(secret: str) -> list[list[bool]]:
    ascii_matrix = []
    height = len(numbers_matrices["0"])
    for row in range(height):
        ascii_row = []
        for char in secret:
            ascii_row.extend(list(map(lambda c: c != ' ', numbers_matrices[char][row])))
            ascii_row.append(False)
        ascii_matrix.append(ascii_row)
    return ascii_matrix