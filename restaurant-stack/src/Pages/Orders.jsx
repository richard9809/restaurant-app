import React from 'react'
import OrdersTable from '../Component/OrdersTable'
import { useStateContext } from '../contexts/ContextProvider'

const Orders = () => {
  const { user } = useStateContext();

  return (
    <div className='orders-page px-8 py-2 '>
      <h1 className='font-semibold text-2xl '>Orders Table</h1>
      <div className='py-2'>
        <OrdersTable role={user.role} />
      </div>
    </div>
  )
}

export default Orders