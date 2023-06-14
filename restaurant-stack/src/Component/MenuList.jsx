import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import axiosClient from '../axios-client';

const MenuList = ({ onItemClick }) => {
  const [menus, setMenus] = useState([]);

    useEffect(() => {
      axiosClient.get('/foods')
        .then((res) => {
          console.log(res.data.data);
          setMenus(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-2 px-4">
      {menus.map((menu) => (
        <MenuItem key={menu.id} menu={menu} onItemClick={onItemClick} />
      ))}
    </div>
  )
}

export default MenuList