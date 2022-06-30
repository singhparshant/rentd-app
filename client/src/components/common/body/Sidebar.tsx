import { Button } from "@mui/material";
import Categories from "./Categories";
import Duration from "./Duration";
import SliderFilter from "./SliderFilter";

import { useEffect } from "react";
import useFilters from "../../../zustand/useFilters";
import AvgRating from "./AvgRating";
import "./sidebar.css";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const resetFilters = useFilters((state: any) => state.resetFilters);

  useEffect(() => {
    console.log("Filters: ", filters);
  }, [filters]);

  return (
    <div className="sidebar">
      <div className="title">
        <h3>Filters</h3>
      </div>
      <Categories />
      <SliderFilter />
      <AvgRating />
      <Duration />
      <br />
      <div className="resetButton">
        <Button
          sx={{ margin: "20px" }}
          variant="contained"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
