import React from "react";
import useCart from "../../../zustand/useCart";

export default function CartScreen() {
  const cart = useCart((state: any) => state.cart);

  console.log("cart", cart);
  return <h1>Your Cart</h1>;
}
