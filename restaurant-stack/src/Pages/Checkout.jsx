import React from 'react'
import OrderSummary from '../Component/OrderSummary'
import Payment from '../Component/Payment'
import { useParams } from 'react-router-dom';

const Checkout = () => {

  const { id } = useParams();

  return (
    <div className='checkout-page '>
      <div className='section col-span-3'>
        <OrderSummary id={id} />
      </div>
      <div className='h-full overflow-hidden px-4 py-4 border-l'>
        <Payment id={id} />
      </div>
    </div>
  )
}

export default Checkout