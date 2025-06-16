from typing import Annotated
from fastapi import FastAPI, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from app.api.endpoints import users_router, level_sessions_router, level_router, network_levels_router

app = FastAPI(title="devtools_api", version="0.1")

app.include_router(users_router, prefix="/api/user", tags=["User"])
app.include_router(level_sessions_router, prefix="/api/level_session", tags=["Level session"])
app.include_router(network_levels_router, prefix="/api/level/network", tags=["Levels - network"])
app.include_router(level_router, prefix="/api/level", tags=["Level"])

app.mount("/assets", StaticFiles(directory="app/static/assets"), name="static_assets")
app.mount("/images", StaticFiles(directory="app/static/images"), name="static_images")
app.mount("/static", StaticFiles(directory="app/static"), name="static")
@app.get("/{full_path:path}", response_class=HTMLResponse)
async def fallback(request: Request, full_path: str):
    file_path = "app/static/index.html"
    with open(file_path, "r") as file:
        content = file.read()
    return HTMLResponse(content=content)


import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)
