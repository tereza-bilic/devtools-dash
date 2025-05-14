import asyncio
from typing import Annotated, Any
from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, Response, WebSocket, status
from fastapi.responses import HTMLResponse, PlainTextResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import logger
from app.schemas.user import TokenData
from app.db.session import get_db
from app.api.utils import get_current_user
from app.services.level_session import get_completed, submit_level, start_level
from app.models.level import LevelKey
from app.errors.not_found_error import NotFoundError
from app.schemas.level_session import CompletedLevelResponse
from app.errors.http_code_base_error import HttpCodeBaseError
from app.utils.js_obfuscator import obfuscate
from app.utils.level.elements.e4_helpers import convert_to_ascii_matrix
from app.utils.level.sources.s2_helpers import s2_all_combinations
from app.models.level_session import get_level_session_by_id

router = APIRouter()

def level_session_templates_context(request: Request) -> dict[str, Any]:
    return {
        'url_path_for': lambda *a, **kw: request.url_for(*a, **kw).path,
        'level_utils': {
            'e4': {
                'matrix_secret': convert_to_ascii_matrix,
            },
            's2': {
                'all_combinations': s2_all_combinations
            }
        }
    }



templates = Jinja2Templates(directory="app/templates", context_processors=[level_session_templates_context])

@router.get("/completed/{completed_id}", response_model=CompletedLevelResponse)
async def completed(
    request: Request,
    response: Response,
    completed_id: str,
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
            return templates.TemplateResponse(
                request=request,
                name="close.html")
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
    different_filename: Annotated[str, Query()] = "",
    should_obfuscate: Annotated[bool, Query()] = True,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, level_key)
        different_filename_suffix = ("_" + different_filename) if different_filename and "obfuscated" not in different_filename else ""
        obfuscated_files_suffix = "_obfuscated" if should_obfuscate else ""
        rendered = templates.TemplateResponse(request=request, name=f"level_{level_key}/{level_key}{different_filename_suffix}{obfuscated_files_suffix}.js", context={"level_session": level_session})
        obfuscated = obfuscate(str(rendered.body, 'utf-8')) if should_obfuscate else rendered.body
        response.headers['Content-Type'] = 'application/javascript'
        return obfuscated
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})
    
@router.get("/css/{level_key}/{filename}.css", response_class=PlainTextResponse)
async def get_level_css(request: Request,
    response: Response,
    level_key: LevelKey,
    filename: str,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, level_key)
        rendered = templates.TemplateResponse(request=request, name=f"level_{level_key}/{filename}.css", context={"level_session": level_session})
        response.headers['Content-Type'] = 'text/css'
        return rendered.body
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})
    
@router.get("/html/{level_key}/{filename}.html", response_class=HTMLResponse)
async def get_level_html(request: Request,
    response: Response,
    level_key: LevelKey,
    filename: str,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, level_key)
        rendered = templates.TemplateResponse(request=request, name=f"level_{level_key}/{level_key}_{filename}.html", context={"level_session": level_session})
        return rendered.body
    except NotFoundError as e:
        response.status_code = e.status_code
        return templates.TemplateResponse(request=request, name=f"{e.status_code}.html", context={"message": e.message})
    
@router.websocket("/level_n2_ws")
async def websocket_endpoint_n2(
    websocket: WebSocket,
    session_id: Annotated[int, Query()] = 0,
    db_session: AsyncSession = Depends(get_db)):
    await websocket.accept()
    level_session = await get_level_session_by_id(db_session, session_id)
    if level_session is None or level_session.level_key != "n2":
        logger.warning(f"Did not find level session with id {session_id} while starting websocket")
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    _ = await websocket.receive_text()
    await websocket.send_text("{\"message\": \"Hello, I'm a websocket server\"}")
    _ = await websocket.receive_text()
    await websocket.send_text("{\"message\": \"Sure I know the secret. I will send it to you\"}")
    await asyncio.sleep(2)
    await websocket.send_text("{\"secret\": \"" + level_session.finish_secret + "\"}")

@router.get("/n1_message")
async def get_n1_response(
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, "n1")
        return {"message": "Hello Stranger", "secret": f"{level_session.finish_secret}, keep it secret, keep it safe"}
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

@router.get("/n3_response")
async def get_n3_response(
    request: Request,
    reveal_secret: Annotated[bool, Query()] = False,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):
    try:
        level_session = await start_level(db_session, current_user.user_id, "n3")
    
        
        # Create response with money amount
        response = {"money": 300}
        
        return response
    except NotFoundError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)