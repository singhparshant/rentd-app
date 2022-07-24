import {
  Box,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { Product } from "../../common/interfaces/Interfaces";
import imageIcon from "../../../assets/imageIcon.png";
import { readFileContent, verifyProductData } from "../../../utils/functions";

interface LocationInterface {
  state: {
    fromProductsPage: Product;
  };
}

export default function UpdateProductScreen() {
  const location = useLocation();
  const { state } = location as LocationInterface;
  const [product, setProduct] = useState<Product>(state.fromProductsPage);
  const [categories, setCategories] = useState([]);
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const [updateImages, setUpdateImages] = useState(false);
  const history = useHistory();

  console.log("product", product);
  console.log("update images", updateImages);
  const getMinRentalDurationOption = () => {
    let options = [{ label: "Select duration", value: 0 }];
    for (let i = 1; i <= 12; i++)
      options.push({ label: `${i} months`, value: i });

    return options;
  };

  //fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.map((cat: any) => cat.name));
    };
    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductImagesUpload = async (files: FileList | null) => {
    //overwrite previous images
    setProduct((prev) => ({ ...prev, productImages: [] }));
    setUpdateImages(true);
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const imageContent = await readFileContent(files.item(i));
      setProduct((prev) => ({
        ...prev,
        productImages: [...prev.productImages, imageContent],
      }));
    }
  };

  const handleUpdateProduct = async () => {
    if (!verifyProductData(product)) {
      toast.error("invalid data!");
      return;
    }
    const toastId = toast.loading("loading");
    try {
      await axiosInstance.put(
        `/products/${product._id}?updateImages=${updateImages}`,
        product
      );
      toast.dismiss(toastId);
      toast.success("updated!");
      history.push("/products");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("something went wrong");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(`/products/${product._id}`);
      toast.success("deleted!");
      history.push("/products");
    } catch (error) {
      toast.error("something went wrong");
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
      <h1>Update Product</h1>

      <Container
        component="main"
        maxWidth="sm"
        sx={{ boxShadow: 5, padding: 5, marginTop: 3 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 40,
          }}
        >
          <img
            src={
              product.productImages[0]?.startsWith("data:")
                ? `${product.productImages[0]}`
                : `data:image/png;base64,${product.productImages[0]}`
            }
            alt="could not load."
            style={{ borderRadius: 20, width: 200 }}
          />
        </div>
        <Box>
          <Box component="form">
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
                value={product.name}
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
                value={product.description}
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
                value={product.monthlyPrice}
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
                  value={product.discount || ""}
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
                  value={product.deposit || ""}
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
                    value={product.minDuration}
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
                    value={product.category}
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
            Replace product images
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
          </div>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <div
            className="button"
            style={{
              textAlign: "center",
            }}
            onClick={handleUpdateProduct}
          >
            <div style={{ fontSize: 15 }}>Update</div>
          </div>

          <div
            className="button"
            style={{
              textAlign: "center",
            }}
            onClick={handleDeleteProduct}
          >
            <div style={{ fontSize: 15 }}>Delete</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
