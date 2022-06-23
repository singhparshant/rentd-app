import React, { useEffect } from "react";
import Cards from "../../cards/Cards";
import Sidebar from "./Sidebar";
import "./body.css";
import MobileComponent from "./MobileComponent";
import useViewport from "../../../hooks/useViewPort";

interface BodyProps {}

const Body = (props: BodyProps) => {
  const { width } = useViewport();
  const breakpoint = 650;

  return (
    <div>
      {width > breakpoint ? (
        <div className="bodyContainer">
          <div className="sideBarContainer">
            <Sidebar />
          </div>
          <div className="productsContainer">
            <Cards />
          </div>
        </div>
      ) : (
        <MobileComponent />
      )}
    </div>
  );
};

export default Body;
