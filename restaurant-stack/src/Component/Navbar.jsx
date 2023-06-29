import React from 'react'

const Navbar = ({user}) => {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-white flex items-center">
        <span className="text-red-500 font-bold text-3xl">P</span>
        <span className="text-blue-500 font-bold text-3xl">O</span>
        <span className="text-yellow-500 font-bold text-3xl">S</span>
      </div>
      <div className="flex items-center">
        <div className="mx-4">
          <i className="fa fa-bell text-2xl"></i>
        </div>
        <img
          src="../../images/default.jpg"
          alt="User Profile"
          className="rounded-full w-8 h-8 mx-1"
        />
        <span className="ml-2 text-xl">{user}</span>
      </div>
    </nav>
  )
}

export default Navbar