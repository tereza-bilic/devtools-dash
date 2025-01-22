from typing import Annotated, Any
from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, Response, status
from fastapi.responses import PlainTextResponse, RedirectResponse
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
from app.utils.js_obfuscator import obfuscate

router = APIRouter()

def level_session_templates_context(request: Request) -> dict[str, Any]:
    return {'url_path_for': lambda *a, **kw: request.url_for(*a, **kw).path}


templates = Jinja2Templates(directory="app/templates", context_processors=[level_session_templates_context])

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
            name=f"level_{level_key}/{level_key}.html",
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
            name=f"level_{level_key}/{level_key}.html",
            context={"level_session": level_session, "submitted_secret": secret})
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})

@router.get("/js/{level_key}.js", response_class=PlainTextResponse)
async def get_level_js(request: Request,
    response: Response,
    level_key: LevelKey,
    should_obfuscate: Annotated[bool, Query()] = True,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, level_key)
        obfuscated_files_suffix = "_obfuscated" if should_obfuscate else ""
        rendered = templates.TemplateResponse(request=request, name=f"level_{level_key}/{level_key}{obfuscated_files_suffix}.js", context={"level_session": level_session})
        obfuscated = obfuscate(str(rendered.body, 'utf-8')) if should_obfuscate else rendered.body
        response.headers['Content-Type'] = 'application/javascript'
        return obfuscated
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})

@router.get("/n1_message")
async def get_n1_response(
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, "n1")
        return {"message": "Hello Stranger", "secret": f"{level_session.finish_secret}, keep it secret, keep it safe"}
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
