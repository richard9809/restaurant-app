"use client";
import React from "react";
import { Table } from "flowbite-react";
import { Pagination } from "flowbite-react";

const PaymentTable = ({ payments, loading}) => {
    return (
        <div>
            <Table hoverable className="mb-2">
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Payment Type</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Change</Table.HeadCell>
                    <Table.HeadCell>Time</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {loading ? (
                        <Table.Row>
                            <Table.Cell colSpan={5} className="text-center">
                                Loading...
                            </Table.Cell>
                        </Table.Row>
                    ) : payments.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={5} className="text-center">
                                No payments today
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        payments.map((payment) => (
                            <Table.Row
                                key={payment.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-lg text-gray-900 dark:text-white">
                                    {payment.id}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    {payment.payment_type}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    Kshs. {payment.amount.toLocaleString()}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    Kshs. {payment.change.toLocaleString()}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    {payment.created_at}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>

        </div>
    );
};

export default PaymentTable;
