import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db_setup import create_database




origins= [
    "http://localhost:3000"
]

def init_app():

    app = FastAPI(
        title= "Simple Book Management System",
        description= "",
        version= "1.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )


    @app.on_event("startup")
    def startup():
        create_database()
        
    from app.controller import authentication, users, books

    app.include_router(authentication.router)
    app.include_router(users.router)
    app.include_router(books.router)

    return app

app = init_app()




    
    