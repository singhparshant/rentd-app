import React from "react";
import useViewport from "../../../hooks/useViewPort";
import useAuthState from "../../../zustand/useAuthState";
import MobileComponent from "../../common/body/MobileComponent";
import Sidebar from "../../common/body/Sidebar";
import ProductsOverview from "../../productsOverview/ProductsOverview";

export default function ProductsScreen() {
  const { width } = useViewport();
  const breakpoint = 550;
  const user = useAuthState((state: any) => state.user);

  return (
    <div>
      {width > breakpoint ? (
        <div className="bodyContainer">
          <div className="sideBarContainer">
            <Sidebar />
          </div>
          <div className="productsContainer">
            <ProductsOverview />
          </div>
        </div>
      ) : (
        <MobileComponent />
      )}
    </div>
  );
}
