import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useFilters from "../../../zustand/useFilters";

export const Sort = () => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const handleChange = (e: SelectChangeEvent) => {
    setFilters(e.target.name, e.target.value);
  };

  const options = [
    { label: "Price", value: "price" },
    { label: "Name", value: "name" },
  ];

  return (
    <FormControl variant="outlined" sx={{ width: "90%", margin: "10px" }}>
      <InputLabel id="test-select-label">Sort by</InputLabel>
      <Select
        value={filters.sortBy || null}
        label={"Sort by"}
        onChange={handleChange}
        name="sortBy"
      >
        {options.map((option, index) => {
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
