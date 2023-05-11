from fastapi import APIRouter,Request,File,UploadFile,Form
from fastapi.responses import FileResponse
from app.schemas import ResponseSchema, BookSchema
from app.services.books import BookService
from app.repositories.books_repo import BooksRepository
import os

router = APIRouter(
    prefix="/books",
    tags=['books']
)

@router.get("/", response_model=ResponseSchema, response_model_exclude_none=False)
async def get_all_books():
    books = BooksRepository.get_all_books()
    return ResponseSchema(detail="Book fetched successfully!", result=books)


@router.post("/" ,response_model=ResponseSchema, response_model_exclude_none=False)
async def register_book(request: Request,
    bookcontent_file: UploadFile = File(...),
    bookcover_file: UploadFile = File(...),
    title: str = Form(...),
    author: str = Form(...),
    genre: str = Form(...),
    date_published: str = Form(...),):
    token = request.cookies.get("access_token")
    _book_id = BookService.register_book(
        bookcover_file = bookcover_file,
        bookcontent_file = bookcontent_file,
        title = title,
        author = author,
        genre = genre,
        date_published = date_published
    )
    BooksRepository.update_created_by_value(token, _book_id)
    return ResponseSchema(detail="Book added successfully!")

@router.delete("/{bookId}", response_model=ResponseSchema, response_model_exclude_none=False)
async def delete_book(bookId):
    book = BooksRepository.find_book_by_id(bookId)
    BookService.delete_book(book)
    return ResponseSchema(detail="Book deleted successfully!")


@router.put("/{bookId}" , response_model=ResponseSchema, response_model_exclude_none=False)
async def update_book(bookId, request_body: BookSchema):
    BookService.update_book(bookId, request_body)
    return ResponseSchema(detail="Book updated successfully!")

@router.get("/{name_file}")
def get_file(name_file: str):
    return FileResponse(path=os.getcwd()+ "/book_files/bookfile_uploads/" + name_file)

@router.get("/book/{bookId}")
async def get_book_by_id(bookId):
    book = BooksRepository.find_book_by_id(bookId)
    book = dict(book)
    return book