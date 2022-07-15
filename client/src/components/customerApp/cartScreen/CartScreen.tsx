import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import useAuthState from "../../../zustand/useAuthState";
import useCart from "../../../zustand/useCart";
import { Order, OrderItem, Product } from "../../common/interfaces/Interfaces";

const buttonStyle = {
  width: "45px",
  height: "45px",
  backgroundColor: "#ffb93f",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  margin: "2px",
};
const product: Product = {
  avgRating: 3.5,
  category: "Household",
  deposit: 300,
  description:
    "Polyester fabric cover.\nAssembled in less than 20 minutes without tools with a friend.\nThe fabric has been selected for its durability and ease of cleaning.\nA naturally strong wooden frame is wrapped with a cuddly, supportive foam padding.\nConveniently supplied in a box - all parts for mounting your sofa are located in the closed compartment on the bottom of the base profile.",
  discount: 0,
  minDuration: 1,
  monthlyPrice: 100,
  name: "Zinus, Mid-Century Upholstered Sofa, Living Room Couch",
  numberRatings: 15,
  productImages: ["bike1_1.jpeg"],
  supplierId: "62b22f7dc565fc91d7cac190",
  _id: "62bc4f9150d02c83c876ee1f",
};

const tentative_order = {
  customerId: "62b46dce95b02b7c1b024ae9",
  amount: 800,
  orderItems: [{ product: product, quantity: 2, duration: 2 }],
};

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
  console.log("CART is: ", cart);
  const history = useHistory();
  const { user } = useAuthState() as any;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {cart.map((item: OrderItem, idx: number) => {
        const product: Product = item.product;
        return (
          <div style={{ width: "50%" }}>
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
                    src={`data:image/png;base64,` + product.productImages[0]}
                    style={{ maxHeight: 100 }}
                    alt="Could not load"
                  />
                  <div className="quantity">
                    <span>Quantiy:&nbsp;</span>
                    <Button
                      style={buttonStyle}
                      onClick={() => incrementItemQuantity(item)}
                    >
                      <AddIcon />
                    </Button>
                    {item.quantity}
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        decrementItemQuantity(item);
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  </div>
                  {/*  */}
                  <div className="duration">
                    <span>Duration:&nbsp;</span>
                    <Button
                      style={buttonStyle}
                      onClick={() => incrementItemDuration(item)}
                    >
                      <AddIcon />
                    </Button>
                    {item.duration}
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        decrementItemDuration(product);
                      }}
                    >
                      <RemoveIcon />
                    </Button>
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
          </div>
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
            .post("/payment/create-checkout-session", tentative_order)
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
    </div>
  );
}

//
