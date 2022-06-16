import { Checkbox, FormControlLabel } from "@mui/material";
import Categories from "./Categories";
import Duration from "./Duration";
import SliderFilter from "./SliderFilter";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
