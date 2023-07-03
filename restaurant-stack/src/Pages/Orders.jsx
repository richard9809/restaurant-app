import React, { useEffect, useState } from "react";
import OrdersTable from "../Component/OrdersTable";
import { useStateContext } from "../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client";

const Orders = () => {
    const { user } = useStateContext();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = () => {
        setLoading(true);
        axiosClient
            .get("/orders", { params: { page: currentPage } })
            .then((res) => {
                setTableData(res.data.data);
                setLastPage(res.data.meta.last_page);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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
        <div className="orders-page px-8 py-2 ">
            <ToastContainer />
            <h1 className="font-semibold text-2xl ">Orders Table</h1>
            <div className="py-2">
                <OrdersTable
                    role={user.role}
                    tableData={tableData}
                    loading={loading}
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                    lastPage={lastPage}
                />
            </div>
        </div>
    );
};

export default Orders;
