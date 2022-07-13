import Categories from "./Categories";
import Duration from "./Duration";
import SliderFilter from "./SliderFilter";
import { Discount } from "./Discount";
import useFilters from "../../../zustand/useFilters";
import AvgRating from "./AvgRating";
import ProductsPerPage from "./ProductsPerPage";
import "./sidebar.css";
import { Sort } from "./Sort";

const Sidebar = () => {
  const resetFilters = useFilters((state: any) => state.resetFilters);

  return (
    <div className="sidebar">
      <div className="title">
        <h3>Filters</h3>
      </div>
      <Categories />
      <SliderFilter />
      <AvgRating />
      <Duration />
      <ProductsPerPage />
      <Sort />
      <Discount />
      <br />
      <div className="resetButton">
        <div
          className="button"
          onClick={resetFilters}
          style={{ margin: "10px" }}
        >
          Reset Filters
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
