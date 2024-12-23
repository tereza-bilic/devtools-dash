from typing import Annotated
from fastapi import FastAPI, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel


app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")

class UserGreetRequest(BaseModel):
    first_name: str
    last_name: str

class UserGreetResponse(BaseModel):
    message: str

@app.get("/greet", response_class=HTMLResponse)
async def greet_user(request: Request, user: Annotated[UserGreetRequest, Query()]):
    return templates.TemplateResponse(request=request, name="demo.html", context={"user": user})
