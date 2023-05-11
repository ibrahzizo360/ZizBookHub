/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState } from "react";
import Dashboard from "./Dashboard"
import Table from "./Table";
import AddBookForm from "../../../form/AddBookForm";
import backgroundImage from '../../../assets/background.jpg';



export default function Home() {
  const [page, setPage] = useState("AddBookForm");
  const choosePage = () => {
    if (page === "Dashboard") {
      return <Dashboard setPage={setPage} />;
    }
    if (page === "Table") {
      return <Table setPage={setPage} />;
    }
    if (page === "AddBookForm") {
      return <AddBookForm setPage={setPage} />;
    }
  };
  const pages = () => {
    
      return ( <div>
        <div className="h-32 flex items-center justify-center  bg-image bg-cover"
         style={{ backgroundImage: `url(${backgroundImage})` }} >
           <h1 className="text-4xl font-bold mb-16  md:w-70 text-gray-200 mt-8 ">
            Welcome to Zizo's Book Management System</h1>
            </div>
            <div className="bg-gray-100">
            {choosePage()}
          </div>
          </div>
          
      );
    }
  
  return (
    <React.Fragment>
      {pages()}
   </React.Fragment>
  )};

