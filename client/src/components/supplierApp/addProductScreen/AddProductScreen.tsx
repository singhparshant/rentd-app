import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
// import Carousel2 from "react-multi-carousel";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../../api/axios";
import { Product } from "../../common/interfaces/Interfaces";
import useAuthState from "../../../zustand/useAuthState";

export default function AddProductScreen() {
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    monthlyPrice: 0,
    discount: 0,
    deposit: 0,
    minDuration: 0,
    description: "",
    avgRating: 0,
    numberRatings: 0,
    category: "",
    productImages: [],
    supplierId: "",
  });

  //fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.map((cat: any) => cat.name));
    };
    fetchCategories();
  }, []);

  const getMinRentalDurationOption = () => {
    let options = [{ label: "Select duration", value: 0 }];
    for (let i = 1; i <= 12; i++)
      options.push({ label: `${i} months`, value: i });

    return options;
  };

  console.log("new Product", newProduct);

  const handleChange = (e: any) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const icon = "https://static.thenounproject.com/png/3322766-200.png";

  const { user } = useAuthState() as any;

  const createNewProduct = () => {
    //   const newProduct: Product = {
    //     name: productData.name,
    //     supplierId: user.userId,
    //     monthlyPrice: productData.monthlyPrice,
    //     discount: Number(productData.discount),
    //     deposit: Number(productData.deposit),
    //     minDuration: productData.minDuration,
    //     maxDuration: 10,
    //     description: productData.description,
    //     avgRating: 0,
    //     numberRatings: 0,
    //     category: productData.category,
    //     productImages: [],
    //   };
    //   axiosInstance.post("/products", newProduct);
  };

  return (
    <div
      className="productdetailsScreen"
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Add a product</h1>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ boxShadow: 5, padding: 5, marginTop: 3 }}
      >
        <Box>
          <Box
            component="form"
            //onSubmit={handleSubmit}
          >
            <div>
              <Typography style={{ fontSize: "20px" }}>
                Product details
              </Typography>
              <TextField
                label="Name"
                margin="normal"
                type="name"
                required
                fullWidth
                placeholder="Name"
                name="name"
                autoComplete="Full name"
                autoFocus
                //value={userData.name}
                //onChange={(e) =>
                // setUserData({ ...userData, name: e.target.value })
                //}
              />
              <TextField
                label="Description"
                margin="normal"
                required
                //fullWidth

                placeholder="Write your description here"
                name="description"
                autoComplete="description"
                fullWidth
                // autoFocus
                value={newProduct.description}
                onChange={handleChange}
              />
              <TextField
                label="Monthly price in €"
                margin="normal"
                required
                type={"number"}
                placeholder="Monthly price in €"
                name="monthlyPrice"
                autoComplete="description"
                fullWidth
                // autoFocus
                value={newProduct.monthlyPrice || ""}
                onChange={handleChange}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  margin="normal"
                  label="Discount"
                  //required
                  style={{ width: "50%", marginRight: "3%" }}
                  name="discount"
                  placeholder="Discount"
                  type="number"
                  autoComplete="discount"
                  value={newProduct.discount || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Deposit"
                  margin="normal"
                  style={{ width: "50%" }}
                  //required
                  type="number"
                  name="deposit"
                  placeholder="Deposit"
                  autoComplete="deposit"
                  value={newProduct.deposit || ""}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "5%",
                  width: "100%",
                }}
              >
                <div style={{ width: "50%" }}>
                  <InputLabel>Minimal Rental Duration</InputLabel>
                  <Select
                    fullWidth
                    value={newProduct.minDuration}
                    label={"Minimal Rental Duration"}
                    onChange={handleChange}
                    name="Rental Duration"
                  >
                    {getMinRentalDurationOption().map((option, index: any) => {
                      return (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                <div style={{ width: "50%", marginLeft: "3%" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    fullWidth
                    value={newProduct.category || "Select category"}
                    label={"Category"}
                    onChange={handleChange}
                    name="Category"
                  >
                    {["Select category", ...categories].map(
                      (category, index: any) => {
                        return (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </Box>
        </Box>

        <Box>
          <Typography style={{ fontSize: "20px", marginTop: 20 }}>
            Product images
          </Typography>
          <Button style={{ marginLeft: "40%" }}>
            <img
              src={icon}
              style={{
                maxHeight: 350,
                maxWidth: 350,
                width: "100px",
                height: "100px",
                borderRadius: "7px",
              }}
              alt="Could not load."
            />
          </Button>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <div
            className="button"
            style={{
              width: "fit-content",
              textAlign: "center",
            }}
            onClick={createNewProduct}
          >
            <Typography style={{ fontSize: "20px" }}>Create product</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
