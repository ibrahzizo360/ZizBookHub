from sqlalchemy.future import select
from models import Users, Person
from database.db_setup import db 


class UserService:
    @staticmethod
    async def get_user_profile(username:str):
        query = select(Users.username, 
                        Users.email, 
                        Person.name, 
                        Person.birth,
                        Person.sex,
                        Person.phone_number,
                        Person.profile
                       ).join_from(Users,Person).where(Users.username == username)
        return( db.execute(query)).mappings().one()
    
   

        
        
        
