from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.level import CategoryEnum
from app.db.session import get_db
from app.schemas.user import TokenData
from app.api.utils import get_current_user
from app.services.level import get_user_levels_by_category
from app.schemas.level import LevelResponse

router = APIRouter()


@router.get("/")
async def greeting(request: Request):
    return {"message": "Hello, stranger!"}
