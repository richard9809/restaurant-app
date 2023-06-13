'use client';
import React from 'react';
import { Table } from 'flowbite-react';
import { Pagination } from 'flowbite-react';

const PaymentTable = () => {
  return (
    <div>
        <Table hoverable className='mb-2'>
            <Table.Head>
                <Table.HeadCell>
                    ID
                </Table.HeadCell>
                <Table.HeadCell>
                    Payment Type
                </Table.HeadCell>
                <Table.HeadCell>
                    Amount
                </Table.HeadCell>
                <Table.HeadCell>
                    Time
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-lg text-gray-900 dark:text-white">
                        22
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        Cash
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        Kshs. 2,000
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        12:00 PM
                    </Table.Cell>
                </Table.Row>

                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-lg text-gray-900 dark:text-white">
                        23
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        M-pesa
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        Kshs. 1,200
                    </Table.Cell>
                    <Table.Cell className='text-lg'>
                        12:00 PM
                    </Table.Cell>
                </Table.Row>
                
            </Table.Body>
        </Table>

        {/* <div className="flex items-center justify-center text-center">
                <Pagination
                    currentPage={4}
                    layout="table"
                    onPageChange={t}
                    totalPages={1000}
                />
        </div> */}
    </div>
  )
}

export default PaymentTable