import base64
from datetime import datetime
from uuid import uuid4
from app.repositories.books_repo import *
from app.database.db_setup import db
import random
from fastapi import Security

# Generate a 10-digit random number
isbn = ''.join(str(random.randint(0, 9)) for _ in range(10))


class BookService:

    @staticmethod
    def register_book(
        bookcover_file,
        bookcontent_file ,
        title,
        author ,
        genre,
        date_published
    ):
        # writing files to disk
        bookcontent_file_location = f"book_files/bookfile_uploads/{bookcontent_file.filename}"
        with open(bookcontent_file_location, "wb+") as file_object:
            file_object.write(bookcontent_file.file.read())
        bookcover_file_location = f"book_files/bookcover_uploads/{bookcover_file.filename}"    
        with open(bookcover_file_location, "wb+") as file_object:
            file_object.write(bookcover_file.file.read()) 
            
        # open image file default to bas64 string
        with open(bookcover_file_location, "rb") as file_object:
                cover_image_str = base64.b64encode(file_object.read())    
            
        cover_image_str = "data:image;base64,"+cover_image_str.decode('utf-8')   
        bookcontent_file_path =f"http://localhost:8000/books/{bookcontent_file.filename}"
            
        _book_id = str(uuid4())
        _book_isbn = ''.join(str(random.randint(0, 9)) for _ in range(10))
        
        # convert book date type from frontend str to date
        book_published_date = datetime.strptime(date_published, '%d-%m-%Y')  
        
        #adding books to db  
        book = Books(id= _book_id, title= title, author=author, genre=genre,date_published= book_published_date,
                    bookcontent_file=bookcontent_file_path, bookcover_file = cover_image_str,ISBN=_book_isbn)
        
        db.add(book)
        db.commit()
        return _book_id
        
    @staticmethod
    def delete_book(book):
        db.delete(book)
        db.commit()

        
    @staticmethod
    def update_book(id,book) :
        db.query(Books).filter(Books.id == id).update({"title": book.title, "author": book.author, "genre": book.genre, "date_published": book.date_published})
        db.commit()
    
