import React from "react";
import { Redirect } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import { Elements, useStripe, useElements, PaymentElement, IbanElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm"

const stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const theme = createTheme();

const PUBLIC_KEY = "pk_test_51LD1psAqx8fbBPJRPg8EHIT2nhkUUkY6TyRQHziyRjzqr56wED1EUYzvndSDLEMgWwK4FvtJFgYO7tvmGOFSgd7U00TrqHc3zf"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function CheckoutScreen() {
  
  const { user } = useAuthState() as any;
  
  
  return (
    <div>
      {user ? Render() : <Redirect to="/login" />}
    </div>
  );
}

const Render = () =>  {
  //const fromRef = useRef<any>(null);
  const { user } = useAuthState() as any;
  return (
    < Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>

  )
  return <h1>Checkout for {user.name}</h1> 
}
