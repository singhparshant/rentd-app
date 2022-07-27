import React from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";

export default function OrderDetailsScreen() {
  const { id } = useParams<any>();

  const user = useAuthState((state: any) => state.user);
  const location = useLocation() as any;
  const { order } = location.state;

  console.log("order", order);

  if (!user) return <Redirect to="/login" />;
  return <div></div>;
}
