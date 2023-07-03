"use client";
import React, { useEffect, useState } from "react";
import PaymentTable from "../Component/PaymentTable";
import { Card } from "flowbite-react";
import axiosClient from "./../axios-client";

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cashAmount, setCashAmount] = useState(0);
    const [mpesaAmount, setMpesaAmount] = useState(0);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/payments")
            .then((response) => {
                setPayments(response.data.data);
                calculateAmounts(response.data.data);
                setLoading(false);
            }) 
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const calculateAmounts = (data) => {
        let total = 0;
        let cash = 0;
        let mpesa = 0;

        for (let i = 0; i < data.length; i++) {
            const payment = data[i];
            total += payment.amount;

            if (payment.payment_type === "cash") {
                cash += payment.amount;
            } else if (payment.payment_type === "mpesa") {
                mpesa += payment.amount;
            }
        }

        setTotalAmount(total);
        setCashAmount(cash);
        setMpesaAmount(mpesa);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="payment-page ">
            <div className="payment-card px-4 py-4 bg-gray-100">
                <div>
                    <Card href="#" className="w-72">
                        <h5 className="text-2xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
                            Total Payments
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            Kshs. {totalAmount.toLocaleString()}
                        </p>
                    </Card>
                </div>

                <div>
                    <Card href="#" className="w-72">
                        <h5 className="text-2xl uppercase font-bold tracking-tight text-gray-900 dark:text-white">
                            <>Cash Payments</>
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            <>Kshs. {cashAmount.toLocaleString()}</>
                        </p>
                    </Card>
                </div>

                <div>
                    <Card href="#" className="w-72">
                        <h5 className="text-2xl uppercase font-bold tracking-tight text-gray-900 dark:text-white">
                            <>Mpesa Payments</>
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            <>Kshs. {mpesaAmount.toLocaleString()}</>
                        </p>
                    </Card>
                </div>
            </div>
            <div className="h-full makeOrder-container col-span-3 py-4 px-4 border-l">
                <PaymentTable
                    payments={payments}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Payment;
