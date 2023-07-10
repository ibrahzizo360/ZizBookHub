/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile(props:any) {
  const [user, setUser] : any = useState({});

  useEffect(() => {
    // get token from local storage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    //  fetch data from get user api
    axios
      .get("http://localhost:8000/users/me", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickHandler = (event:any) => {
    event.preventDefault();

    // remove token form local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("email_verified");

    // notif
    toast("See You !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // reload page
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (<div>
     <div className="container mx-auto p-4 flex flex-row">
        <button className="flex justify-start bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
        onClick={ ()=>{props.setPage("AddBookForm")}}>Add Book</button>
        <button className="ml-auto bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
        onClick={ ()=>{props.setPage("Table")}}>View Books</button>
        </div>
    <div className="bg-gray-100 font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          alt="profile"
          src={user.profile}
        />
        <div className="text-center mt-2 text-3xl font-medium">{user.name}</div>
        <div className="text-center mt-2 font-light text-sm">
          @{user.username}
        </div>
        <div className="text-center font-normal text-lg">{user.email}</div>
        <div className="px-6 text-center mt-2 font-light text-sm">
          <p>{user.birth}</p>
        </div>
        <hr className="mt-8"></hr>
        <div className="flex p-4">
          <div className="w-1/2 text-center">
            <span className="font-bold">{user.sex}</span>
          </div>
          <div className="w-0 border border-gra-300"></div>
          <div className="w-1/2 text-center">
            <span className="font-bold">{user.phone_number}</span>
          </div>
        </div>
        <hr className="mt-3"></hr>
        <div className="flex p-2">
          <div className="w-full text-center">
            <button
              onClick={(event) => {
                onClickHandler(event);
              }}
              className="py-3 w-64 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
