
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../custom.css';
import Category from '../Component/Category';
import MenuList from './../Component/MenuList';
import NewOrderList from '../Component/NewOrderList';

const MakeOrder = () => {
  const menus = [
    { id: 1, name: 'French Fries', category: 'Breakfast', image: '../../images/french-fries.jpg', quantity: 2, price: 100 },
    { id: 2, name: 'White Rice', category: 'Alle Carte', image: '../../images/white-rice.jpg', quantity: 1, price: 150 },
    { id: 3, name: 'Pilau', category: 'Main Meal', image: '../../images/pilau.jpg', quantity: 3, price: 120 },
    { id: 4, name: 'Coca Cola', category: 'Drinks', image: '../../images/soda.jpg', quantity: 12, price: 35 },
    { id: 5, name: 'Pizza BBQ', category: 'Main Meal', image: '../../images/pizza.jpg', quantity: 12, price: 1150 },
  ];

  const { id } = useParams();

  const [selectedMenus, setSelectedMenus] = useState([]);

  const handleItemClick = (menu) => {
    setSelectedMenus((prevMenus) => {
      const isMenuSelected = prevMenus.some((item) => item.id === menu.id);
      if (isMenuSelected) {
        return prevMenus.filter((item) => item.id !== menu.id);
      } else {
        return [...prevMenus, menu];
      }
    });
  };

  return (
    <div className='makeOrder-page'>
      <div className='makeOrder-section-1 col-span-2 flex flex-col border-r'>
        <div className='makeOrder-container'>
          <MenuList menus={menus} onItemClick={handleItemClick} />
        </div>
        <div className='border-t py-2'>
          <Category />
        </div>
      </div>
      <div className='makeOrder-section-2 px-2'>
        <NewOrderList id={id} selectedMenus={selectedMenus} />
      </div>
    </div>
  )
}

export default MakeOrder