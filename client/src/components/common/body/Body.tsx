import useViewport from "../../../hooks/useViewPort";
import "./body.css";
import ProductsOverview from "../../productsOverview/ProductsOverview";
import MobileComponent from "./MobileComponent";
import Sidebar from "./Sidebar";

const Body = () => {
  const { width } = useViewport();
  const breakpoint = 550;

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
};

export default Body;
