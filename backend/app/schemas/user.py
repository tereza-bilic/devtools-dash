from pydantic import BaseModel
from datetime import date
from app.models.user import User


class LoginUserResponse(BaseModel):
    nickname: str
    access_token: str

class CreatedUserResponse(BaseModel):
    id: int
    nickname: str

class TokenData(BaseModel):
    user_id: int
    user_nickname: str
