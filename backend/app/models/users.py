from typing import  Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from app.models.mixins import TimeMixin


class Users(SQLModel,TimeMixin,table=True):
    __tablename__= "users"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    username: str = Field(sa_column=Column("username", String, unique=True))
    email: str = Field(sa_column=Column("email", String, unique=True))
    password: str
    verification_code: str = Field(sa_column=Column("verification_code", String, default=None))
    email_verified: bool = Field(sa_column=Column("email_verified", String, default="false"))
    
    
    person_id: Optional[str] = Field(default=None, foreign_key="person.id")
    person: Optional["Person"] = Relationship(back_populates="users")
    
    

