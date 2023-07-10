/* eslint-disable default-case */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Verify(props:any) {
  const [verificationForm, setVerificationform] = useState({
    verification_code: "",
  });

  const onChangeForm = (event:any) => {
        setVerificationform({ ...verificationForm, verification_code: event.target.value });
  };

  const onSubmitHandler = async (event:any) => {
    event.preventDefault();
    console.log(verificationForm);
    
    // call api login
    await axios
      .post("http://localhost:8000/auth/verify", verificationForm)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "email_verified",
          response.data.result.email_verified
        );
        // add successfully notif
        toast.success(response.data.detail);
        // reload page after success login
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // add error notif
        
        console.log(error);
        toast.error(error.response.data.detail);
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Welcome to Zizocode23
        </h1>
     <h3>
       Thanks for creating an account with us. Please verify your email address by
       entering your verification code below.
     </h3>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Verification code"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
            onChange={(event) => {
              onChangeForm(event);
            }}
          />
      
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-sky-500 rounded-2xl hover:bg-sky-300 active:bg-sky-500 outline-none">
            Submit verification code
          </button>
         
        </div>
      </form>
    </React.Fragment>
  );
}
