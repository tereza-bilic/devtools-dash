from sqlalchemy.ext.asyncio import AsyncSession

from app.models.level import CategoryEnum, get_levels, get_levels_by_category
from app.schemas.level import LevelResponse, CategoryResponse
from app.models.level_session import get_level_sessions_by_user_and_category, get_level_sessions_by_user_id

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


async def get_categories_with_progress(db_session: AsyncSession, user_id: int) -> list[CategoryResponse]:
    categories = CategoryEnum.__members__.values()

    response = [CategoryResponse(
        name=category.name,
        # unique list of level keys per category
        completed_count=len(set(
            session.level_key for session in await get_level_sessions_by_user_and_category(db_session, user_id, category) if session.completed
        )),
        total_count=len(get_levels_by_category(category))
    ) for category in categories]
    return response

async def get_user_levels(db_session: AsyncSession, user_id: int) -> list[LevelResponse]:
    user_sessions = await get_level_sessions_by_user_id(db_session, user_id)
    levels = get_levels()
    return [LevelResponse(
        level_key=level.key,
        category=level.category,
        order_in_category=level.order_in_category,
        difficulty=level.difficulty,
        completed=any(session.level_key == level.key and session.completed for session in user_sessions),
        in_progress=any(session.level_key == level.key and not session.completed for session in user_sessions),
        # duration=sum((session.finished_at - session.started_at) for session in user_sessions if session.level_key == level.key and session.completed)
    ) for level in levels]
