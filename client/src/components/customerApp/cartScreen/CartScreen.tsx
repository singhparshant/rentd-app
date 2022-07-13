import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { Wrapper } from "./CartItem.styles";
import useCart from "../../../zustand/useCart";
import useAuthState from "../../../zustand/useAuthState";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../api/axios";

export default function CartScreen() {
  const {
    cart,
    removeItem,
    incrementItemDuration,
    incrementItemQuantity,
    decrementItemDuration,
    decrementItemQuantity,
    updateItem,
  } = useCart() as any;
  const history = useHistory();
  const { user } = useAuthState() as any;
  console.log("cart items are: ", user);
  const src =
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80";
  const icon = "https://www.svgrepo.com/show/21045/delete-button.svg";
  return (
    <Card
      style={{
        display: "block",
        alignContent: "center",
      }}
    >
      <div>
        <h2 style={{ marginLeft: "10%" }}>{user.username}'s cart: </h2>
      </div>
      {cart.map((index: any) => {
        //console.log("index  is: ", index)
        //console.log("index product is: ", index.product)
        return (
          <Wrapper style={{ marginLeft: "10%", marginBottom: "5%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ alignContent: "center", maxWidth: "100%" }}>
                <h3 style={{ marginLeft: "60%", width: "max-content" }}>
                  {index.product.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    marginTop: "20%",
                    marginRight: "20%",
                  }}
                >
                  <div
                    className="information"
                    style={{
                      textAlign: "center",
                      display: "block",
                      marginLeft: "30%",
                      minWidth: "max-content",
                    }}
                  >
                    <p style={{ display: "inline" }}>
                      Price/month: ${index.product.monthlyPrice}
                    </p>
                    <p>
                      Total: $
                      {(
                        index.quantity *
                        index.product.monthlyPrice *
                        index.rentalDuration
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div
                    className="buttonsQuantities"
                    style={{
                      alignSelf: "center",
                      display: "flex",
                      marginTop: "-15%",
                    }}
                  >
                    <div style={{ marginRight: "50px" }}>
                      <p style={{ marginLeft: "35%", marginRight: "-10%" }}>
                        Quantity
                      </p>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "-2%",
                          alignContent: "center",
                        }}
                      >
                        <Button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() => {
                            decrementItemQuantity(index);
                          }}
                        >
                          -
                        </Button>
                        <p style={{ marginLeft: "10%", marginRight: "10%" }}>
                          {index.quantity}
                        </p>
                        <Button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() => incrementItemQuantity(index)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div style={{ marginLeft: "50%", marginRight: "10%" }}>
                      <p style={{ marginLeft: "10%", marginRight: "-10%" }}>
                        Number of months
                      </p>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "-2%",
                          alignContent: "center",
                        }}
                      >
                        <Button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() => {
                            decrementItemDuration(index);
                          }}
                        >
                          -
                        </Button>
                        <p style={{ marginLeft: "10%", marginRight: "10%" }}>
                          {index.rentalDuration}
                        </p>
                        <Button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() => incrementItemDuration(index)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "30%",
                  alignSelf: "center",
                  verticalAlign: "middle",
                  marginTop: "0%",
                }}
              >
                <CardMedia
                  component="img"
                  image={src}
                  style={{
                    maxWidth: 200,
                    maxHeight: 160,
                    marginTop: "5%",
                    marginRight: "5%",
                  }}
                />
                <Button
                  style={{
                    maxWidth: "5%",
                    backgroundColor: "transparent",
                    marginLeft: "20%",
                    marginRight: "5%",
                    marginTop: "5%",
                  }}
                  variant="contained"
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  <img src={icon} height={20} style={{ marginRight: "10%" }} />
                </Button>
              </div>
            </div>
          </Wrapper>
        );
      })}
      <Button
        variant="contained"
        style={{
          alignSelf: "center",
          height: "50px",
          maxWidth: "40%",
          marginLeft: "30%",
          marginRight: "30%",
          marginBottom: "5%",
          backgroundColor: "#2b0245",
        }}
        onClick={() => {
          axiosInstance
            .post(
              "/payment/create-checkout-session",
              JSON.stringify({
                items: [
                  { id: 1, quantity: 3 },
                  { id: 2, quantity: 1 },
                ],
              })
            )
            .then((res) => {
              console.log("RES: ", res);
              if (res.data) return res.data;
              return res.data.then((json: any) => Promise.reject(json));
            })
            .then(({ url }) => {
              console.log("URL: ", url);
              window.location = url;
            })
            .catch((e) => console.error(e.error));
        }}
      >
        Proceed to checkout
      </Button>
    </Card>
  );
}
