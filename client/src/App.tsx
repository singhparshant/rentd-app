import { Button } from "@mui/material";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Body from "./Components/body/Body";
import Footer from "./Components/footer/Footer";
import NavBar from "./Components/navBar/NavBar";

// const Bomb = () => {
//   throw new Error("Error Message");
// };

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
        {/* <Bomb /> */}
        <NavBar />
        <Body />
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
