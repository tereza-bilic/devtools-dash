from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
async def get_users():
    return [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]

@router.post("/")
async def create_user(user: dict):  # Replace `dict` with a Pydantic schema
    return {"message": f"User {user['name']} created successfully!"}
