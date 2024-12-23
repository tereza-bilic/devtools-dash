# Models need to be included here to be migrated
from app.models.level import Level
from app.models.level_session import LevelSession
from app.models.user import User

# Read me:
# To create alembic migration use:
# alembic revision --autogenerate -m "Migration name"

# To upgrade database to latest migration use:
# alembic upgrade head
