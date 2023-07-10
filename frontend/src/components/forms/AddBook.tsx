import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { REGISTERBOOK } from "../../utils/book";



export default function AddBook(props:any) {
    const [bookContentFile, setBookContentFile] = useState("");
    const [bookCoverFile, setBookCoverFile] = useState("");
    const [addBookForm, setAddBookForm] = useState({
        title: "",
        author: "",
        genre: "",
        date_published: "",
      });
    const [loading, setLoading] = useState(false);  
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
            setAddBookForm({ ...addBookForm, title: event.target.value });
            break;
          case "author":
            setAddBookForm({ ...addBookForm, author: event.target.value });
            break;
          case "genre":
            setAddBookForm({ ...addBookForm, genre: event.target.value });
            break;
          case "date_published":
            setBookDate(event);
            setAddBookForm({ ...addBookForm, date_published: formatDate(event) });
            break;
          case "bookcontent_file":
            setBookContentFile(event.target.files[0]);
            break;
          case "bookcover_file":
            setBookCoverFile(event.target.files[0]);
            break;
        }
          };
          
          const formData = new FormData();
          formData.append("bookcontent_file", bookContentFile);
          formData.append("bookcover_file", bookCoverFile);
          formData.append("title", addBookForm.title);
          formData.append("author", addBookForm.author);
          formData.append("genre", addBookForm.genre);
          formData.append("date_published", addBookForm.date_published);

        
          const onAddBookHandler = (event:any) => {
            event.preventDefault();
            console.log(addBookForm);
            // Post to register API
            setLoading(true);
            toast.promise(
              REGISTERBOOK(formData, () => {
                toast.success("Book Created sucessfully", { toastId: "signinToast" });
              }),
              {
                pending: "Adding Book...",
              },
              {
                toastId: "signinToast",
                position: "top-right",
              }
          );
            setLoading(false);
          };
          return (
            <div>

    <div className="flex items-center justify-center ">
  <div className="py-12 px-6 md:px-24 bg-white rounded-2xl shadow-xl z-20 w-full md:w-[728px]">

    <p className="w-full md:w-70 text-center text-lg mb-6 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
      Input details of book you want to add below
    </p>

    <form onSubmit={onAddBookHandler}>
      <div className="space-y-3 space-x-1">
        <input
          type="text"
          placeholder="Book Title"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
          onChange={(event) => {
            onChangeForm("title", event);
          }}
        />
        <input
          type="text"
          placeholder="Book Author"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
          onChange={(event) => {
            onChangeForm("author", event);
          }}
        />
        <input
          type="text"
          placeholder="Book Genre"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
          onChange={(event) => {
            onChangeForm("genre", event);
          }}
        />
        <DatePicker
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
          dateFormat="dd-MM-yyyy"
          placeholderText="Book Published Date"
          selected={bookDate}
          onChange={(event: any) => {
            onChangeForm("date_published", event);
          }}
        />
        <div className="flex flex-col md:flex-row md:justify-between py-6">
        <fieldset className="mb-4 md:mb-0">
          <label className="mb-2 block" htmlFor="bookcontent_file">Submit book file</label>
          <input type="file" id="bookcontent_file" name="bookcontent_file" accept=".pdf , .txt" onChange={(event:any) => {onChangeForm("bookcontent_file", event)}} className="block"/>
        </fieldset>
        <fieldset>
          <label className="mb-2 block" htmlFor="bookcover_file">Submit book cover</label>
          <input type="file" id="bookcover_file" name="bookcover_file" accept=".jpeg , .jpg, .png" onChange={(event:any)=> {onChangeForm("bookcover_file", event)}} className="block"/>
        </fieldset>
          </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="py-3 w-full md:w-64 text-xl text-white bg-sky-500 rounded-2xl hover:bg-sky-300 active:bg-sky-800 outline-none"
          >
            Add Book
          </button>
        </div>
        </div>
    </form>
  </div>
  </div>
  </div>
  )  
};
        