'use client';
import { Card } from 'flowbite-react';
import React, { useState } from 'react';

const MenuItem = ({ menu, onItemClick }) => {
    const [isSelected, setIsSelected] = useState(false);

    const cardStyle = {
      backgroundImage: `url(${menu.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      outline: isSelected ? '3px solid #3B82F6' : 'none',
      position: 'relative',
      height: '12rem',
    };

    const handleItemClick = () => {
      setIsSelected(!isSelected);
      onItemClick(menu);
    };
  
    return (

      <div className="bg-white rounded-lg shadow-md cursor" onClick={handleItemClick} style={cardStyle}>
        <div className="w-full h-24 rounded-t-md"></div>
        <div className="bg-gray-100 p-2 rounded-b-lg" style={{ position: "absolute", bottom: 0, width: "100%", height: "5.5rem"}}>
          <h3 className="text-xl font-semibold mb-2">{menu.name}</h3>
          <p className="text-gray-600 mb-2">
            Qty: {menu.quantity} | Ksh {menu.price}
          </p>
        </div>
      </div>

    );
  };

export default MenuItem