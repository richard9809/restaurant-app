import React, { useEffect, useState } from 'react'
import NewOrderItem from './NewOrderItem';
import '../custom.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

const NewOrderList = ({ id, selectedMenus }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrders = {
      table_id: id,
      order_number: orderNumber,
      items: orderItems.map((item) => ({
        food_id: item.menuId,
        quantity: item.quantity,
      })),

    };

    setLoading(true);
    axiosClient.post('/orders', updatedOrders)
      .then((res) => {
        setLoading(false);
        navigate('/orders');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      

    console.log('Order submitted:', updatedOrders);
  };

// Function for updating the quantity of an item in the order list
  const handleQuantityChange = (menuId, quantity) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.menuId === menuId ? { ...item, quantity: parseInt(quantity) } : item
      );
      return updatedItems;
    });
  };

  // Function to generate a random order number
  const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10000000) + 10000000;
    return randomNumber.toString();
  };  

  const calculateTotal = () => {
    const sum = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
    return sum;
  };

  useEffect(() => {
    const generatedOrderNumber = generateOrderNumber();
    setOrderNumber(generatedOrderNumber);
  }, []);

    //   Function for updating the order list when a new menu is selected
  useEffect(() => {
    setOrderItems((prevItems) => {
        const updatedItems = selectedMenus.map((menu) => {
          const existingItem = prevItems.find((item) => item.menuId === menu.id);
          if (existingItem) {
            return { 
              ...existingItem,
              quantity: existingItem.quantity, // Keep the existing quantity
            };
          } else {
            return {
              menuId: menu.id,
              name: menu.name,
              quantity: 1, // Set the initial quantity to 1
              price: menu.price,
              image: menu.image,
            };
          }
        });
        return updatedItems;
      });

    // Cleanup function to remove the items not present in selectedMenus
    return () => {
      setOrderItems((prevItems) => {
        const updatedItems = prevItems.filter((item) =>
          selectedMenus.some((menu) => menu.id === item.menuId)
        );
        return updatedItems;
      });
    };
  }, [selectedMenus]);

  useEffect(() => {
        const calculatedTotal = calculateTotal();
        setTotal(calculatedTotal);
    }, [orderItems]);

    const formattedTotal = total.toLocaleString(); // Format total with commas

  return (
    <div className="container ">
        <div className="top-container">
            <div className='grid grid-cols-2'>
                <h2 className='text-3xl font-semibold'>ORDER #</h2>
                <p className='flex justify-end text-2xl'>{orderNumber}</p>
            </div>
            <div className='grid grid-cols-2'>
                <h2 className='text-3xl font-semibold'>TABLE #</h2>
                <p className='flex justify-end text-2xl text-gray-500'>Table {id}</p>
            </div>
        </div>

        <div className="new-order">
            {orderItems.map((orderItem) => (
                <NewOrderItem key={orderItem.menuId} item={orderItem} onQuantityChange={handleQuantityChange} />
            ))}
        </div>

        <div className="total-container">
            <div className='py-2 px-2 border-b-2 border-dashed'>
                <div className='grid grid-cols-2'>
                    <h3 className='text-3xl font-bold'>TOTAL</h3>
                    <p className='flex justify-end text-2xl font-semibold'>Ksh {formattedTotal}</p>
                </div>
            </div>

            <div className='flex justify-center gap-8 py-2'>
                <Link to="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg ">
                    Cancel Order
                </Link >
                <button 
                  onClick={handleSubmit} 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg"
                >
                    {loading ? (
                      <div className='text-center'>
                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                          Send Order
                      </div>
                    ) : (
                      "Send Order"
                    )}
                </button>
            </div>
        </div>
    </div>
  )
}

export default NewOrderList