from typing import Annotated
from fastapi import FastAPI, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from app.api.endpoints import users_router, level_sessions_router

app = FastAPI(title="devtools_api", version="0.1")

app.include_router(users_router, prefix="/user", tags=["User"])
app.include_router(level_sessions_router, prefix="/level_session", tags=["Level session"])

app.mount("/static", StaticFiles(directory="app/static"), name="static")

import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)
