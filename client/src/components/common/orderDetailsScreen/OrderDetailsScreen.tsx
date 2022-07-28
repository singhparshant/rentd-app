import { CircularProgress, Container, dividerClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Redirect, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { parseDate } from "../../../utils/functions";
import useAuthState from "../../../zustand/useAuthState";

export default function OrderDetailsScreen() {
  const user = useAuthState((state: any) => state.user);
  const location = useLocation() as any;
  const { order } = location.state;
  const [loading, setLoading] = useState(true);
  const [orderItemsData, setOrderItemsData] = useState<any>([]);

  useEffect(() => {
    //to prevent useEffect from being triggered twice
    let ignore = false;
    const getOrderItems = async () => {
      for (let i = 0; i < order.orderItems.length; i++) {
        const orderItem = order.orderItems[i];
        //get the product
        const productResponse = await axiosInstance.get(
          `/products/${orderItem.productId}`
        );
        const product = productResponse.data;
        if (!ignore)
          setOrderItemsData((prev: any) => [
            ...prev,
            { ...orderItem, product },
          ]);
      }
      setLoading(false);
    };

    getOrderItems();
    return () => {
      ignore = true;
    };
  }, []);

  if (!user) return <Redirect to="/login" />;

  const handleRefund = async (orderItemId: string) => {
    console.log("orderItemId", orderItemId);
    try {
      const response = await axiosInstance.post("/payment/refund", {
        orderId: order._id,
        orderItemId: orderItemId,
      });
      console.log("refund response, ", response.data);
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return loading ? (
    <CircularProgress
      sx={{
        marginLeft: "50%",
        marginTop: "20px",
        marginBottom: "20px",
        color: "#2b0245",
      }}
    />
  ) : (
    <Container
      component="main"
      maxWidth="md"
      sx={{ boxShadow: 5, paddingBottom: 5, marginTop: 10, marginBottom: 10 }}
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

        <div style={{ marginLeft: 40 }}>
          {orderItemsData.map((orderItem: any) => (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <div>
                  <span>
                    <strong>{orderItem.quantity}x </strong>
                  </span>
                  <span>{orderItem.product.name}</span>
                </div>
                <span>
                  <strong>
                    {orderItem.quantity *
                      orderItem.product.monthlyPrice *
                      orderItem.duration *
                      (1 - 0.01 * orderItem.product.discount) +
                      orderItem.product.deposit}
                    €
                  </strong>
                </span>
              </div>
              <div style={{ paddingLeft: 15 }}>
                <div>
                  status:
                  <strong style={{ color: "green" }}>
                    &nbsp;{orderItem.status}
                  </strong>
                </div>

                <div style={{ marginTop: 5 }}>
                  Rental duration: {orderItem.duration} month
                  {orderItem.duration > 1 ? "s" : ""}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={
                    `data:image/png;base64,` +
                    orderItem.product.productImages[0]
                  }
                  style={{
                    margin: "25px",
                    maxHeight: 250,
                    maxWidth: 250,
                    borderRadius: 15,
                  }}
                  alt="Could not load."
                />
                {orderItem.status !== "refunded" && (
                  <div
                    className="button"
                    onClick={() => handleRefund(orderItem._id)}
                  >
                    Refund
                  </div>
                )}
              </div>

              <hr />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <strong>Total: {order.amount}€</strong>
          </div>
        </div>
      </div>
    </Container>
  );
}
