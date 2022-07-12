import { Slider } from "@mui/material";
import useFilters from "../../../zustand/useFilters";

const customMarks = [
  {
    value: 100,
    label: "€100",
  },
  {
    value: 200,
    label: "€200",
  },
  {
    value: 300,
    label: "€300",
  },
  {
    value: 400,
    label: "€400",
  },
  {
    value: 500,
    label: "€500",
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
      <span style={{ fontFamily: "Helvetica Neue" }}>Maximum price</span>
      <Slider
        min={100}
        max={500}
        step={100}
        value={filters.monthlyPrice || null}
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
