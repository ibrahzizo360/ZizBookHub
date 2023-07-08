import base64
from datetime import datetime
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext
from app.schemas import RegisterSchema
from app.models.users import  Users
from app.models.person import Person
from app.repositories.users_repo import UsersRepository
from app.schemas import LoginSchema, ForgotPasswordSchema
from app.repositories.auth_repo import JWTRepo
from app.database.db_setup import db

# Encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:

    @staticmethod
    def register_service(register: RegisterSchema):

        # Create uuid
        _users_id = str(uuid4())
        _person_id = str(uuid4())
        
        # convert birth date type from frontend str to date
        birth_date = datetime.strptime(register.birth, '%d-%m-%Y')

        # open image profile default to bas64 string
        with open("./app/media/profile.png", "rb") as f:
            image_str = base64.b64encode(f.read())
        image_str = "data:image/png;base64," + image_str.decode('utf-8')

        # mapping request data to class entity table
        _person = Person(id=_person_id, name=register.password, birth=birth_date, sex=register.sex,
                         profile=image_str, phone_number=register.phone_number)

        _users = Users(id=_users_id, username=register.username, email=register.email,
                       password=pwd_context.hash(register.password),
                       person_id=_person_id)



        # Cheking the same username
        _username = UsersRepository.find_by_username(register.username)
        if _username is not None:
            raise HTTPException(
                status_code=400, detail="Username already exists!")

        # Cheking the same email
        _email =  UsersRepository.find_by_email(register.email)
        if _email is not None:
            raise HTTPException(
                status_code=400, detail="Email already exists!")

        else:
            #  insert to tables
            db.add(_users)
            db.add(_person)
            db.commit()
             

    @staticmethod
    async def logins_service(login: LoginSchema):
        _username =  UsersRepository.find_by_username(login.username)

        if _username is not None:
            if not pwd_context.verify(login.password, _username.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password !")
            return JWTRepo(data={"username": _username.username}).generate_token()
        raise HTTPException(status_code=404, detail="Username not found !")

    @staticmethod
    async def forgot_password_service(forgot_password: ForgotPasswordSchema):
        _email = await UsersRepository.find_by_email(forgot_password.email)
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found !")
        await UsersRepository.update_password(forgot_password.email, pwd_context.hash(forgot_password.new_password))


