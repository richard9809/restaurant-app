'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

const OrdersTable = ({ role }) => {
    const [ tableData, setTableData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);

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

    const handleDelete = (id) => {
        console.log('Clicked ' + id);
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = () => {
        setLoading(true);
        axiosClient.delete(`/orders/${deleteId}`)
        .then((res) => {
            console.log(res);
            setShowDeleteModal(false);
            setTableData(tableData.filter((row) => row.id !== deleteId));
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setShowDeleteModal(false);
            setLoading(false);
        })
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

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
                            {role === 'cashier' && (
                                <>
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
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        <div className='flex gap-2 justify-items-center underline'>
                                            <div>
                                                <i className="fa fa-trash"></i>
                                            </div>
                                            <div>Delete</div>
                                        </div>
                                    </a>
                                </>
                            )}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>

            {showDeleteModal && (
                <div
                    tabIndex="-1"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
                >
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
                    <div className="relative w-full max-w-md">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                        onClick={handleDeleteCancel}
                        >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            onClick={handleDeleteConfirm}
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={handleDeleteCancel}
                        >
                            No, cancel
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default OrdersTable