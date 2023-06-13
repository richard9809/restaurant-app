import React from 'react'
import TableItem from './TableItem';

const TableList = ({ tables, onTableClick }) => {
    
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