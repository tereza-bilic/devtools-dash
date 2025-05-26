import asyncio
import time
from typing import Annotated, Any
from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, Response, WebSocket, status
from fastapi.responses import HTMLResponse, PlainTextResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import logger
from app.schemas.user import TokenData
from app.db.session import get_db
from app.api.utils import get_current_user
from app.services.level_session import get_by_user, get_completed, submit_level, start_level, start_level_public
from app.services.leaderboard import get_leaderboard
from app.models.level import LevelKey
from app.errors.not_found_error import NotFoundError
from app.schemas.level_session import CompletedLevelResponse, LevelSessionResponse
from app.schemas.leaderboard import LeaderboardResponse
from app.errors.http_code_base_error import HttpCodeBaseError
from app.utils.js_obfuscator import obfuscate
from app.utils.level.elements.e4_helpers import convert_to_ascii_matrix
from app.utils.level.sources.s2_helpers import s2_all_combinations
from app.models.level_session import get_level_session_by_id, get_level_sessions_by_user_id

router = APIRouter()


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
    if level_session.finish_secret:
        await websocket.send_text("{\"secret\": \"" + level_session.finish_secret + "\"}")
    else:
        await websocket.send_text("{\"secret\": \"\"}")

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

@router.get("/n4_response")
async def get_n4_secret(
    request: Request,
    db_session: AsyncSession = Depends(get_db),
    current_user: TokenData = Depends(get_current_user)):

    await asyncio.sleep(0.5)  # Simulate some processing delay

    return "Was it slow enough?"
