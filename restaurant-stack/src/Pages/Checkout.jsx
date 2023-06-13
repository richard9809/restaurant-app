import React from 'react'
import OrderSummary from '../Component/OrderSummary'

const Checkout = () => {
  return (
    <div className='checkout-page'>
      <div className='col-span-3 h-full overflow-hidden'>
        <OrderSummary />
      </div>
      <div className='h-full overflow-hidden bg-blue-500'>Checkout</div>
    </div>
  )
}

export default Checkout