import React from 'react'
import { Redirect } from 'react-router-dom'
import useAuthState from '../../../zustand/useAuthState';
import ProductsTable from '../CustomTables/ProductsTable';
import MainBoard from '../MainBoard/MainBoard';

export default function ProductsPage() {
  const user = useAuthState((state: any) => state.user);
  return (
    <>
        {user ? (
        <div className="mainboard-div">
          <h2 className="dashboard-heading">Your Products</h2>
          {/* <CustomTable /> */}
          <ProductsTable />
        </div>
        ) : <Redirect to="/login" />}
    </>
  )
}
