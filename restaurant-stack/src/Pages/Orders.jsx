import React, { useEffect } from 'react'
import OrdersTable from '../Component/OrdersTable'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'

const Orders = () => {
  const {user, setUser} = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])


  return (
    <div className='orders-page px-8 py-2 '>
      <h1 className='font-semibold text-2xl '>Orders Table</h1>
      <div className='py-2'>
        <OrdersTable />
      </div>
    </div>
  )
}

export default Orders