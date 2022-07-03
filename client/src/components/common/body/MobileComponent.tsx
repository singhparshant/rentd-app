import Drawer from "@material-ui/core/Drawer";
import { Button } from "@mui/material";
import { useState } from "react";
import ProductsOverView from "../../cards/ProductsOverView";
import Sidebar from "./Sidebar";

type Props = {};

const MobileComponent = (props: Props) => {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };
  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer}>
        Filters
      </Button>
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
