import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container, 
  TextField, 
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import Carousel1 from "react-material-ui-carousel";
// import Carousel2 from "react-multi-carousel";
import Typography from "@material-ui/core/Typography";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { getProductsPath } from "../../../api/requestPaths";
import useViewport from "../../../hooks/useViewPort";
import { Product } from "../../common/interfaces/Interfaces";
import useAuthState from '../../../zustand/useAuthState';





export default function AddProductScreen() {

  const [documents, setDocuments] = useState<any>({
    images: [],
  }); 

const icon = "https://static.thenounproject.com/png/3322766-200.png"
interface Ioption {
  label: string;
  value: number;
}
interface Ioption2 {
  label: string;
  value: string;
}

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
const categories: Ioption2[] = [
  { label: "Select category", value: "Select category" },
  { label: "Mobility", value: "Mobility" },
  { label: "Furniture", value: "Furniture" },
  { label: "Household", value:"Household" },
  { label: "Sports", value: "Sports" },
];

  const location = useLocation();
  var newProduct: Product = {
    name: "",
    monthlyPrice: 0,
    discount: 0,
    deposit: 0,
    minDuration: 0,
    description: "",
    avgRating: 0,
    numberRatings: 0,
    category: "",
    productImages: [""],
    supplierId: ""
  };
  const { user } = useAuthState() as any;

  const createNewProduct = () => {
    
    
    const newProduct : Product = {
      name: productData.name,
      supplierId: user.userId,
      monthlyPrice: productData.monthlyPrice,
      discount: Number(productData.discount),
      deposit: Number(productData.deposit),
      minDuration: productData.minDuration,
      description: productData.description,
      avgRating: 0,
      numberRatings: 0,
      category: productData.category,
      productImages: []
    }
    console.log("new Produtc is: ",  newProduct)
    axiosInstance.post("/products", newProduct)
  }
  
  const [productData, setProductData] = useState({ name:"", monthlyPrice: 0, discount: "", 
                                                 deposit: "", minDuration: 0, description: "",
                                                 avgRating: 0, numberRatings: 0, category: "Select category",
                                                 productImages: [],  supplierId: ""});
  

  const newProductCompleted: Boolean = false;
  
  const { width } = useViewport();
  const [suggestedProducts, setSuggestedProducts] = useState<any>({});
  
  return (
    <>
    {newProductCompleted ? 
    <div
      className="productdetailsScreen"
      style={{
        display: "block",
      }}
    >
      <div className="carouselContainer">
        <Carousel1 sx={{}}>
       
          {newProduct.productImages.map((image, idx) => {
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
              alt="Could not load image"
            />
          );
        })}
      </Carousel1>
    </div>
    <div className="detailsContainer">
      <Typography variant="h4">{newProduct.name}</Typography>
      <br />
      <Typography variant="h5" style={{ color: "green" }}>
        €{newProduct.monthlyPrice}/month &nbsp;&nbsp;{" "}
        {[...Array(Math.ceil(newProduct.avgRating ? newProduct.avgRating : 0))].map(
          (el, idx) => (
            <span>🌟</span>
          )
        )}
      </Typography>
      <hr />
      <Typography variant="body1">{newProduct.description}</Typography>
    </div>
    <div className="functionalitiesContainer">
      <div style={{ marginLeft: "20%" }}>
        <label style={{ fontSize: "20px" }}>Total Amount: &nbsp;</label>
        <strong style={{ color: "green", fontSize: 30 }}>
          €{newProduct.monthlyPrice * newProduct.minDuration}
        </strong>
        <br />
        <label style={{ fontSize: "8px" }}>
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
          value={newProduct.minDuration}
          label={"Rental Duration"}
          onChange={(e: any) => newProduct.minDuration = e.target.value}
          name="Rental Duration"
        >
          {options.map((option: Ioption, index : any) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        <Button variant="outlined" sx={{ marginTop: 1, width: "100%" }}>
          Add to Cart
        </Button>
      </FormControl>
    </div>

    
  </div>
  :
  
 <div
    className="productdetailsScreen"
    style={{
      display: "block",
      flexWrap: "wrap",
    }}
  >
    
    <Container component="main" style={{width:"100%"}} >
        <Box
          
        >
          
                <Box
            component="form"
            //onSubmit={handleSubmit}
           
            
          >
              <div style={{borderStyle:"solid", padding: "10px", width:"100%"}}>
              <Typography style={{fontSize:"20px"}}>
                Product details
                </Typography>
              <TextField
              label="Name"
              margin="normal"
              type="name"
              required
              fullWidth
              id="name"
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
              label= "Description"
              margin="normal"
              
              required
              //fullWidth
              id="description"
              placeholder="Write your description here"
              name="description"
              autoComplete="description"
              fullWidth
             // autoFocus
              value={productData.description}
              onChange={(e) =>
                  setProductData({ ...productData, description: e.target.value })
              }
            />
            <div style={{display:"flex"}}>
              <TextField
                margin="normal"
                label="Discount"
                //required
                style={{width:"50%", marginRight:"3%"}}
                name="discount"
                placeholder="Discount"
                type="number"
                id="discount"
                autoComplete="discount"
                value={productData.discount}
                onChange={(e) =>
                 setProductData({ ...productData, discount: e.target.value })
                }
              />
              <TextField
              label="Deposit"
              margin="normal"
              style={{width:"50%"}}
              //required
              type="number"
              name="deposit"
              placeholder="Deposit"
              id="deposit"
              autoComplete="deposit"
              value={productData.deposit}
              onChange={(e) =>
                setProductData({ ...productData, deposit: e.target.value })
              }
            />
            </div>
            
            <div style={{display:"flex", marginTop:"5%"}}>
              <div style={{display:"block" , marginRight:"5%"}}>
              <InputLabel>Minimal Rental Duration</InputLabel>
              <Select
                value={productData.minDuration}
                label={"Minimal Rental Duration"}
                onChange={(e: any) => {
                  setProductData({ ...productData, minDuration: e.target.value })
                  
                }
              }
                name="Rental Duration"
              >
                {options.map((option: Ioption, index : any) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
              </div>
              <div>
              <InputLabel>Category</InputLabel>
              <Select
                value={productData.category}
                label={"Category"}
                onChange={(e: any) => {
                  setProductData({ ...productData, category: e.target.value })
                  
                }
              }
                name="Category"
              >
                {categories.map((option: Ioption2, index : any) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
              </div>
              

            </div>
             
            
            </div>
              </Box>
        
          </Box>
          

      </Container>
    
      <div className="carouselContainer" >
      <div >
       
        {(newProduct.productImages.length == 0) ? 
       
        newProduct.productImages.map((image, idx) => {
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
              alt="Could not load image"
            />
          );
        }) 
        
        :
          
<Container component="main" style={{width:"100%"}} >
        <Box>
          
              
          <div style={{borderStyle:"solid", padding: "10px", width:"100%"}}>
            <Typography style={{fontSize:"20px"}}>
              Product images
            </Typography>
            <Button style={{marginLeft:"40%"}}>
              
            <img
                  src={icon}
                  style={{
                    maxHeight: 350,
                    maxWidth: 350,
                    width: "100px",
                    height: "100px",
                    borderRadius: "7px",
                    
                    
                  }}
                  alt="Could not load image"
                />
            </Button>
           
          </div>
        </Box>
        <div
        className="button"
        style={{ marginLeft: "42%", marginTop:"5%",  width: "fit-content", textAlign: "center" }}
        onClick={createNewProduct}
      >
       <Typography style={{fontSize:"20px"}}>
              Create product
            </Typography>
      </div>
      </Container> 
        
      }
      </div>
    </div>
    
  </div>
  }
  </>
    

  )
}

