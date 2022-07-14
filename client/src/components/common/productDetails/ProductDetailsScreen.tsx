import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import Carousel1 from "react-material-ui-carousel";
// import Carousel2 from "react-multi-carousel";
import Typography from "@material-ui/core/Typography";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { getProductsPath } from "../../../api/requestPaths";
import useViewport from "../../../hooks/useViewPort";
import { Product, OrderItem } from "../interfaces/Interfaces";
import "./productdetailsScreen.css";
import toast from "react-hot-toast";
import useCart from "../../../zustand/useCart";
import useAuthState from "../../../zustand/useAuthState";


interface LocationInterface {
  state: {
    fromProductsPage: Product;
  };
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    // slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    // slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

export default function ProductDetailsScreen() {
  const { id } = useParams<any>();
  const location = useLocation();
  const [qty, setQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { width } = useViewport();
  const [rentalDuration, setRentalDuration] = useState<number>(0);
  const [suggestedProducts, setSuggestedProducts] = useState<any>({});
  const [userRating, setUserRating] = useState(0);
  const { state } = location as LocationInterface;
  const product: Product = state.fromProductsPage;
  const breakpoint = 650;

  interface Ioption {
    label: string;
    value: number;
  }

  //TODO: make dynamic (loaded from db)
  const options: Ioption[] = [
    { label: "Select duration", value: 0 },
    { label: "1 month", value: 1 },
    { label: "2 months", value: 2 },
    { label: "3 months", value: 3 },
    { label: "4 months", value: 4 },
    { label: "5 months", value: 5 },
    { label: "6 months", value: 6 },
    { label: "7 months", value: 7 },
    { label: "8 months", value: 8 },
    { label: "9 months", value: 9 },
  ];
  useEffect(() => {
    const getProductsByCategory = async () => {
      const response = await axiosInstance.get(getProductsPath, {
        params: {
          categories: [`${product.category}`],
        },
      });
      setSuggestedProducts(response);
    };
    getProductsByCategory();
  }, []);

  const handleRating = (newValue: number) => {
    setUserRating(newValue || 0);
    axiosInstance
      .post("/products/updateRating", {
        productId: id,
        rating: newValue,
      })
      .then(() => {
        toast.success("rating updated!");
      })
      .catch(() => {
        toast.error("please try again!");
      });
  };
  const {
    cart,
    addItemToCart
  } = useCart() as any;

  const { user } = useAuthState() as any;

  const handleAddToCart = (rentalDuration : number) => {
    toast.success("added to cart!");
    const orderItem : OrderItem = {
      id: 10,
      product: product,
      quantity: 1,
      rentalDuration: rentalDuration,
    }
    addItemToCart(orderItem)
    if(user){
      toast.success("persisted cart!");
      axiosInstance.put("/shoppingCarts", orderItem)
    }
  };

  return (
    <div
      className="productdetailsScreen"
      style={{
        display: width > breakpoint ? "flex" : "block",
        flexWrap: "wrap",
      }}
    >
      <div className="carouselContainer">
        <Carousel1>
          {product.productImages.map((image, idx) => {
            return (
              <img
                src={`data:image/png;base64,` + image}
                style={{
                  margin: "25px",
                  maxHeight: 350,
                  maxWidth: 350,
                  width: "auto",
                  height: "auto",
                  borderRadius: "7px",
                }}
                key={idx}
                alt="Could not load."
              />
            );
          })}
        </Carousel1>
        <div className="ratingContainer">
          <div style={{ marginRight: 5 }}>Rate:</div>
          <Rating
            name="half-rating"
            precision={0.5}
            value={userRating}
            onChange={(e, newValue) => handleRating(newValue || 0)}
          />
        </div>
      </div>
      <div className="detailsContainer">
        <Typography variant="h4">{product.name}</Typography>
        <br />
        <Typography variant="h5" style={{ color: "green" }}>
          €{product.monthlyPrice}/month &nbsp;&nbsp;
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="half-rating"
            value={product.avgRating}
            precision={0.5}
            readOnly
          />
          <span style={{ marginLeft: 5 }}>({product.numberRatings})</span>
        </div>

        <Typography style={{ marginTop: 20 }} variant="body1">
          {product.description}
        </Typography>
      </div>
      <div className="functionalitiesContainer">
        <div style={{ marginLeft: "20%" }}>
          <label style={{ fontSize: "20px" }}>Total Amount: &nbsp;</label>
          <strong style={{ color: "green", fontSize: 30 }}>
            €
            {product.monthlyPrice *
              rentalDuration *
              (1 - 0.01 * product.discount)}
          </strong>
          <br />
          <label style={{ fontSize: "10px" }}>
            *Amount will be deducted on monthly basis
          </label>
          <br />
          <br />
        </div>
        <br />
        <FormControl
          variant="outlined"
          sx={{
            width: "50%",
            margin: "10px",
            left: "18%",
          }}
        >
          <InputLabel>Rental Duration</InputLabel>
          <Select
            value={rentalDuration}
            label={"Rental Duration"}
            onChange={(e: any) => setRentalDuration(e.target.value)}
            name="Rental Duration"
          >
            {options.map((option: Ioption, index) => {
              return (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          <div className="button" onClick={() => {handleAddToCart(rentalDuration)}}>
            Add to Cart
          </div>
        </FormControl>
      </div>
    </div>
  );
}
