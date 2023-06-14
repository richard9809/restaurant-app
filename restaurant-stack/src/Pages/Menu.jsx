import React, { useEffect, useState } from 'react'
import MenuList from './../Component/MenuList';
import './../custom.css';
import Category from '../Component/Category';
import axiosClient from '../axios-client';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    console.log('Category clicked:', id);
  };

  return (
    <div className='menu-page'>
      <div className='menu-container'>
        <MenuList category={selectedCategory}/>
      </div>
      <div className='category-container py-1 border-t'>
        <Category onCategoryChange={handleCategoryClick} />
      </div>
    </div>
  )
}

export default Menu