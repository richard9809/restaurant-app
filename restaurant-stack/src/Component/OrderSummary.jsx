import React, { useEffect, useState } from 'react'
import OrderSummaryItems from './OrderSummaryItems'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';

const OrderSummary = ({ id }) => {

  const [ loading, setLoading ] = useState(false);
  const [ order, setOrder ] = useState({});
  const [ orderItems, setOrderItems ] = useState([{}]);

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setOrderItems(res.data.order_items);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [id]);

  return (
    <div className='flex flex-col justify-between px-4 h-full overflow-hidden'>

      <div>
        <div className='flex justify-between border-b py-4'>

          <div className='flex justify-items-center gap-4'>
            <>
              <h3 className='font-semibold text-2xl uppercase'>Order #: </h3>
            </>
            <>
              { loading && (
                <p className='flex align-center font-semibold text-2xl'>
                    <div role="status" class="max-w-sm animate-pulse">
                      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-2"></div>
                      <span class="sr-only">Loading...</span>
                    </div>
                </p>
              )}

              { !loading && (
                <p className='flex align-center font-semibold text-2xl'>
                  { order.order_number }
                </p>
              ) }
            </>
          </div>

          <div className='flex justify-items-center gap-4'>
            <h3 className='font-semibold text-2xl uppercase'>Time: </h3>
            { loading && (
              <p className='flex align-center font-semibold text-2xl'>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-2"></div>
                  <span class="sr-only">Loading...</span>
                </div>
              </p>
            )}
            { !loading && (
              <p className='font-semibold text-2xl text-blue-400'>{order.created_at}</p>
            )}
          </div>

          <div className='flex justify-items-center gap-4'>
            <h3 className='font-semibold text-2xl uppercase'>Table #: </h3>
            { loading && (
              <p className='flex align-center font-semibold text-2xl'>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-2"></div>
                  <span class="sr-only">Loading...</span>
                </div>
              </p>
            )}
            { !loading && (
              <p className='font-semibold opacity-20 text-2xl'>{order.table_name}</p>
            )}
          </div>
        </div>

        <div className='flex justify-center py-4'>
          <OrderSummaryItems loading={loading} orderItems={orderItems} />
        </div>
      </div>

      <div className='flex justify-center py-4'>
        <Link to="/orders" className='bg-red-500 uppercase spacing text-xl font-semibold text-white py-4 px-48 rounded-md hover:bg-red-600'>
          Cancel Payment
        </Link>
      </div>

    </div>
  )
}

export default OrderSummary