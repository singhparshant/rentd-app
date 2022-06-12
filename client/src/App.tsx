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
import { customerAppRoutes } from "./routes/customerAppRoutes";
import useAuthState from "./zustand/useAuthState";
import { supplierAppRoutes } from "./routes/supplierAppRoutes";


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

  if (!user || user.role === "customer") {
    return (
      <div className="app">
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Router>
            <NavBar />
            <Switch>
              {customerAppRoutes.map((route, idx) =>
                <Route key={idx} exact path={route.path}>{route.component} </Route>)}
            </Switch>
            <Footer />
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
  else if (user.role === "supplier") {
    return (
      <div className="app">
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Router>
            <NavBar />
            <Switch>
              {supplierAppRoutes.map((route, idx) =>
                <Route key={idx} exact path={route.path}>{route.component} </Route>)}
            </Switch>
            <Footer />
          </Router>
        </ErrorBoundary>
      </div>
    )
  } else if (user.role === "admin") {
    return <>Admin</>
  }
  return <>Error</>
};

export default App;
