import React, { useEffect, useState } from 'react'
import TableList from '../Component/TableList'

const Home = () => {

  const handleTableClick = (tableId) => {
    // Handle table click event
    console.log('Table clicked:', tableId);
  };

  return (
    <div >
      <TableList onTableClick={handleTableClick} />
    </div>
  )
}

export default Home