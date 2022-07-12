import React from 'react'
import { Redirect } from 'react-router-dom';
import useAuthState from '../../../zustand/useAuthState';
import CustomTable from '../CustomTables/CustomTable';
import DashboardCard from '../DashboardCard/DashboardCard';

const LandingPage = () => {
    const user = useAuthState((state: any) => state.user);
  return (
    <div>
        {user ? (
        <div className="mainboard-div">
        <h1 className='dashboard-heading'>Welcome {user.name}</h1>
        {/* <DashboardCard /> */}
        <CustomTable/>
        </div>
        ) : <Redirect to="/login" />}
    </div>
  )
}

export default LandingPage

        