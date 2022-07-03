import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useFilters from "../../../zustand/useFilters";

type Props = {};

interface Ioption {
  label: string;
  value: number;
}

const options: Ioption[] = [
  { label: "🌟", value: 1 },
  { label: "🌟🌟", value: 2 },
  { label: "🌟🌟🌟", value: 3 },
  { label: "🌟🌟🌟🌟", value: 4 },
];

const AvgRating = (props: Props) => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const handleChange = (e: SelectChangeEvent) => {
    setFilters(e.target.name, e.target.value);
  };

  return (
    <FormControl variant="outlined" sx={{ width: "90%", margin: "10px" }}>
      <InputLabel id="test-select-label">Min. Avg. Rating</InputLabel>
      <Select
        value={filters.avgRating || null}
        label={"Min. Avg. Rating"}
        onChange={handleChange}
        name="avgRating"
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

export default AvgRating;
