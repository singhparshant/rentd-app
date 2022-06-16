import { Slider } from "@mui/material";
import { useState } from "react";

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
    value: 100,
    label: ">€100",
  },
];

const SliderFilter = () => {
  const [price, setPrice] = useState<number>(100);

  //changing value:number is not working, so set it to any
  const handleChange = (event: Event, value: any) => {
    setPrice(value);
  };

  const getText = (value: number) => `${value}`;

  return (
    <div style={{ width: "85%", margin: "20px" }}>
      <Slider
        min={20}
        max={100}
        step={20}
        defaultValue={100}
        value={price}
        onChange={handleChange}
        marks={customMarks}
        getAriaValueText={getText}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default SliderFilter;
