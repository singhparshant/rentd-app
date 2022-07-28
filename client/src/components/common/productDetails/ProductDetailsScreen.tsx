import Typography from "@material-ui/core/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Carousel1 from "react-material-ui-carousel";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axiosInstance from "../../../api/axios";
import { getProductsPath } from "../../../api/requestPaths";
import useViewport from "../../../hooks/useViewPort";
import useCart from "../../../zustand/useCart";
import ProductCard from "../../productsOverview/ProductCard";
import { OrderItem, Product } from "../interfaces/Interfaces";
import "./productdetailsScreen.css";

interface LocationInterface {
  state: {
    fromProductsPage: Product;
  };
}

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     // slidesToSlide: 3, // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     // slidesToSlide: 2, // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     // slidesToSlide: 1, // optional, default to 1.
//   },
// };

export default function ProductDetailsScreen() {
  const { id } = useParams<any>();
  const location = useLocation();
  const { width } = useViewport();
  const [rentalDuration, setRentalDuration] = useState<number>(0);
  const [suggestedProducts, setSuggestedProducts] = useState<any>([]);
  const [userRating, setUserRating] = useState(0);
  const { state } = location as LocationInterface;
  const product: Product = state.fromProductsPage;
  const breakpoint = 650;

  interface Ioption {
    label: string;
    value: number;
  }

  const getOptions = () => {
    let options: Ioption[] = [{ label: "Select duration", value: 0 }];
    for (let i = product.minDuration || 1; i <= 12; i++)
      options.push({ label: `${i} months`, value: i });

    return options;
  };

  //TODO: suggested products (additional feature)
  useEffect(() => {
    const getProductsByCategory = async () => {
      const response = await axiosInstance.get(getProductsPath, {
        params: {
          categories: [`${product.category}`],
        },
      });
      let products: any[] = response.data.data;
      products = products.filter((prod) => prod._id !== id);
      setSuggestedProducts(products);
    };
    window.scroll(0, 0);
    getProductsByCategory();
  }, [id, product.category]);

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
  const { addItemToCart } = useCart() as any;

  const handleAddToCart = (rentalDuration: number) => {
    if (rentalDuration > 0) {
      const orderItem: OrderItem = {
        _id: uuid(),
        product: product,
        quantity: 1,
        duration: rentalDuration,
      };
      addItemToCart(orderItem);
      toast.success("Added to cart!");
    } else {
      toast.error("Please select a duration!");
    }
  };

  return (
    <>
      <div
        className="productdetailsScreen"
        style={{
          display: width > breakpoint ? "flex" : "block",
          flexWrap: "wrap",
        }}
      >
        <div className="carouselContainer">
          <Carousel1>
            {product.productImages.map((image) => {
              return (
                <img
                  src={`data:image/png;base64,` + image}
                  style={{
                    margin: "25px",
                    maxHeight: 350,
                    maxWidth: 350,

                    borderRadius: 15,
                  }}
                  key={product._id}
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
            €{product.monthlyPrice}/month &nbsp; <br />
          </Typography>
          <p>
            One-time deposit: <strong>€{product.deposit}</strong>&nbsp;
          </p>
          {product.numberRatings > 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="half-rating"
                value={product.avgRating}
                precision={0.5}
                readOnly
              />
              <span style={{ marginLeft: 5 }}>({product.numberRatings})</span>
            </div>
          )}
          <Typography style={{ marginTop: 20 }} variant="body1">
            {product.description}
          </Typography>
        </div>
        <div className="functionalitiesContainer">
          <div>
            <label style={{ fontSize: "20px" }}>Total Amount: &nbsp;</label>
            <strong style={{ color: "green", fontSize: 30 }}>
              €
              {(
                product.monthlyPrice *
                  rentalDuration *
                  (1 - 0.01 * product.discount) +
                product.deposit
              ).toFixed(2)}
            </strong>
            <br />
            <label style={{ fontSize: "10px" }}>
              *Amount will be deducted on monthly basis
            </label>
            <br />
            <br />
          </div>
          <br />
          <FormControl variant="outlined" sx={{ width: "70%" }}>
            <InputLabel>Rental Duration</InputLabel>
            <Select
              value={rentalDuration}
              label={"Rental Duration"}
              onChange={(e: any) => setRentalDuration(e.target.value)}
              name="Rental Duration"
            >
              {getOptions().map((option: Ioption, index) => {
                return (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <div
            className="button"
            onClick={() => {
              handleAddToCart(rentalDuration);
            }}
          >
            Add to Cart
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div style={{ marginTop: 150 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3> More products of this category:</h3>
          </div>
          <div
            className="suggestionsCards"
            style={{
              display: width > breakpoint ? "flex" : "block",
              margin: 60,
            }}
          >
            {suggestedProducts?.map((product: Product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
