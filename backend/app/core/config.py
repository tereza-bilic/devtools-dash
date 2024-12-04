from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost/devtoolsdash"

    class Config:
        env_file = ".env"

settings = Settings()
