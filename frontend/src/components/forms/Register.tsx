/* eslint-disable default-case */
import React, { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGNUP } from "../../utils/auth";


export default function Register(props:any) {
  const options = [
    { value: "", label: "Select Your gender !" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Register Form
  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    birth: "",
    sex: "",
    profile: "",
  });
  
  //    default value datepicker
  const [birthDate, setBirthDate] = useState(null);

  // convert format date to string
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
      case "name":
        setFormRegister({ ...formRegister, name: event.target.value });
        break;
      case "username":
        setFormRegister({ ...formRegister, username: event.target.value });
        break;
      case "email":
        // email validation
        const email_validation = /\S+@\S+\.\S+/;
        if (email_validation.test(event.target.value)) {
          setFormRegister({ ...formRegister, email: event.target.value });
        }
        break;
      case "phone_number":
        setFormRegister({ ...formRegister, phone_number: event.target.value });
        break;
      case "password":
        setFormRegister({ ...formRegister, password: event.target.value });
        break;
      case "sex":
        setFormRegister({ ...formRegister, sex: event.target.value });
        break;
      case "birth":
        setBirthDate(event);
        setFormRegister({ ...formRegister, birth: formatDate(event) });
        break;
    }
  };


  //   Submit handler

  const onSubmitHandler = async (event:any) => {
    event.preventDefault();
    if (!formRegister.username || !formRegister.password)
      return toast.error("All fields are required", {
        toastId: "signupToast",
      });
    setLoading(true);
    toast.promise(
      SIGNUP(formRegister, (token: string) => {
        setRedirect(true);
        toast.success("Signup successful", { toastId: "signupToast" });
        localStorage.setItem('token', token);
      }),
      {
        pending: "Signing up...",
      },
      {
        toastId: "signinToast",
        position: "top-right",
      }
    );
    setLoading(false);
  };

  if(redirect){
    navigate('/login')
  }

  return (
    <React.Fragment>
  <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Create An Account
        </h1>
        <p className="text-center text-sm text-gray-700 tracking-wide cursor-pointer">
          Welcome to Zizocode23!
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
        <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4 ">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              onChange={(event) => {
                onChangeForm("name", event);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              onChange={(event) => {
                onChangeForm("username", event);
              }}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              onChange={(event) => {
                onChangeForm("email", event);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              onChange={(event) => {
                onChangeForm("password", event);
              }}
            />
          </div>
          <div>
            <DatePicker
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
              dateFormat="dd-MM-yyyy"
              placeholderText="Birth date"
              selected={birthDate}
              onChange={(event) => {
                onChangeForm("birth", event);
              }}
            />
          </div>
          <div>
            <select
              value={formRegister.sex}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-sky-500"
              onChange={(event) => {
                onChangeForm("sex", event);
              }}
            >
              {options.map((data) => (
                <option key={data.label} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              onChange={(event) => {
                onChangeForm("phone_number", event);
              }}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            disabled={loading} 
             >
            {loading ? "Creating an Account" : "Create Account"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-sky-500 hover:text-sky-400"
          >
            Sign In
          </Link>{" "}
          or{" "}
          <Link
            to="/"
            className="font-medium text-sky-500 hover:text-sky-400"
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  </div>
</React.Fragment>




  );
}
