import React, { useRef } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as Tick } from "../../../assets/icons/tick.svg";

import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../../api/axios";
import { Product } from "../../common/interfaces/Interfaces";
import imageIcon from "../../../assets/imageIcon.png";
import { readFileContent, verifyProductData } from "../../../utils/functions";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";

export default function AddProductScreen() {
  const history = useHistory();
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState([]);
  const user = useAuthState((state: any) => state.user);
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
    supplierId: user.id,
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

  const handleChange = (e: any) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductImagesUpload = async (files: FileList | null) => {
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const imageContent = await readFileContent(files.item(i));
      setNewProduct((prev) => ({
        ...prev,
        productImages: [...prev.productImages, imageContent],
      }));
    }
  };

  const createNewProduct = async () => {
    if (!verifyProductData(newProduct)) {
      toast.error("invalid data!");
      return;
    }
    try {
      await axiosInstance.post("/products", newProduct);
      toast.success("product added!");
      history.push("/products");
    } catch (error) {
      toast.error("please try again!");
    }
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
                value={newProduct.name}
                onChange={handleChange}
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
                  label="Discount %"
                  //required
                  style={{ width: "50%", marginRight: "3%" }}
                  name="discount"
                  placeholder="Discount %"
                  type="number"
                  autoComplete="discount"
                  value={newProduct.discount || ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Deposit in €"
                  margin="normal"
                  style={{ width: "50%" }}
                  //required
                  type="number"
                  name="deposit"
                  placeholder="Deposit in €"
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
                    name="minDuration"
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
                    name="category"
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
          <div
            style={{ marginLeft: "40%", cursor: "pointer", width: "100px" }}
            onClick={() => uploadImageRef.current?.click()}
          >
            <img
              src={imageIcon}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "7px",
              }}
              alt="Could not load."
            />
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              accept="image/*"
              ref={uploadImageRef}
              onChange={(e) => handleProductImagesUpload(e.target.files)}
            />
            {newProduct.productImages.length > 0 && (
              <>
                <span style={{ color: "green" }}>Uploaded!</span>
                <Tick style={{ color: "green" }} />
              </>
            )}
          </div>
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
