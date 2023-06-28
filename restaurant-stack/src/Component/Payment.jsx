"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

const Payment = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});
    const [cashReceived, setCashReceived] = useState(0);
    const [mpesaReceived, setMpesaReceived] = useState(0);
    const [change, setChange] = useState(0);
    const [payLoading, setPayLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
    const [mpesaModal, setMpesaModal] = useState(false);
    const [mpesas, setMpesas] = useState([]);
    const [mpesaLoading, setMpesaLoading] = useState(false);
    const [mpesaTransactions, setMpesaTransactions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`orders/${id}`)
            .then((res) => {
                setOrder(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const handleCashReceivedChange = (event) => {
        const cash = parseFloat(event.target.value);
        setCashReceived(cash);
    };

    // Function to get the total amount of all the mpesa transactions
    useEffect(() => {
        const total = mpesaTransactions.reduce(
            (acc, transaction) => acc + parseFloat(transaction.amount),
            0
        );
        setMpesaReceived(total);
    }, [mpesaTransactions]);

    useEffect(() => {
        const payableAmount = order.total;
        const totalReceived = cashReceived + mpesaReceived;
        const calculatedChange = totalReceived - payableAmount;
        setChange(calculatedChange);
    }, [mpesaReceived, cashReceived]);


    const handlePaymentMethodClick = (method) => {
        setSelectedPaymentMethod(method);

        const cashDiv = document.getElementById("cash");
        const mpesaDiv = document.getElementById("mpesa");

        if (method === "cash") {
            if (cashDiv && mpesaDiv) {
                cashDiv.classList.remove("hidden");
                mpesaDiv.classList.add("hidden");
            }
        } else if (method === "mpesa") {
            setMpesaModal(true);
            setMpesaLoading(true);

            axiosClient
                .get("/mpesas")
                .then((res) => {
                    setMpesas(res.data.data);
                    setMpesaLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setMpesaLoading(false);
                });

            if (cashDiv && mpesaDiv) {
                cashDiv.classList.add("hidden");
                mpesaDiv.classList.remove("hidden");
            }
        }
    };

    const hideModal = () => {
        setMpesaModal(false);
    };

    // Function to handle transaction deletion
    const deleteTransaction = (transactionId) => {
        setMpesaTransactions((prevTransactions) =>
            prevTransactions.filter(
                (transaction) => transaction.id !== transactionId
            )
        );
    };

    const handleSubmit = () => {
   
        // Prepare payment data
        const payments = [];

        // Add cash payments
        if (cashReceived > 0){
            payments.push({
                amount: cashReceived,
                change: change,
                mpesa_id: null
            });
        }

        mpesaTransactions.forEach((transaction) => {
            payments.push({
                amount: transaction.amount,
                change: change,
                mpesa_id: transaction.id
            });
        });

        const payload = {
            order_id: id,
            payments: payments,
        };

        setPayLoading(true);

        console.log(payload);

        axiosClient
            .post("/payments", payload)
            .then((res) => {
                console.log(res);
                setPayLoading(false);
                navigate("/payment");
            })
            .catch((error) => {
                console.log(error);
                setPayLoading(false);
            });
    };

    return (
        <div className="flex flex-col overflow-hidden h-full">
            <div className="flex flex-col gap-2 py-2 border-b border-dashed">
                <h1 className="uppercase font-semibold text-2xl">
                    Payable Amount
                </h1>
                {loading && (
                    <div role="status" class="max-w-sm animate-pulse">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                        <span class="sr-only">Loading...</span>
                    </div>
                )}
                {!loading && (
                    <p className="text-3xl font-bold text-blue-500">
                        Kshs. {order.total}
                    </p>
                )}
            </div>

            <div className="flex justify-between py-8">
                <button
                    className={`${
                        selectedPaymentMethod === "cash"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                    } uppercase text-xl font-normal py-4 px-12 rounded-md hover:bg-blue-600 hover:text-white`}
                    onClick={() => handlePaymentMethodClick("cash")}
                >
                    <div>
                        <i className="fa fa-money-bill"></i>
                        <p>Cash</p>
                    </div>
                </button>

                <button
                    className={`${
                        selectedPaymentMethod === "mpesa"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                    } uppercase text-xl font-normal py-4 px-12 rounded-md hover:bg-blue-600 hover:text-white`}
                    onClick={() => handlePaymentMethodClick("mpesa")}
                >
                    <div>
                        <i className="fa fa-credit-card"></i>
                        <p>M-PESA</p>
                    </div>
                </button>
            </div>

            <div className="border-b border-dashed" style={{ height: "20rem" }}>
                <div id="cash">
                    <div className="cash-input bg-blue-100 py-4 px-2 rounded-sm ">
                        <label className="font-normal text-2xl">
                            {" "}
                            Add Cash Received
                        </label>
                        <input
                            type="number"
                            class="input-underline text-center text-xl font-bold bg-blue-100"
                            onChange={handleCashReceivedChange}
                            value={cashReceived}
                        />
                    </div>
                </div>

                <div id="mpesa" className="hidden">
                    <div className="bg-blue-100 py-4 px-2 rounded-sm">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <tbody>
                                {mpesaTransactions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center p-3"
                                        >
                                            No mpesa transactions
                                        </td>
                                    </tr>
                                ) : (
                                    mpesaTransactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="bg-white dark:bg-gray-800"
                                        >
                                            <td className="px-6 py-4 text-md font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                                {transaction.first_name}
                                            </td>
                                            <td className="px-6 py-4 text-lg font-semibold  dark:text-gray-400 whitespace-nowrap">
                                                Ksh {transaction.amount}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        deleteTransaction(
                                                            transaction.id
                                                        )
                                                    }
                                                >
                                                    <i className=" text-red-500 fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="grid grid-cols-2">
                    <h3 className="font-semibold uppercase text-2xl px-2">
                        Change (Ksh)
                    </h3>
                    <p className="text-3xl font-bold text-blue-500 justify-self-end">
                        {change.toFixed(2)}
                    </p>
                </div>
                <div className="py-8">
                    <button
                        className="bg-green-500 uppercase spacing-2 text-xl font-semibold text-white py-4 px-32 rounded-md hover:bg-green-600"
                        onClick={handleSubmit}
                    >
                        {payLoading ? (
                            <div className="text-center">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Pay ...
                            </div>
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {mpesaModal && mpesas && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-gray-900 ">
                    <div className="bg-white rounded-lg shadow max-w-5xl width">
                        <>
                            <div className="flex justify-between p-4 border-b ">
                                <h3 className="flex justify-between text-2xl font-semibold text-gray-900">
                                    Transactions
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={hideModal}
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
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold text-gray-500"></h2>
                                    <h2 className="text-lg font-bold text-gray-500"></h2>
                                </div>
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    First Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Middle Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Transaction No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Phone No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Transaction Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Time
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mpesas.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={5}
                                                        className="text-center p-3"
                                                    >
                                                        No mpesa transactions
                                                    </td>
                                                </tr>
                                            )}
                                            {mpesas.map((mpesa) => (
                                                <tr
                                                    key={mpesa.id}
                                                    class="bg-white dark:bg-gray-800"
                                                >
                                                    <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.id}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.FirstName}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.MiddleName}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.TransID}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.MSISDN}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.TransAmount}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {mpesa.created_at}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        <button
                                                            className="font-medium text-cyan-600 hover:underline hover:text-green-500 dark:text-cyan-500 cursor-pointer"
                                                            onClick={() => {
                                                                const transaction =
                                                                    {
                                                                        id: mpesa.id,
                                                                        first_name:
                                                                            mpesa.FirstName,
                                                                        amount: mpesa.TransAmount,
                                                                    };
                                                                if (
                                                                    !mpesaTransactions.some(
                                                                        (t) =>
                                                                            t.id ===
                                                                            transaction.id
                                                                    )
                                                                ) {
                                                                    setMpesaTransactions(
                                                                        (
                                                                            prevTransactions
                                                                        ) => [
                                                                            ...prevTransactions,
                                                                            transaction,
                                                                        ]
                                                                    );
                                                                }
                                                                hideModal();
                                                            }}
                                                        >
                                                            <div className="flex gap-2 justify-items-center">
                                                                <div>
                                                                    <i className="fa fa-money-bill"></i>
                                                                </div>
                                                                <div>Pay</div>
                                                            </div>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <p className="text-3xl font-bold text-gray-900"></p>
                            </div>
                        </>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
