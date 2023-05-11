from typing import List, Optional
from sqlalchemy import Column, String , BLOB
from sqlmodel import SQLModel, Field, Relationship
from models.mixins import TimeMixin
from datetime import date


class Books(SQLModel,TimeMixin,table=True):
    __tablename__= "books"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    ISBN : str = Field(sa_column=Column("ISBN", String))
    title: str = Field(sa_column=Column("title", String))
    author: str = Field(sa_column=Column("author", String))
    created_by: str = Field(sa_column=Column("created_by", String, default=None))
    genre: str
    date_published: date
    bookcover_file: str
    bookcontent_file:str

    
    
    





    
    

