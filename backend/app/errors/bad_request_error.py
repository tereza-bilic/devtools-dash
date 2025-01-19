from app.errors.http_code_base_error import HttpCodeBaseError

class BadRequestError(HttpCodeBaseError):
    def __init__(self, message: str = "Bad request"):
        super().__init__(message, 400)
