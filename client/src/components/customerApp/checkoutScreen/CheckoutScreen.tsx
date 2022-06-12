import React from 'react'
import { Redirect } from 'react-router-dom';
import useAuthState from '../../../zustand/useAuthState'

export default function CheckoutScreen() {

  const user = useAuthState((state: any) => state.user);

  return (
    <div>
      {user ? (<h1>Checkout for {user.name}</h1>) : <Redirect to="/login"/>}
    </div>
  )
}
