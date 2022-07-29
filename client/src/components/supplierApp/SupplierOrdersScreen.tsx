import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Redirect } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { parseDate } from "../../utils/functions";
import useAuthState from "../../zustand/useAuthState";
import orderImage from "../../assets/order.png";
import "../adminApp/applicationsScreen/application.css";

type Props = {};

const SupplierOrdersScreen = (props: Props) => {
  const user = useAuthState((state: any) => state.user);
  const { orders, loading } = useOrders();

  if (!user) return <Redirect to="/login" />;
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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
        }}
      >
        <h1>Your orders</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {orders.length > 0 ? (
          <>
            {orders.map((order: any, index: number) => (
              <Card
                sx={{
                  margin: "8px",
                  transition: "transform 0.15s ease-in-out",
                  "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  width: "80%",
                }}
              >
                <div
                  key={index}
                  className="applicationCard"
                  style={{ height: "auto" }}
                >
                  <div style={{ width: "50%" }}>
                    <ul>
                      <li>{order.product.name}</li>
                    </ul>
                  </div>

                  <div>
                    <div style={{ paddingBottom: 5 }}>
                      <b>Quantity:</b> {order.quantity} <br />
                      <b>Duration:</b> {order.duration} Months
                    </div>
                  </div>

                  <img className="applicationImage" src={orderImage} alt="" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SupplierOrdersScreen;
