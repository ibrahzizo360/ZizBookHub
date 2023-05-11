
from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional
from pydantic import BaseModel, validator
from sqlalchemy import false
from app.models.person import Sex


T = TypeVar('T')

# get root logger
logger = logging.getLogger(__name__)


class RegisterSchema(BaseModel):

    username: str
    email: str
    name: str
    password: str
    phone_number: str
    birth: str
    profile: str = "base64"
    sex : Sex


    # phone number validation

    @validator("phone_number")
    def phone_validation(cls, v):
        logger.debug(f"phone in 2 validatior: {v}")

        # regex phone number
        regex = r"^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,6}$"
        if v and not re.search(regex, v, re.I):
            raise HTTPException(status_code=400, detail="Invalid input phone number!")
        return v



class LoginSchema(BaseModel):
    username: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email: str
    new_password: str


class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None


class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None
 

class EmailVerificationSchema(BaseModel):
    verification_code : str 
    
    
class BookSchema(BaseModel):
    title: str
    author: str
    genre: str
    date_published: str

    
    