import React, { useEffect } from 'react'
import { useState } from 'react';
import axiosClient from '../axios-client';

const Category = () => {
    // const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      axiosClient.get('/categories')
        .then((res) => {
          console.log(res.data.data);
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);
  
    //${selectedCategory === category.name ? 'bg-blue-500 text-white' : ''}
  return (
    <footer className='px-6'>
        <div className='flex justify-center'>
          {categories.map((category) => (
              <button 
                key={category.id}
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md py-2 px-10 mr-4 `} 
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </button>
          ))}
        </div>
    </footer>
  )
}

export default Category