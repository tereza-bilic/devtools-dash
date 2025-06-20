from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.level import CategoryEnum
from app.db.session import get_db
from app.schemas.user import TokenData
from app.api.utils import get_current_user
from app.services.level import get_user_levels, get_user_levels_by_category
from app.services.level import get_categories_with_progress
from app.schemas.level import LevelResponse, CategoryResponse


router = APIRouter()

@router.get("/categories", response_model=list[CategoryResponse])
async def get_categories(
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
        categories = await get_categories_with_progress(db_session, current_user.user_id)
        return categories


@router.get("/{level_category}", response_model=list[LevelResponse])
async def get_by_category(
    level_category: CategoryEnum,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
        levels = await get_user_levels_by_category(db_session, current_user.user_id, level_category)
        return levels

@router.get("/", response_model=list[LevelResponse])
async def get_all_levels(
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
        levels = await get_user_levels(db_session, current_user.user_id)
        return levels
