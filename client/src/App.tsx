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
import { failure, success } from "./api/requestPaths";

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
      return customerAppRoutes.map(
        (route, idx) =>
          route.path !== success &&
          route.path !== failure && (
            <Route key={idx} exact path={route.path}>
              {route.component}{" "}
            </Route>
          )
      );
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

  return (
    <div className="app">
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Router>
          <Toaster />
          <NavBar />
          <Switch>{routes()}</Switch>
          {/* <Footer /> */}
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
