from typing import Annotated
from fastapi import APIRouter, Depends, Form, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user import TokenData
from app.db.session import get_db
from app.api.utils import get_current_user
from app.services.level_session import get_completed, submit_level, start_level
from app.models.level import LevelKey
from app.errors.not_found_error import NotFoundError
from app.schemas.level_session import CompletedLevelResponse
from app.errors.http_code_base_error import HttpCodeBaseError

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/completed/{completed_id}", response_model=CompletedLevelResponse)
async def completed(
    request: Request,
    response: Response,
    completed_id: int,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await get_completed(db_session, current_user.user_id, completed_id)
        return level_session
    except HttpCodeBaseError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

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
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})

@router.post("/play/{level_key}")
async def submit(
    request: Request,
    response: Response,
    level_key: str,
    secret: Annotated[str, Form()],
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await submit_level(db_session, current_user.user_id, level_key, secret)
        if level_session.completed:
            return RedirectResponse(url=f'/completed?completed_id={level_session.id}', status_code=status.HTTP_303_SEE_OTHER)
        return templates.TemplateResponse(
            request=request,
            name=f"level_{level_key}.html",
            context={"level_session": level_session, "submitted_secret": secret})
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})
