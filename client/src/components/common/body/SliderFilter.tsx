import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import useFilters from "../../../zustand/useFilters";

const customMarks = [
  {
    value: 20,
    label: "€20",
  },
  {
    value: 40,
    label: "€40",
  },
  {
    value: 60,
    label: "€60",
  },
  {
    value: 80,
    label: "€80",
  },
  {
    value: 1000000,
    label: "All",
  },
];

const SliderFilter = () => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);

  //changing value:number is not working, so set it to any
  const handleChange = (event: any, value: any) => {
    setFilters(event.target.name, value);
  };

  const getText = (value: number) => `${value}`;

  return (
    <div style={{ width: "85%", margin: "20px" }}>
      <Slider
        min={20}
        max={100}
        step={20}
        defaultValue={1000000}
        value={filters.monthlyPrice}
        onChange={handleChange}
        marks={customMarks}
        getAriaValueText={getText}
        valueLabelDisplay="auto"
        name="monthlyPrice"
      />
    </div>
  );
};

export default SliderFilter;
