import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../custom.css';
import Category from '../Component/Category';
import MenuList from './../Component/MenuList';
import NewOrderList from '../Component/NewOrderList';

const MakeOrder = () => {
  const { id } = useParams();

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    console.log('Category clicked:', id);
  };

  const handleItemClick = (menu) => {
    setSelectedMenus((prevMenus) => {
      const isMenuSelected = prevMenus.includes(menu.id);
      if (isMenuSelected) {
        return prevMenus.filter((id) => id !== menu.id);
      } else {
        return [...prevMenus, menu.id];
      }
    });
  };

  return (
    <div className='makeOrder-page'>
      <div className='makeOrder-section-1 col-span-2 flex flex-col border-r'>
        <div className='makeOrder-container'>
          <MenuList onItemClick={handleItemClick} category={selectedCategory} selectedMenus={selectedMenus} />
        </div>
        <div className='border-t py-2'>
          <Category onCategoryChange={handleCategoryClick} />
        </div>
      </div>
      <div className='makeOrder-section-2 px-2'>
        <NewOrderList id={id} selectedMenus={selectedMenus} />
      </div>
    </div>
  )
}

export default MakeOrder