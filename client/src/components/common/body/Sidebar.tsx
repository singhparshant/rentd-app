import React from "react";
import { Slider } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const handleChange = () => {
    console.info("Changed");
  };

  const brand: string = "Adidas";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        <Chip label="Adidas" onClick={handleClick} onDelete={handleDelete} />
        <Chip
          label="Outdoors"
          variant="outlined"
          onClick={handleClick}
          onDelete={handleDelete}
        />
        <Chip
          label="With laces"
          variant="outlined"
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </div>
      <div style={{ flex: 2 }}>
        <InputLabel id="demo-simple-select-label">Brands</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="Adidas"
          label="Adidas"
          onChange={handleChange}
        >
          <MenuItem value={10}>Nike</MenuItem>
          <MenuItem value={20}>Puma</MenuItem>
          <MenuItem value={30}>Asics</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
