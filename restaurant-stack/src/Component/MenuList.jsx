import React from 'react'
import MenuItem from './MenuItem'

const MenuList = ({ menus, onItemClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-2 px-4">
      {menus.map((menu) => (
        <MenuItem key={menu.id} menu={menu} onItemClick={onItemClick} />
      ))}
    </div>
  )
}

export default MenuList