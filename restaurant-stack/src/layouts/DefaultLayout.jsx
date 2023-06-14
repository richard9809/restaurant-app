import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import axiosClient from "../axios-client";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { user, setUser, token, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const logout = ev => {
      ev.preventDefault()
      console.log('logout')
      axiosClient.post('/logout')
        .then(() => {
            setUser({})
          setToken(null)
        })
    }
  
    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return (
        <div className="app">
            <header className="navbar">
                <Navbar user={user.name}/>
            </header>
            <div className="content-wrapper ">
                <aside className="sidebar">
                    <Sidebar logout={logout}/>
                </aside>
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
