from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,scoped_session
from app.config import settings
from sqlmodel import SQLModel

ACCESS_TOKEN_EXPIRE_MINUTES = 30

engine = create_engine(settings.DB_URL, echo=True)
session_factory   = sessionmaker(autocommit = False, autoflush = False, bind=engine)
db = scoped_session(session_factory)


def create_database():
    return SQLModel.metadata.create_all(bind = engine)





    
