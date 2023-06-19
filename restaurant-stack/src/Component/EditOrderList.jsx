import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EditOrderItem from './EditOrderItem';
import axiosClient from '../axios-client'

const EditOrderList = ({ id, selectedMenus }) => {
  
    const [loading, setLoading] = useState(false);
    const [ order, setOrder ] = useState({});
    const [total, setTotal] = useState(0);
    const [ orderItems, setOrderItems ] = useState([]);
    const [ menuItems, setMenuItems] = useState([]);

    useEffect(() => {
      axiosClient.get('/foods')
        .then((res) => {
          setMenuItems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/orders/${id}`)
          .then((res) => {
            setOrder(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, [id])
  
    const handleSubmit = (e) => {
      e.preventDefault();
        
        // 
      
    
      //For dismissing the notification
        const closeButton = document.querySelector('[data-target="#alert-1"]');
        closeButton.addEventListener('click', () => {
          const notification = document.getElementById('alert-1');
          notification.classList.add('hidden');
        });
  
      setLoading(true);

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


    const calculateTotal = () => {
      const sum = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
      return sum;
    };

    useEffect(() => {
      setOrderItems((prevItems) => {
        const updatedItems = selectedMenus.map((menuID) => {
          const existingItem = prevItems.find((item) => item.menuId === menuID);
          if (existingItem) {
            return {
              ...existingItem,
              quantity: existingItem.quantity,
            };
          } else {
            const menuItem = menuItems.find((item) => item.id === menuID);
            return {
              menuId: menuItem.id,
              name: menuItem.name,
              quantity: 1, // Set the initial quantity to 1
              price: menuItem.price,
              image: menuItem.image,
            };
          }
        });
        return updatedItems;
      });
  
      return () => {
        setOrderItems((prevItems) => {
          const updatedItems = prevItems.filter((item) =>
            selectedMenus.some((menuID) => menuID === item.menuId)
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
                  <p className='flex justify-end text-2xl'>{order.order_number}</p>
              </div>
              <div className='grid grid-cols-2'>
                  <h2 className='text-3xl font-semibold'>TABLE #</h2>
                  <p className='flex justify-end text-2xl text-gray-500'>{order.table_name}</p>
              </div>
          </div>
  
          <div className="new-order">
                {/* {loading && <div className="text-center">Loading...</div>} */}

                {orderItems.map((orderItem) => (
                  <EditOrderItem key={orderItem.menuId} item={orderItem} onQuantityChange={handleQuantityChange} />
                ))}

  
              {/* Display the notification */}
              <div id="alert-1" className="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 hidden">
                  <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    Order items cannot be empty.
                  </div>
                  <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-target="#alert-1" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
              </div>
  
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
                      Cancel Update
                  </Link >
                  <button 
                    onClick={handleSubmit} 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg"
                  >
                      {loading ? (
                        <div className='text-center'>
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                          </svg>
                            Update Order
                        </div>
                      ) : (
                        "Update Order"
                      )}
                  </button>
              </div>
          </div>
      </div>
    )
}

export default EditOrderList