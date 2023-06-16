'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

const OrdersTable = () => {
    const [ tableData, setTableData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/orders')
        .then((res) => {
            setTableData(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }, []);

  return (
    <div>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>
                Order #
                </Table.HeadCell>
                <Table.HeadCell>
                Table #
                </Table.HeadCell>
                <Table.HeadCell>
                Waiter
                </Table.HeadCell>
                <Table.HeadCell>
                Total
                </Table.HeadCell>
                <Table.HeadCell>
                Time
                </Table.HeadCell>
                <Table.HeadCell>
                <span className="sr-only">
                    Edit
                </span>
                <span className="sr-only">
                    Pay
                </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y fs">
                {loading && (
                    <Table.Row>
                        <Table.Cell colSpan={6} className="text-center">
                            Loading...
                        </Table.Cell>
                    </Table.Row>
                )}
                
                {!loading && tableData.map((row) => (
                    <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {row.id}
                        </Table.Cell>
                        <Table.Cell>
                            {row.table_name}
                        </Table.Cell>
                        <Table.Cell>
                            {row.employee_name}
                        </Table.Cell>
                        <Table.Cell>
                           Ksh. {row.total.toLocaleString()}
                        </Table.Cell>
                        <Table.Cell>
                            {row.created_at}
                        </Table.Cell>
                        <Table.Cell className='flex gap-4'>
                            <Link
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            to={`/orders/edit/${row.id}`}
                            >
                            <div className='flex gap-2 justify-items-center underline'>
                                <div>
                                    <i className="fa fa-pen"></i>
                                </div>
                                <div>Edit</div>
                            </div>
                            </Link>
                            <Link
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            to={`/orders/checkout/${row.id}`}
                            >
                                <div className='flex gap-2 justify-items-center underline'>
                                    <div>
                                        <i className="fa fa-cart-shopping"></i>
                                    </div>
                                    <div>Checkout</div>
                                </div>
                            </Link>
                            <a
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            href="/tables"
                            >
                                <div className='flex gap-2 justify-items-center underline'>
                                    <div>
                                        <i className="fa fa-print"></i>
                                    </div>
                                    <div>Print</div>
                                </div>
                            </a>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>
    </div>
  )
}

export default OrdersTable