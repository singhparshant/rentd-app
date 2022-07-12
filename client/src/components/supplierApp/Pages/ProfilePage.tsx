import React from 'react'
import { Redirect } from 'react-router-dom'
import useAuthState from '../../../zustand/useAuthState';
import SupplierProfile from '../SupplierProfile/SupplierProfile'

const ProfilePage = () => {
    const user = useAuthState((state: any) => state.user);
  return (
    <div>
        {user ? (
        <div className="mainboard-div">
          <SupplierProfile />
        </div>
        ) : <Redirect to="/login" />}
    </div>
  )
}

export default ProfilePage