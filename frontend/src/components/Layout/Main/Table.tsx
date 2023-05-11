import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateBookForm from "../../../form/UpdateBookForm";


interface FileLinkProps {
  fileUrl: string;
}


function FileLink({fileUrl}: FileLinkProps ) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.open(`${fileUrl}`);
  }

  return (
    <a href="{fileUrl}" onClick={handleClick} className="text-blue-500">
      Download file
    </a>
  );
}

export default function Table(props:any) {
    const [books, setBooks] : any = useState([]);
    const [showUpdateForm, setShowUpdateForm]: any = useState(false);
    const [book, setBook] : any = useState({});

    useEffect(() => {
        // get token from local storage
        const auth_token = localStorage.getItem("auth_token");
        const auth_token_type = localStorage.getItem("auth_token_type");
        const token = auth_token_type + " " + auth_token;
    
        //  fetch books from get user api
        axios
          .get("http://localhost:8000/books/", {
            headers: { Authorization: token },
          })
          .then((response) => {
            console.log(response);
            setBooks(response.data.result)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      
      const handleDelete = (bookId:any) => {
        axios.delete(`http://localhost:8000/books/${bookId}`).then(() => {
          setBooks((prevBooks:any) => prevBooks.filter((book:any) => book.id !== bookId));
        });
      };
      const handleEdit = (bookId:any) => {
        axios.get(`http://localhost:8000/books/book/${bookId}`).then((response) => {
          console.log(response)
          setShowUpdateForm(true)
          setBook(response.data)
        });
      };
      const handleCloseUpdateForm =  () => {
        setShowUpdateForm(false)
      }
  
      
      return( <div className="">
        <div className="container  p-4 flex flex-row">
        <button className="flex justify-start bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
        onClick={ ()=>{props.setPage("Dashboard")}}>Dashboard</button>
        <button className="ml-auto bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
        onClick={ ()=>{props.setPage("AddBookForm")}}>Add Book</button>
      </div>
        <div className="overflow-x-auto py-12 px-12 min-h-screen">
    <div className="min-w-max flex justify-center ">
      <table className="table-auto border shadow-md rounded-lg ">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Date Published</th>
            <th className="px-4 py-2">Created By</th>
            <th className="px-4 py-2">Book Content File</th>
            <th className="px-4 py-2">Book Cover Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {books.map((book:any) => (
          <tr key={book.id}>
            <td className="border px-4 py-2">{book.ISBN}</td>
            <td className="border px-4 py-2">{book.title}</td>
            <td className="border px-4 py-2">{book.author}</td>
            <td className="border px-4 py-2">{book.genre}</td>
            <td className="border px-4 py-2">{book.date_published}</td>
            <td className="border px-4 py-2">{book.created_by}</td>
            <td className="border px-4 py-2 "><FileLink fileUrl={book.bookcontent_file}></FileLink></td>
            <td className="border px-4 py-2 flex justify-center"> <img src={book.bookcover_file} alt={book.title} style={{ width: '110px', height: '130px' }}/>  </td>
            <td className="border px-4 py-2 ">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm mx-2" onClick={() => handleEdit(book.id)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => handleDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
          </tbody>
      </table>
      {showUpdateForm && (
        <div className="update-book-form-popup">
          <UpdateBookForm book={book}
          handleCloseUpdateForm={handleCloseUpdateForm}
           />
        </div>
      )}
      </div>
    </div>
    </div>
      )
};
