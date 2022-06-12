import { Button } from "@mui/material";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Footer from "./components/common/footer/Footer";
import NavBar from "./components/common/navBar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from "./components/customerApp/homeScreen/HomeScreen";
import NotFound from "./components/common/notFound/NotFound";
import SignUp from "./components/common/signUp/SignUp";
import Login from "./components/common/login/Login";
import ProductDetailsScreen from "./components/common/productDetails/ProductDetailsScreen";
import CartScreen from "./components/customerApp/cartScreen/CartScreen";
import CheckoutScreen from "./components/customerApp/checkoutScreen/CheckoutScreen";
import OrdersScreen from "./components/customerApp/ordersScreen/OrdersScreen";
import OrderDetailsScreen from "./components/customerApp/orderDetailsScreen/OrderDetailsScreen";

const ErrorHandler = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/register">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/product/:id">
              <ProductDetailsScreen />
            </Route>
            <Route exact path="/cart">
              <CartScreen />
            </Route>
            <Route exact path="/checkout">
              <CheckoutScreen />
            </Route>
            <Route exact path="/orders">
              <OrdersScreen />
            </Route>
            <Route exact path="/orders/:id">
              <OrderDetailsScreen />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
