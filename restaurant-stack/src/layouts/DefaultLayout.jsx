import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";

export default function DefaultLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="app">
            <header className="navbar">
                <Navbar />
            </header>
            <div className="content-wrapper ">
                <aside className="sidebar">
                    <Sidebar />
                </aside>
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
