import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SidebarItem = ({ icon, name, to }) => {

  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="flex items-center justify-center flex-col p-2">
      <div className={`text-2xl ${isActive ? 'text-blue-900' : ''}`}>{icon}</div>
      <div className={`text-sm  ${isActive ? 'text-blue-900 font-bold' : ''}`}>{name}</div>
    </Link>
  )
}

export default SidebarItem