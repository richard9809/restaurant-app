import React, { useState } from 'react'
import MenuList from './../Component/MenuList';
import './../custom.css';
import Category from '../Component/Category';

const Menu = () => {
  const menus = [
    { id: 1, name: 'French Fries', category: 'Breakfast', image: '../../images/french-fries.jpg', quantity: 2, price: 100 },
    { id: 2, name: 'White Rice', category: 'Alle Carte', image: '../../images/white-rice.jpg', quantity: 1, price: 150 },
    { id: 3, name: 'Pilau', category: 'Main Meal', image: '../../images/pilau.jpg', quantity: 3, price: 120 },
    { id: 4, name: 'Coca Cola', category: 'Drinks', image: '../../images/soda.jpg', quantity: 12, price: 35 },
    { id: 5, name: 'Pizza BBQ', category: 'Main Meal', image: '../../images/pizza.jpg', quantity: 12, price: 1150 },
 
  ];

  // // Get unique categories from the menus array
  // const categories = [...new Set(menus.map((menu) => menu.category))];
  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    console.log('Category clicked:', name);
  };

  return (
    <div className='menu-page'>
      <div className='menu-container'>
        <MenuList menus={menus} />
      </div>
      <div className='category-container py-1 border-t'>
        <Category />
      </div>
    </div>
  )
}

export default Menu