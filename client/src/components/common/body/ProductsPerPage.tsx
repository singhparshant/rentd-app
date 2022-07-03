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
  { label: "Five", value: 5 },
  { label: "Ten", value: 10 },
  { label: "Twenty", value: 20 },
  { label: "Fifty", value: 50 },
];

const ProductsPerPage = (props: Props) => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const handleChange = (e: SelectChangeEvent) => {
    setFilters(e.target.name, e.target.value);
  };

  return (
    <FormControl variant="outlined" sx={{ width: "90%", margin: "10px" }}>
      <InputLabel id="test-select-label">Products per Page</InputLabel>
      <Select
        value={filters.limit || null}
        label={"Limit"}
        onChange={handleChange}
        name="limit"
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

export default ProductsPerPage;
