import React, { useEffect } from 'react'
import { useState } from 'react';
import axiosClient from '../axios-client';

const Category = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

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

    const handleCategoryClick = (id) => {
      setSelectedCategory(id);
      onCategoryChange(id);
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
              key={0}
              className={`${
                selectedCategory === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
              } text-gray-700 font-semibold rounded-md py-2 px-10 mr-4`}
              onClick={() => handleCategoryClick(0)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${
                  selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
                } text-gray-700 font-semibold rounded-md py-2 px-10 mr-4`}
                onClick={() => handleCategoryClick(category.id)}
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