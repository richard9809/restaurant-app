import React from 'react';

const NewOrderItem = ({ item, onQuantityChange }) => {

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    onQuantityChange(item.menuId, quantity);
  };

  return (
    <div className='my-2 bg-gray-100 px-4 py-1 rounded-md'>
      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
          <div className='flex gap-4 items-center'>
            <img 
              src={item.image} 
              alt="food image" 
              className='order-image rounded-md object-cover'
            />
            <div className='flex flex-col '>
              <h3 className='text-md uppercase'>{item.name}</h3>
              <p className='font-semibold text-lg'>Ksh {item.price}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <label htmlFor={`quantity-${item.menuId}`} className='text-sm font-semibold uppercase'>
            Quantity
          </label>
          <input
            id={`quantity-${item.menuId}`}
            type='number'
            min={1}
            value={item.quantity}
            onChange={handleQuantityChange}
            className='w-16 py-0.5 border rounded-md text-md text-center'
          />
        </div>
      </div>
    </div>
  )
}

export default NewOrderItem