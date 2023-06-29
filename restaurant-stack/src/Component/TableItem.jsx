import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const TableItem = ({ table, onClick }) => {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  return (
    <Link 
      to={`/orders/table/${table.id}`}
      className="inline-block bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-800 text-center font-bold py-4 px-2 rounded-lg"
    >
      Table {table.name}
    </Link>
  )
}

export default TableItem