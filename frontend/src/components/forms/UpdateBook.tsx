import React, { useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";




export default function UpdateBook(props:any) {
  const [UpdateBookForm, setUpdateBookForm] = useState({
    title: props.book.title || "",
    author: props.book.author  || "",
    genre: props.book.genre || "",
    date_published: props.book.date_published || "",
  });

      
    const [bookDate, setBookDate] = useState(null);
    const formatDate = (date: string) => {
        let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [day, month, year].join("-");
      };
      
    const onChangeForm = (label:any, event:any ) => {
        switch (label) {
          case "title":
            setUpdateBookForm({ ...UpdateBookForm, title: event.target.value });
            break;
          case "author":
            setUpdateBookForm({ ...UpdateBookForm, author: event.target.value });
            break;
          case "genre":
            setUpdateBookForm({ ...UpdateBookForm, genre: event.target.value });
            break;
          case "date_published":
            setBookDate(event);
            setUpdateBookForm({ ...UpdateBookForm, date_published: formatDate(event) });
            break;
        }
          };

    
    const onUpdateBookHandler =  (event:any) => {
      event.preventDefault();
      console.log(UpdateBookForm);
      // Post to register API
      axios
        .put(`http://localhost:8000/books/${props.book.id}`, UpdateBookForm)
        .then((response : any ) => {
  
          // add successfully notif
          toast.success(response.data.detail);
          // reload page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
  
          console.log(response);
        })
        .catch((error:any) => {
          console.log(error);
          // add error notif
          toast.error(error.response.data.detail);
        })};
        
        return ( <div className="relative">
        <button
          onClick={props.handleCloseUpdateForm}
          className="absolute right-0 z-50 p-2 w-12 h-12 "
        >
          {/* <img src={"closeImage"} alt="close button" /> */}
        </button>
      
        <div className="flex items-center justify-center">
          <div className="py-12 px-6 md:px-24 bg-white rounded-2xl shadow-xl z-20 w-full max-w-lg">
            <p className="text-center text-lg mb-6 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Input details of book you want to add below
            </p>
      
            <form onSubmit={onUpdateBookHandler}>
              <div className="space-y-3 space-x-1">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={UpdateBookForm.title}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
                  onChange={(event) => {
                    onChangeForm("title", event);
                  }}
                />
                <input
                  type="text"
                  placeholder="Book Author"
                  value={UpdateBookForm.author}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
                  onChange={(event) => {
                    onChangeForm("author", event);
                  }}
                />
                <input
                  type="text"
                  placeholder="Book Genre"
                  value={UpdateBookForm.genre}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
                  onChange={(event) => {
                    onChangeForm("genre", event);
                  }}
                />
                <DatePicker
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Book Published Date"
                  value={UpdateBookForm.date_published}
                  selected={bookDate}
                  onChange={(event: any) => {
                    onChangeForm("date_published", event);
                  }}
                />
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="py-3 w-full md:w-64 text-xl text-white bg-sky-500 rounded-2xl hover:bg-sky-300 active:bg-sky-800 outline-none"
                  >
                    Update Book
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
        )
};