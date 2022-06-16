import { InputLabel, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

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
  const [duration, setDuration] = useState("");
  const handleChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);

    // setDuration(e.target.value as number);
  };
  return (
    <FormControl variant="outlined" sx={{ width: "90%", margin: "10px" }}>
      <InputLabel id="test-select-label">Min. Duration</InputLabel>
      <Select
        defaultValue={"1"}
        value={duration}
        label={"Min. Duration"}
        onChange={handleChange}
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
