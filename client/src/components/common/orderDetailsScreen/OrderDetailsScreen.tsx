import {
  Box,
  CircularProgress,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { parseDate } from "../../../utils/functions";
import useAuthState from "../../../zustand/useAuthState";

export default function OrderDetailsScreen() {
  const user = useAuthState((state: any) => state.user);
  const location = useLocation() as any;
  const { order } = location.state;
  const [loading, setLoading] = useState(true);
  const [orderItemsData, setOrderItemsData] = useState<any>([]);
  const [refundOrderItemId, setRefundOrderItemId] = useState("");
  const [refundDescription, setRefundDescription] = useState("");
  const history = useHistory();

  //for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (refundOrderItemId: string) => {
    setRefundOrderItemId(refundOrderItemId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
  }, [order.orderItems]);

  if (!user) return <Redirect to="/login" />;

  const handleRefund = async (orderItemId: string) => {
    try {
      const response = await axiosInstance.post("/payment/refund", {
        orderId: order._id,
        orderItemId: orderItemId,
        description: refundDescription,
      });
      console.log("refund response, ", response.data);
      toast.success("refunded!");
      history.push("/orders");
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  const handleContact = () => {
    history.push("/");
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
                      (orderItem.product.monthlyPrice *
                        (1 - 0.01 * orderItem.product.discount) +
                        orderItem.product.deposit)}
                    €
                  </strong>
                </span>
              </div>
              <div style={{ paddingLeft: 15 }}>
                <div>
                  status:
                  <strong style={{ color: "green" }}>
                    &nbsp;
                    {orderItem.status.charAt(0).toUpperCase() +
                      orderItem.status.substring(1)}
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
                    onClick={() => handleOpen(orderItem._id)}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span style={{ fontWeight: "bold", fontSize: 28 }}>
                Return Product
              </span>
            </Typography>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <p style={{ fontSize: 18 }}>
              Please state the reason for the refund:
            </p>
            <textarea
              value={refundDescription}
              onChange={(e) => setRefundDescription(e.target.value)}
              style={{
                width: "95%",
                minHeight: 150,
                fontSize: 16,
                padding: 10,
              }}
            ></textarea>
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="button" onClick={handleContact}>
              contact us
            </div>
            <div
              className="button"
              onClick={() => handleRefund(refundOrderItemId)}
            >
              confirm
            </div>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
  borderRadius: 2,
};
