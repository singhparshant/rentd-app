import { InputLabel, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import useFilters from "../../../zustand/useFilters";

type Props = {};

interface Ioption {
  label: string;
  value: number;
}

const options: Ioption[] = [
  { label: "1 month", value: 1 },
  { label: "2 months", value: 2 },
  { label: "3 months", value: 3 },
  { label: "4 months", value: 4 },
];

const Duration = (props: Props) => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const handleChange = (e: SelectChangeEvent) => {
    setFilters(e.target.name, e.target.value);
  };

  return (
    <FormControl variant="outlined" sx={{ width: "90%", margin: "10px" }}>
      <InputLabel id="test-select-label">Min. Duration</InputLabel>
      <Select
        value={filters.duration}
        label={"Min. Duration"}
        onChange={handleChange}
        name="duration"
      >
        {options.map((option: Ioption, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Duration;
