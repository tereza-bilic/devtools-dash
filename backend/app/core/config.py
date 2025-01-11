from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost/devtoolsdash"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 720
    SECRET_KEY: str = "VERY_UNSAFE_SECRET"

    class Config:
        env_file = ".env"

settings = Settings()
