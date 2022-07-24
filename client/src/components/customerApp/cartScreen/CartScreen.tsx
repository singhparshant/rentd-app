import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import useAuthState from "../../../zustand/useAuthState";
import useCart from "../../../zustand/useCart";
import { Order, OrderItem, Product } from "../../common/interfaces/Interfaces";
import useViewport from "../../../hooks/useViewPort";
import emptyCart from "../../../assets/emptyCart.png";

const buttonStyle = {
  height: "30px",
  backgroundColor: "#ffb93f",
  border: "none",
  padding: "5px",
  borderRadius: "9999px",
  margin: "10px",
};
const checkoutButtonStyle = {
  alignSelf: "center",
  height: "50px",
  maxWidth: "40%",
  marginLeft: "30%",
  marginRight: "30%",
  marginBottom: "5%",
  marginTop: "5%",
  backgroundColor: "#2b0245",
};

export default function CartScreen() {
  const {
    cart,
    removeItem,
    incrementItemDuration,
    addItemToCart,
    decrementItemDuration,
    decrementItemQuantity,
  } = useCart() as any;

  const history = useHistory();
  const { user } = useAuthState() as any;
  const { width } = useViewport();
  const breakpoint = 550;

  //create an order out of the basket
  const order: Order = { customerId: user.id, orderItems: cart };

  const handleCheckout = () => {
    if (!user) {
      history.push("/login");
      return;
    }
    axiosInstance
      .post("/payment/create-checkout-session", order)
      .then((res) => {
        if (res.data) return res.data;
        return res.data.then((json: any) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => console.error(e.error));
  };

  return (
    <div
      style={{
        display: width > breakpoint ? "flex" : "block",
        flexDirection: width > breakpoint ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {cart.length > 0 ? (
        <>
          {" "}
          <h1>Your cart</h1>
          {cart.map((item: OrderItem) => {
            const product: Product = item.product;
            return (
              <div
                style={{ width: width > breakpoint ? "70%" : "100%" }}
                key={item._id}
              >
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                ></div>
                <Link
                  to={{
                    pathname: `/products/${product._id}`,
                    state: { fromProductsPage: product },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      margin: "8px",
                      // width: "80%",
                      transition: "transform 0.15s ease-in-out",
                      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                    }}
                  >
                    <div style={{ margin: 5, border: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          src={
                            `data:image/png;base64,` + product.productImages[0]
                          }
                          style={{ maxHeight: 100 }}
                          alt="Could not load"
                        />
                        <div
                          className="quantity"
                          style={{
                            display: width > breakpoint ? "flex" : "block",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span>Quantiy:&nbsp;</span>
                          </div>
                          <div>
                            <Button
                              style={buttonStyle}
                              onClick={(e) => {
                                e.preventDefault();
                                addItemToCart(item);
                              }}
                            >
                              <AddIcon />
                            </Button>
                          </div>
                          <div style={{ textAlign: "center", fontSize: 18 }}>
                            {item.quantity}
                          </div>
                          <div>
                            <Button
                              style={buttonStyle}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.quantity > 1)
                                  decrementItemQuantity(item);
                                else removeItem(item);
                              }}
                            >
                              <RemoveIcon />
                            </Button>
                          </div>
                        </div>

                        <div
                          className="duration"
                          style={{
                            display: width > breakpoint ? "flex" : "block",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span>Duration:&nbsp;</span>
                          </div>
                          <div>
                            <Button
                              style={buttonStyle}
                              onClick={(e) => {
                                e.preventDefault();
                                incrementItemDuration(item);
                              }}
                            >
                              <AddIcon />
                            </Button>
                          </div>
                          <div style={{ textAlign: "center", fontSize: 18 }}>
                            {item.duration}
                          </div>
                          <div>
                            <Button
                              style={buttonStyle}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.duration > 1)
                                  decrementItemDuration(item);
                              }}
                            >
                              <RemoveIcon />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent>
                        <Typography variant="h5" color="#ffb93f">
                          €{product.monthlyPrice} /month
                        </Typography>

                        <br></br>
                        <Typography variant="body1" color="text.primary">
                          {product.name}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <div style={{ margin: 20 }}>
          <img src={emptyCart} alt="your cart is empty"></img>
        </div>
      )}

      {cart.length > 0 && (
        <Button
          variant="contained"
          style={checkoutButtonStyle}
          disabled={cart.length > 0 ? false : true}
          onClick={handleCheckout}
        >
          <p style={{ color: "white" }}>Proceed to checkout</p>
        </Button>
      )}
    </div>
  );
}
