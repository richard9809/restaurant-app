import React from 'react';
import SidebarItem from './SidebarItem';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';

const Sidebar = ({logout}) => {

  return (
    <div className='bg-gray-200 w-20 h-full gap-20 flex flex-col justify-between'>
      <SidebarItem icon={<i className="fa fa-home" />} name="HOME" to="/" />
      <SidebarItem icon={<i className="fa fa-book" />} name="MENU" to="/menu" />
      <SidebarItem icon={<i className="fa fa-money" />} name="PAYMENT" to="/payment" />
      <SidebarItem icon={<i className="fa fa-grip" />} name="ORDERS" to="/orders" />
      <div className='border-t border-gray-400 py-4'>
        <SidebarItem icon={<i className="fa fa-arrow-right-from-bracket" />} name="LOG OUT" onClick={logout}/>
      </div>
    </div>
  );
};

export default Sidebar;