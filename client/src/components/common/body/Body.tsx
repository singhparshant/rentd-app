import useViewport from "../../../hooks/useViewPort";
import ProductsOverView from "../../cards/ProductsOverView";
import "./body.css";
import MobileComponent from "./MobileComponent";
import Sidebar from "./Sidebar";

interface BodyProps {}

const Body = (props: BodyProps) => {
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
            <ProductsOverView />
          </div>
        </div>
      ) : (
        <MobileComponent />
      )}
    </div>
  );
};

export default Body;
