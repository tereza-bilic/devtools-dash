from sqlalchemy.ext.asyncio import AsyncSession

from app.models.level import CategoryEnum, get_levels_by_category
from app.schemas.level import LevelResponse
from app.models.level_session import get_level_sessions_by_user_id

async def get_user_levels_by_category(db_session: AsyncSession, user_id: int, category: CategoryEnum) -> list[LevelResponse]:
    user_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    levels_in_category = get_levels_by_category(category)

    return [LevelResponse(
        level_key=level.key,
        category=level.category,
        order_in_category=level.order_in_category,
        difficulty=level.difficulty,
        completed=any(session.level_key == level.key and session.completed for session in user_sessions),
        in_progress=any(session.level_key == level.key and not session.completed for session in user_sessions)
    ) for level in levels_in_category]
