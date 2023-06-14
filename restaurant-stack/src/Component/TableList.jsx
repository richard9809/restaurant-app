import React, { useEffect, useState } from 'react'
import TableItem from './TableItem';
import axiosClient from '../axios-client';

const TableList = ({ onTableClick }) => {

  const [tables, setTables] = useState([]);

  useEffect(() => {
    axiosClient.get('/tables')
      .then((res) => {
        console.log(res.data.data);
        setTables(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div>
        <h2 className='pb-2 px-4 border-b border-gray-400 text-4xl'>Table List</h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 my-4 px-4'>
            {tables.map((table) => (
                <TableItem 
                    key={table.id}
                    table={table}
                    onClick={() => onTableClick(table.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default TableList