import math
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.level_session import get_completed_sessions_for_leaderboard
from app.models.level import get_level_by_key
from typing import Dict, List
from app.schemas.leaderboard import LeaderboardUserEntry, UserLevelPoints, LeaderboardResponse

async def get_leaderboard(db_session: AsyncSession) -> LeaderboardResponse:
    """
    Calculate the leaderboard for all users.

    Points calculation formula:
    points = Math.ceil(100 * Difficulty / (UserTime / BestTimeForLevel)) - TryCount
    """
    # Get all completed level sessions from the model
    sessions = await get_completed_sessions_for_leaderboard(db_session)

    if not sessions:
        return LeaderboardResponse(users=[])

    sessions = list(filter(lambda s: not get_level_by_key(s.level_key).is_tutorial, sessions))
    # Calculate best times for each level
    best_times = {}
    for session in sessions:
        level_key = session.level_key
        duration = session.duration

        if level_key not in best_times or duration < best_times[level_key]:
            best_times[level_key] = duration

    # Group sessions by user_id and level_key
    user_level_sessions = {}
    user_info = {}

    for session in sessions:
        user_id = session.user_id
        level_key = session.level_key
        level = get_level_by_key(level_key)

        if not level:
            continue

        if user_id not in user_level_sessions:
            user_level_sessions[user_id] = {}
            user_info[user_id] = {
                'user_id': user_id,
                'user_nickname': session.user_nickname
            }

        if level_key not in user_level_sessions[user_id]:
            user_level_sessions[user_id][level_key] = []

        user_level_sessions[user_id][level_key].append({
            'try_count': session.try_count,
            'duration': session.duration,
            'difficulty': level.difficulty,
            'level_name': f"Level {level_key}"
        })

    # Calculate points for each user
    leaderboard_entries = []

    for user_id, levels in user_level_sessions.items():
        total_points = 0
        level_points_list = []

        for level_key, sessions in levels.items():
            level_total_points = 0
            best_time_for_level = best_times[level_key]
            user_best_time = min(session['duration'] for session in sessions)
            total_sessions = len(sessions)
            difficulty = sessions[0]['difficulty']
            level_name = sessions[0]['level_name']

            # Find best session for user for this level
            best_session = min(sessions, key=lambda x: x['duration'])

            best_session_points = math.ceil(
                100 * difficulty / (user_best_time / best_time_for_level)
            ) - best_session['try_count']

            total_points += best_session_points

            level_points_list.append(
                UserLevelPoints(
                    level_key=level_key,
                    level_name=level_name,
                    difficulty=difficulty,
                    points=best_session_points,
                    best_time=best_time_for_level,
                    user_best_time=user_best_time,
                    completed_sessions=total_sessions
                )
            )

        leaderboard_entries.append(
            LeaderboardUserEntry(
                user_id=user_id,
                user_nickname=user_info[user_id]['user_nickname'],
                total_points=total_points,
                levels_completed=len(level_points_list),
                level_points=level_points_list
            )
        )

    # Sort leaderboard by total points in descending order
    leaderboard_entries.sort(key=lambda x: x.total_points, reverse=True)

    return LeaderboardResponse(users=leaderboard_entries)
