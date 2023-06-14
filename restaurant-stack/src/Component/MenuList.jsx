import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import axiosClient from '../axios-client';

const MenuList = ({ onItemClick, category }) => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setLoading(true);
    const url = category ? `/foods?category=${category}` : '/foods';
    console.log('URL:', url);
    axiosClient.get(url)
      .then((res) => {
        setMenus(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }, [category]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 py-2 px-4">
      {loading && <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-24 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
          <span className="sr-only">Loading...</span>
      </div>
      }
      {!loading && menus.map((menu) => (
        <MenuItem key={menu.id} menu={menu} onItemClick={onItemClick} />
      ))}
    </div>
  )
}

export default MenuList