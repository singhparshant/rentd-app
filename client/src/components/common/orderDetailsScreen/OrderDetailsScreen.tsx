import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { parseDate } from "../../../utils/functions";
import useAuthState from "../../../zustand/useAuthState";

export default function OrderDetailsScreen() {
  const user = useAuthState((state: any) => state.user);
  const location = useLocation() as any;
  const { order } = location.state;
  const [orderItems, setOrderItems] = useState<any>([]);

  console.log("order", order);

  useEffect(() => {
    const getOrderItems = async () => {
      const orderItems = order.orderItems;
      for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        //get the product
        const productResponse = await axiosInstance.get(
          `/products/${orderItem.productId}`
        );
        const product = productResponse.data;
        setOrderItems((prev: any) => [...prev, { ...orderItem, product }]);
      }
    };

    getOrderItems();
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ boxShadow: 5, paddingBottom: 5, marginTop: 10 }}
    >
      <div className="applicationDetailsContainer">
        <h1>Order Details</h1>
      </div>
      <div className="applicationDetails">
        {order.createdAt && (
          <p>
            <span className="label">Ordered on: </span>
            {parseDate(new Date(order.createdAt))}
          </p>
        )}
        <p>
          <span className="label">Order items: </span>
        </p>

        {orderItems.map((orderItem: any) => {
          console.log(orderItem);
        })}
      </div>
    </Container>
  );
}
