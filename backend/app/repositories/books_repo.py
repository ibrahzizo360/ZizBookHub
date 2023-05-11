from database.db_setup import db
from models.books import Books
from repositories.auth_repo import  JWTRepo



class BooksRepository():

    @staticmethod
    def get_all_books():
       return db.query(Books).all()

    @staticmethod
    def find_book_by_id(id: str,):
        return db.query(Books).filter(Books.id == id).first()
    
    @staticmethod
    def update_created_by_value(token,book_id):
        token = JWTRepo.extract_token(token)
        username= token['username']
        db.query(Books).filter(Books.id == book_id).update({"created_by" : username})
        db.commit()
        
    @staticmethod
    def update_files(id, content_file, cover_file ):
        db.query(Books).filter(Books.id == id).update({"bookcontent_file" : content_file, "bookcover_file": cover_file})    
        db.commit()



    