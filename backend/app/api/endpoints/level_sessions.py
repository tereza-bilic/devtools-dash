from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/start/{level_key}")
async def create_user(level_key: str):
    return {"message": f"Level {level_key} started successfully!"}
