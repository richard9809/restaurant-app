'use client';
import React from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const OrdersTable = () => {
    const tableData = [
        {
          id: 1,
          order: "56789043",
          table: "Table 7",
          waiter: "Jane Doe",
          total: "Ksh 1,300",
          time: "8:34 AM",
          actions: ["Edit", "Checkout", "Print"],
        },
        {
          id: 2,
          order: "12345678",
          table: "Table 3",
          waiter: "John Smith",
          total: "Ksh 900",
          time: "10:15 AM",
          actions: ["Edit", "Checkout", "Print"],
        },
        {
          id: 3,
          order: "98765432",
          table: "Table 2",
          waiter: "Alice Johnson",
          total: "Ksh 2,500",
          time: "12:45 PM",
          actions: ["Edit", "Checkout", "Print"],
        },
        {
          id: 4,
          order: "24681357",
          table: "Table 9",
          waiter: "Bob Anderson",
          total: "Ksh 1,750",
          time: "2:20 PM",
          actions: ["Edit", "Checkout", "Print"],
        },
        {
          id: 5,
          order: "13579246",
          table: "Table 5",
          waiter: "Emily Wilson",
          total: "Ksh 1,100",
          time: "4:05 PM",
          actions: ["Edit", "Checkout", "Print"],
        },
        {
          id: 6,
          order: "11122233",
          table: "Table 1",
          waiter: "David Thompson",
          total: "Ksh 1,600",
          time: "6:30 PM",
          actions: ["Edit", "Checkout", "Print"],
        },
      ];
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
                {tableData.map((row, index) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {row.order}
                        </Table.Cell>
                        <Table.Cell>
                            {row.table}
                        </Table.Cell>
                        <Table.Cell>
                            {row.waiter}
                        </Table.Cell>
                        <Table.Cell>
                            {row.total}
                        </Table.Cell>
                        <Table.Cell>
                            {row.time}
                        </Table.Cell>
                        <Table.Cell className='flex gap-4'>
                            <Link
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            to={`/orders/edit/${row.id}`}
                            >
                            <p className='flex gap-2 justify-items-center underline'>
                                <div>
                                    <i class="fa fa-pen"></i>
                                </div>
                                <div>Edit</div>
                            </p>
                            </Link>
                            <Link
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            to={`/orders/checkout/${row.id}`}
                            >
                                <p className='flex gap-2 justify-items-center underline'>
                                    <div>
                                        <i class="fa fa-cart-shopping"></i>
                                    </div>
                                    <div>Checkout</div>
                                </p>
                            </Link>
                            <a
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            href="/tables"
                            >
                                <p className='flex gap-2 justify-items-center underline'>
                                    <div>
                                        <i class="fa fa-print"></i>
                                    </div>
                                    <div>Print</div>
                                </p>
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