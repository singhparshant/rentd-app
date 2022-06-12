import { Button } from "@mui/material";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Body from "./components/common/body/Body";
import Footer from "./components/common/footer/Footer";
import NavBar from "./components/common/navBar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomeScreen from "./components/customerApp/HomeScreen";
import NotFound from "./components/common/notFound/NotFound";

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



            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
