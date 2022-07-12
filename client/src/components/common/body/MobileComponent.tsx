import Drawer from "@material-ui/core/Drawer";
import { Typography } from "@mui/material";
import { useState } from "react";
import ProductsOverview from "../../productsOverview/ProductsOverview";
import Sidebar from "./Sidebar";

const MobileComponent = () => {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };
  return (
    <div>
      <div
        className="button"
        onClick={toggleDrawer}
        style={{ width: "min-content", position: "relative", left: "40%" }}
      >
        <Typography> Filters</Typography>
      </div>
      <ProductsOverview />
      <Drawer
        anchor={"left"}
        onClose={toggleDrawer}
        variant="temporary"
        open={drawerStatus}
      >
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileComponent;
