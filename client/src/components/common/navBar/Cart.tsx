import React from "react";
import "./Cart.css";
import useCart from "../../../zustand/useCart";

export default function Cart() {
  const cart = useCart((state: any) => state.cart);
  const numItems = cart.length;

  return (
    <div className="cartContainer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        width="40px"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        color="#2b0245"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <div className="numItems">{numItems}</div>
    </div>
  );
}
