import React from 'react'
import { useState } from 'react';

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Alle Carte' },
        { id: 3, name: 'Main Meal' },
        { id: 4, name: 'Drinks' },
      ];

  return (
    <footer className='px-6'>
        <div className='flex justify-center'>
          {categories.map((category) => (
              <button 
                key={category.id}
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md py-2 px-10 mr-4 ${selectedCategory === category.name ? 'bg-blue-500 text-white' : ''}`}
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