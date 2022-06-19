import React from "react";
import Cards from "../../cards/Cards";
import Sidebar from "./Sidebar";
import "./body.css";

interface BodyProps {}

const Body = (props: BodyProps) => {
  return (
    <div>
      <div className="bodyContainer">
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="productsContainer">
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Body;
