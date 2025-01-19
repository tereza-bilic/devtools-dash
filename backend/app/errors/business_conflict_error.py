from app.errors.http_code_base_error import HttpCodeBaseError

class BusinessConflictError(HttpCodeBaseError):
    def __init__(self, message: str = "Business Conflict"):
        super().__init__(message, 409)
