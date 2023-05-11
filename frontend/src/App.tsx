import "./App.css";
import React, { useState, useEffect } from "react";
import Forgot from "./form/Forgot";
import Login from "./form/Login";
import Verify from "./form/Verify";
import Register from "./form/Register";
import Home from "./components/Layout/Main/Home";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState();
  const [verified, setVerifiedValue]=useState("false");

  
  useEffect(()=> {
    const verified_value : any = localStorage.getItem('email_verified');
    setVerifiedValue(verified_value);
  }, [verified]);

  useEffect(() => {
    const auth : any = localStorage.getItem("auth_token");
    
    setToken(auth);
  }, [token]);

  const choosePage = () => {
    if (page === "login") {
      return <Login setPage={setPage} />;
    }
    if (page === "forgot") {
      return <Forgot setPage={setPage} />;
    }
    if (page === "register") {
      return <Register setPage={setPage} />;
    }
  };

  const pages = () => {
    if (token == null) {
      return (
        <div className="min-h-screen bg-sky-500 flex justify-center items-center">
          <div className="py-6 px-12 bg-white rounded-2xl shadow-xl z-20">
            {choosePage()}
          </div>
        </div>
               
      );
    }
    else if(verified === "false" && token != null){
      return (
        <div className="min-h-screen bg-sky-500 flex justify-center items-center">
        <div className="py-6 px-12 bg-white rounded-2xl shadow-xl z-20">
          <Verify/>
        </div>
      </div>
      )
    }
     else {
      return <Home />;
    }
  };

  return <React.Fragment>{pages()}</React.Fragment>;
}

export default App;
