import React from "react";
import logo from "../../../assets/logo.png";

type Props = {};

const Body = (props: Props) => {
  return (
    <div>
      <h1>Welcome to Rentd</h1>
      <img src={logo} alt="" width="100" height="100" />
    </div>
  );
};

export default Body;
