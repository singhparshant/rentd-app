import React, {useState} from 'react'
import { CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}



export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const [userData, setUserData] = useState({ name:"", email: "", address: "" });
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        console.log("In handle submit")
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card", 
            card: elements.getElement(CardElement)
        })
    
        console.log("error is: ", error)
        if (!error) {
            try {
                console.log("payment method created")
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:8080/payment", {
                    amount: 100, 
                    id
                })
            
                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("Error", error)
            }
        }
    }
    return (
            <>
            {!success ?
            <form onSubmit = {handleSubmit}>
                
                <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
            minWidth:"50%"
          }}
        >
            
                <Typography component="h1" variant="h5">
                Proceed to payment
                </Typography>
                <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            
          >
              <div style={{borderStyle:"solid", padding: "10px", width:"120%", marginLeft:"-15%", marginTop:"5%"}}>
              <Typography fontSize={20}>
                Personal details
                </Typography>
              <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="name"
              placeholder="Full name"
              name="name"
              autoComplete="Full name"
              autoFocus
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              placeholder="Delivery Address"
              type="address"
              id="address"
              autoComplete="address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              
            </div>
            </div>
              </Box>
        
          </Box>
          <div style={{borderStyle:"solid", padding: "10px", width:"120%", marginLeft:"-15%", marginTop:"5%", paddingBottom:"20px"}}>
          <Typography fontSize={20} style={{marginBottom:"-3%"}}>
                Billing details
                </Typography>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options = {CARD_OPTIONS} />
                    </div>

                </fieldset>

                <button>Pay</button>
            </div>
               
               
            

               
            
            
        
      
      </Container>
                   
                

                
            </form>
            :
            <div>
                <h2>
                    You just bought this!!
                </h2>
            </div>
            }
        </>
    )
}