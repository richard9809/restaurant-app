'use client';
import React from 'react'
import PaymentTable from '../Component/PaymentTable';
import { Card } from 'flowbite-react';

const Payment = () => {
  return (
    <div className='payment-page '>
      <div className='payment-card px-4 py-4 bg-gray-100'>
        <div>
          <Card href="#" className='w-72'>
            <h5 className="text-2xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
              <p>
                Total Payments
              </p>
            </h5>
            <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
              <p>
                Kshs. 3,200
              </p>
            </p>
          </Card>
        </div>

        <div>
          <Card href="#" className='w-72'>
            <h5 className="text-2xl uppercase font-bold tracking-tight text-gray-900 dark:text-white">
              <p>
                Cash Payments
              </p>
            </h5>
            <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
              <p>
                Kshs. 2,000
              </p>
            </p>
          </Card>
        </div>

        <div>
          <Card href="#" className='w-72'>
            <h5 className="text-2xl uppercase font-bold tracking-tight text-gray-900 dark:text-white">
              <p>
                Mpesa Payments
              </p>
            </h5>
            <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
              <p>
                Kshs. 1,200
              </p>
            </p>
          </Card>
        </div>
      </div>
      <div className='h-full col-span-3 py-4 px-4 border-l'>
        <PaymentTable />
      </div>
    </div>
  )
}

export default Payment