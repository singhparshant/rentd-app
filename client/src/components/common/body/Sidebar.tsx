import { Checkbox, FormControlLabel } from "@mui/material";
import Categories from "./Categories";
import Duration from "./Duration";
import SliderFilter from "./SliderFilter";

import "./sidebar.css";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="title">
        <h3>Filters</h3>
      </div>
      <Categories />
      <SliderFilter />
      <FormControlLabel
        sx={{ display: "flex", justifyContent: "center" }}
        control={<Checkbox />}
        label="Reviewed"
      />
      <Duration />
    </div>
  );
};

export default Sidebar;
