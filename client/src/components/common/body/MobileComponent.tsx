import Drawer from "@material-ui/core/Drawer";
import { Typography } from "@mui/material";
import { useState } from "react";
import ProductsOverView from "../../cards/ProductsOverView";
import Sidebar from "./Sidebar";

type Props = {};

const MobileComponent = (props: Props) => {
  const [drawerStatus, setDrawerStatus] = useState(true);
  const toggleDrawer = () => {
    // setDrawerStatus(!drawerStatus);
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
      <ProductsOverView />
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
