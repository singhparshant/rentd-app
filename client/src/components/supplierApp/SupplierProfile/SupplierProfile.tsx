import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axios';
import { profilePath } from '../../../api/requestPaths';
import useAuthState from "../../../zustand/useAuthState";
//import axiosInstance from '../../../api/axios';

const SupplierProfile = () => {
    const user = useAuthState((state: any) => state.user);
    const [userData, setUserData] = useState<any>({});
    const [error, setError] = useState<any>(null);
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response: any = await axiosInstance.get(profilePath, {
            data: user.id
          });
          setUserData(response);
        } catch (error: any) {
          setError(error);
        }
      };
      fetchUserData();
    }, [user.id, userData]);
  return (
    <div>
      <h2>Your Profile</h2>
      <div>Welcome back {user?.username} with role {user?.role}</div>
    </div>
  )
}

export default SupplierProfile