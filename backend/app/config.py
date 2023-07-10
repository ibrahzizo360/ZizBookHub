import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")


class Settings:
    PROJECT_TITLE: str = "BookMangementSystem"
    PROJECT_VERSION: str = "2.0.0"
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "postgres")
    DB_URL: str = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    DATABASE_URL = os.getenv('DB_URL')
    ALGORITHM = "HS256"
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    SENDGRID_API_KEY: str = os.getenv("SENDGRID_API_KEY")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL")



class Config:
        env_file = './.env'
        
        
settings = Settings()
