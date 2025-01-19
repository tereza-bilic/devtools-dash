from app.errors.http_code_base_error import HttpCodeBaseError

class ForbiddenError(HttpCodeBaseError):
    def __init__(self, message: str = "Forbidden"):
        super().__init__(message, 403)
