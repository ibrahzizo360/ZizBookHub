import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-blue-300 p-4 h-20">
      <span className="text-white ml-2 text-lg">Ziz Book Hub</span>
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold py-2 px-4 rounded mr-2">Sign In</button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ml-2">Sign Up</button>
      </div>
    </div>
  )
}

export default Header