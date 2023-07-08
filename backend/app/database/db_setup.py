from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,scoped_session
from sqlalchemy.orm import Session
from app.config import settings
from sqlmodel import SQLModel

ACCESS_TOKEN_EXPIRE_MINUTES = 30

engine = create_engine(settings.DATABASE_URL, echo=True)
db = scoped_session(sessionmaker(bind=engine))
metadata = db.metadata


def create_database():
    return SQLModel.metadata.create_all(bind=engine)





    
