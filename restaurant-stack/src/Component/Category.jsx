import React, { useEffect } from 'react'
import { useState } from 'react';
import axiosClient from '../axios-client';

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axiosClient.get('/categories')
        .then((res) => {
          setLoading(false);
          setCategories(res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
    }, []);
  
    //${selectedCategory === category.name ? 'bg-blue-500 text-white' : ''}
    const handleCategoryClick = (categoryName) => {
      setSelectedCategory(categoryName);
    };
  
  return (
    <footer className='px-6'>
        <div className='flex justify-center'>
          {loading && <div role='status' className='space-y-1.5 animate-pulse max-w-lg'>
              <div className='flex items-center w-full space-x-2'>
                <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 px-4 w-72'></div>
                <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 px-4 w-72'></div>
                <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 px-4 w-72'></div>
                <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 px-4 w-72'></div>
                <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 px-4 w-72'></div>
              </div>
            </div>
          }
        {!loading && (
          <>
            <button
              className={`${
                selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
              } text-gray-700 font-semibold rounded-md py-2 px-10 mr-4`}
              onClick={() => handleCategoryClick('All')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${
                  selectedCategory === category.name ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
                } text-gray-700 font-semibold rounded-md py-2 px-10 mr-4`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </button>
            ))}
          </>
        )}
        </div>
    </footer>
  )
}

export default Category