"use client";
import React from "react";
import { Table } from "flowbite-react";

const OrderSummaryItems = ({ loading, orderItems }) => {
    return (
        <div style={{ width: "50rem" }}>
            <Table hoverable className="mb-2">
                <Table.Head>
                    <Table.HeadCell>Item</Table.HeadCell>
                    <Table.HeadCell>Qty</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Subtotal</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {loading && (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap uppercase font-medium text-lg text-gray-900 dark:text-white">
                                <div
                                    role="status"
                                    class="max-w-sm animate-pulse"
                                >
                                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-2"></div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="text-lg">
                                <div
                                    role="status"
                                    class="max-w-sm animate-pulse"
                                >
                                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mt-2"></div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="text-lg">
                                <div
                                    role="status"
                                    class="max-w-sm animate-pulse"
                                >
                                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mt-2"></div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="text-lg">
                                <div
                                    role="status"
                                    class="max-w-sm animate-pulse"
                                >
                                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mt-2"></div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}

                    {!loading &&
                        orderItems.map((orderItem) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap uppercase font-medium text-lg text-gray-900 dark:text-white">
                                    {orderItem.food_name}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    {orderItem.quantity}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    Ksh {orderItem.price}
                                </Table.Cell>
                                <Table.Cell className="text-lg">
                                    Ksh {orderItem.sub_total}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default OrderSummaryItems;
