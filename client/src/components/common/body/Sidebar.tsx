import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Categories from "./Categories";
import Duration from "./Duration";
import SliderFilter from "./SliderFilter";

import { useState } from "react";
import useFilters from "../../../zustand/useFilters";
import "./sidebar.css";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const resetFilters = useFilters((state: any) => state.resetFilters);

  const handleChange = (event: any) => {
    setFilters(event.target.name, !filters.reviewed);
  };

  return (
    <div className="sidebar">
      <div className="title">
        <h3>Filters</h3>
      </div>
      <Categories />
      <SliderFilter />
      <FormControlLabel
        sx={{ display: "flex", justifyContent: "center" }}
        control={
          <Checkbox
            name="reviewed"
            checked={filters.reviewed}
            value={filters.reviewed}
            onChange={handleChange}
          />
        }
        label="Reviewed"
      />
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
