import { Button } from "@mui/material";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/common/navBar/NavBar";
import { adminAppRoutes } from "./routes/adminAppRoutes";
import { customerAppRoutes } from "./routes/customerAppRoutes";
import { supplierAppRoutes } from "./routes/supplierAppRoutes";
import useAuthState from "./zustand/useAuthState";

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
          {route.component}
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
