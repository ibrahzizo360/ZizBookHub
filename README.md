# BookManagementSystem
Book management system web application built with React and FastAPI. Allows users to add and view books, and manage book content and cover images. Uses PostgreSQL database for data storage

**Features**
* Authentication using JWT
* Email validation
* Add books to the system
* Upload and manage book content and cover images 
* View list of books
* Edit book details
* Delete books from the system

**This is a link of my deployed web application:**
https://[bms-app.onrender.app](https://bms-client.onrender.com/)

**What I have below is a link to the Swagger documentation for my backend API:**
* https://bmsserver.up.railway.app/docs
* Swagger provides a user-friendly interface for exploring and interacting with the API endpoints. This documentation is useful for developers who want to understand how to use the API and for testing and troubleshooting purposes.



# How to run
To run this project locally, you will need to have Node.js and Python installed on your machine. You will also need to have a PostgreSQL server running.

**How to run frontend(React with Typescript)**
1. In the frontend directory, run npm install
2. run npm start

**How to run backend(Fastapi)**
* Before running, cd into backend and create a file named ".env". It should contain the appropriate variables by relating to the config.py file.
* Also, the email delivery service platform I used is SENDGRID. Therefore in order to set this up one must visit sendgrid.com, create an account and create and api key.

1. In the backend directory, create a virtual environment called venv by running "python -m venv venv"
2. run this command ".\venv\Scripts\activate" Inorder to activate your virtual environment
3. run pip install -r requirements.txt
4. run uvicorn app.main:app --reload

# Contributions
Contributions are welcome! If you find a bug or would like to suggest a new feature, please open an issue. If you would like to contribute code, please fork the repository and submit a pull request.

