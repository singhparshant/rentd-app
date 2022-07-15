import { createTheme } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";
require("dotenv").config();
// const stripe = require("stripe")(process.env.);

const theme = createTheme();

const PUBLIC_KEY =
  "pk_test_51LD1psAqx8fbBPJRPg8EHIT2nhkUUkY6TyRQHziyRjzqr56wED1EUYzvndSDLEMgWwK4FvtJFgYO7tvmGOFSgd7U00TrqHc3zf";
// const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function CheckoutScreen() {
  const { user } = useAuthState() as any;

  return <div>{user ? Render() : <Redirect to="/login" />}</div>;
}

const Render = () => {
  //const fromRef = useRef<any>(null);
  const { user } = useAuthState() as any;
  return (
    <></>
    // <Elements stripe={stripeTestPromise}>
    //   <PaymentForm />
    // </Elements>
  );
  return <h1>Checkout f or {user.name}</h1>;
};

// This is your test secret API key.
