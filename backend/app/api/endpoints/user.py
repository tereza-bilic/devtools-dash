# from fastapi.security import OAuth2PasswordBearer #no longer needed
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.utils import get_current_user
from app.db.session import get_db
from app.schemas.user import CreatedUserResponse, LoginUserResponse, TokenData
from app.services.user import create_user, login_user

router = APIRouter()


@router.post("/login", response_model=LoginUserResponse)
async def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)):
        login_response = await login_user(db, form_data.username, form_data.password)
        if not login_response:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect nickname or password",
            )
        response.set_cookie(key="access_token",value=f"Bearer {login_response.access_token}", httponly=True)
        return login_response


@router.post("/register", response_model=CreatedUserResponse)
async def register(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)):
    registration_response = await create_user(db,  form_data.username, form_data.password)
    if not registration_response:
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with nickname already exists"
            )
    return registration_response

@router.get(
    "/me",
    response_model=TokenData)
async def get_me(
    current_user: TokenData = Depends(get_current_user)):
    return current_user
