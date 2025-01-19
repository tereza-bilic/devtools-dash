from app.errors.http_code_base_error import HttpCodeBaseError

class NotFoundError(HttpCodeBaseError):
    def __init__(self, message: str = "Not found"):
        super().__init__(message, 404)
