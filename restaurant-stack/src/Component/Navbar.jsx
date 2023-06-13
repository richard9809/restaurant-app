import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-white flex items-center">
        <span className="text-red-500 font-bold text-3xl">P</span>
        <span className="text-blue-500 font-bold text-3xl">O</span>
        <span className="text-yellow-500 font-bold text-3xl">S</span>
        <div className="ml-8 relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-gray-900 rounded-md py-1 px-4 ml-2 focus:outline-none w-80 text-sm::placeholder"
          />
          <i className="fa fa-search absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mx-4">
          <i className="fa fa-bell text-2xl"></i>
        </div>
        <img
          src="../../user.jpg"
          alt="User Profile"
          className="rounded-full w-8 h-8 mx-1"
        />
        <span className="ml-2 text-xl">John Doe</span>
      </div>
    </nav>
  )
}

export default Navbar