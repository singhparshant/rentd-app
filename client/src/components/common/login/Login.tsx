import * as React from "react";
import { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import useAuthState from "../../../zustand/useAuthState";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import useCart from "../../../zustand/useCart";
const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const setUser = useAuthState((state: any) => state.setUser);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const fromRef = useRef<any>(null);
  const emptyCart = useCart((state: any) => state.emptyCart);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/users/login", userData);
      const user = await response.data;

      setUser(user);
      emptyCart();
      history.push("/");
    } catch (error) {
      toast.error("please try again!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ boxShadow: 5, paddingBottom: 5, marginTop: 10 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#2b0245" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }} ref={fromRef}>
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
              onChange={(e: any) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userData.password}
              onChange={(e: any) =>
                setUserData({ ...userData, password: e.target.value })
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
              <div className="button" onClick={handleLogin}>
                Login
              </div>

              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
