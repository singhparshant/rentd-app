import { Button } from "@mui/material";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Footer from "./components/common/footer/Footer";
import NavBar from "./components/common/navBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { customerAppRoutes } from "./routes/customerAppRoutes";
import useAuthState from "./zustand/useAuthState";
import { supplierAppRoutes } from "./routes/supplierAppRoutes";
import { adminAppRoutes } from "./routes/adminAppRoutes";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/supplierApp/Sidebar/Sidebar";
import MainBoard from "./components/supplierApp/MainBoard/MainBoard";
import RightSide from "./components/supplierApp/RightSide/RightSide";

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
  const { user } = useAuthState() as any;

  const routes = () => {
    if (!user || user.role === "customer") {
      return customerAppRoutes.map((route, idx) => (
        <Route key={idx} exact path={route.path}>
          {route.component}{" "}
        </Route>
      ));
    }
    if (user.role === "supplier") {
      return supplierAppRoutes.map((route, idx) => (
        <Route key={idx} exact path={route.path}>
          {route.component}{" "}
        </Route>
      ));
    }
    if (user.role === "admin") {
      return adminAppRoutes.map((route, idx) => (
        <Route key={idx} exact path={route.path}>
          {route.component}
        </Route>
      ));
    }
  };

  const apps = () => {
    if (user !== null && user.role === "supplier"){
      return (
        <div className="supplier-app">
          <div className="app-container">
              <Router>
                <Toaster />
                <Sidebar />
                <Switch>{routes()}</Switch>
              </Router>
              {/* <MainBoard /> */}
              {/* <RightSide /> */}
          </div>
        </div>
      )
    } else {
      return (
        <div className="other-apps">
          <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Router>
              <Toaster />
              <NavBar />
              <Switch>{routes()}</Switch>
              {/* <Footer /> */}
            </Router>
          </ErrorBoundary>
        </div>
      )
    }
  }

  return (
    <div className="app">
      {apps()}
    </div>
  )
};

export default App;
