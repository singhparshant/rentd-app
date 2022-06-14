import React from "react";
import Cards from "../../cards/Cards";
import Sidebar from "../body/Sidebar";
import "./productsSearchScreen.css";

type Props = {};

const ProductsSearchScreen = (props: Props) => {
  return (
    <div className="container">
      <div
        className="sideBar"
        style={{ width: "20%", backgroundColor: "whitesmoke" }}
      >
        <Sidebar />
      </div>
      <div className="products" style={{ width: "80%" }}>
        <Cards />
      </div>
    </div>
  );
};

export default ProductsSearchScreen;
