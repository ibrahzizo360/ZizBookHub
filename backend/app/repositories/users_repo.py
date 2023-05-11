
from app.models.users import Users
from app.database.db_setup import db
from fastapi import HTTPException


class UsersRepository():

    @staticmethod
    def find_by_username(username: str):
       return db.query(Users).filter(Users.username == username).first()

    @staticmethod
    def find_by_email(email: str,):
        return db.query(Users).filter(Users.email == email).first()

    @staticmethod
    async def update_password(email: str, password: str):
        db.query(Users).filter(Users.email == email).update({"password":password})
        db.commit()
        
    @staticmethod
    def find_email_verified_value(username:str):
        return  db.query(Users.email_verified).filter(Users.username == username).first()
    
    @staticmethod
    def verify_email(email: str):
        db.query(Users).filter(Users.email == email).update({"email_verified" : "true"})
        db.commit()
    
    @staticmethod
    def find_email_by_verificationcode(code:str):
        email = db.query(Users.email).filter(Users.verification_code == code).first()
        if email is None:
            raise HTTPException(
                    status_code=400, detail="Invalid verification code !")
        email = dict(email)
        email = email["email"]
        return email
    
    @staticmethod
    def update_verification_code_value(email:str, code:str):
        db.query(Users).filter(Users.email == email).update({"verification_code" : code})
        db.commit()

        