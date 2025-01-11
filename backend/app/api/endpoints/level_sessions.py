from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user import TokenData
from app.db.session import get_db
from app.api.utils import get_current_user
from app.services.level_session import start_level
from app.models.level_session import LevelSession
from app.models.level import LevelKey

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")


@router.get("/play/{level_key}")
async def play_level(
    request: Request,
    level_key: str,
    response: Response,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, level_key)
        return templates.TemplateResponse(
            request=request,
            name=f"level_{level_key}.html",
            context={"level_session": level_session})
    except ValueError as e:
        response.status_code = status.HTTP_404_NOT_FOUND
        return templates.TemplateResponse(request=request, name="404.html", context={"level_key": level_key})
