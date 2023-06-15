import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Payment from './Pages/Payment';
import Orders from './Pages/Orders';
import MakeOrder from './Pages/MakeOrder';
import Checkout from './Pages/Checkout';
import Edit from './Pages/Edit';
import Login from './Pages/Login';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/orders/table/:id',
        element: <MakeOrder />
      },
      {
        path: '/orders/edit/:id',
        element: <Edit />
      },
      {
        path: '/orders/checkout/:id',
        element: <Checkout />
      },
      {
        path: '/payment',
        element: <Payment />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

export default router;



