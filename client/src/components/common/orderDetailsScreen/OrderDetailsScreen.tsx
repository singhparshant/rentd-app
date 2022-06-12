import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import useAuthState from '../../../zustand/useAuthState';

export default function OrderDetailsScreen() {
    const { id } = useParams<any>();

    const user = useAuthState((state: any) => state.user);

    return (
        <div>
            {user ? (<h1>OrderDetails for {user.name} with id: "{id}"</h1>) : <Redirect to="/login" />}
        </div>
    )

}
