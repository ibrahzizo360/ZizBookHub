/* eslint-disable default-case */
import React, { useState } from "react";


import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { SIGNIN } from "../../utils/auth";


export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const signinHandler = async (e:any) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password)
      return toast.error("All fields are required", {
        toastId: "signinToast",
      });
    setLoading(true);
    toast.promise(
      SIGNIN(credentials, (token: string) => {
        setRedirect(true);
        toast.success("Login successful");
        localStorage.setItem('token', token);
      }),
      {
        pending: "Signing in...",
      },
      {
        toastId: "signinToast",
        position: "top-right",
      }
    );
    setLoading(false);
  };

  if(redirect){
    navigate('/')
  }

  const handleInputChanges = (e:any) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Welcome to Zizocode23
          </h1>
          <p className="text-center text-sm text-gray-700 tracking-wide cursor-pointer">
            Please login to your account!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={signinHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                onChange={handleInputChanges}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                onChange={handleInputChanges}
              />
            </div>
          </div>
          <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          </div>
          <p className="mt-4 text-center text-sm">
            You don't have an account?{" "}
            <Link to="/register" className="font-medium text-sky-500 hover:text-sky-400">
              Register
            </Link>{" "}
            or{" "}
            <Link to="/" className="font-medium text-sky-500 hover:text-sky-400">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
    </React.Fragment>
  )
}