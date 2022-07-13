import React from 'react'
import { Redirect } from 'react-router-dom'
import useAuthState from '../../../zustand/useAuthState';
import CustomTable from '../CustomTable/CustomTable';

export default function ProductsPage() {
  const user = useAuthState((state: any) => state.user);
  return (
    <div>
        {user ? (
        <div className="mainboard-div">
          <CustomTable />
        </div>
        ) : <Redirect to="/login" />}
    </div>
    
  )
}
