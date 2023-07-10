import React from 'react'

const Header = () => {
  return (
    <>
        <div className="h-32 flex items-center justify-center  ">
           <h1 className="text-4xl font-bold mb-16  md:w-70 text-gray-200 mt-8 ">
                Welcome to Zizo's Book Management System
           </h1>
        </div>
        <div className="container mx-auto p-4 flex flex-row">
  <button className="flex justify-start bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
  >Dashboard</button>
  <button className="ml-auto bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" 
  >View Books</button>
        </div>
    </>
  )
}

export default Header