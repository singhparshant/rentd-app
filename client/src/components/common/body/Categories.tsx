import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import useFilters from "../../../zustand/useFilters";
import { Filter } from "../interfaces/Interfaces";

const categories = ["Mobility", "Furniture", "Household", "Sports"];

function getStyles(
  category: string,
  personcategory: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      personcategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Categories = () => {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filters = useFilters<Filter>((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);

  const handleChange = (
    event: SelectChangeEvent<typeof filters.categories>
  ) => {
    const {
      target: { value },
      target: { name },
    } = event;

    // setSelectedCategories(typeof value === "string" ? value.split(",") : value);
    setFilters(name, value);
  };

  return (
    <FormControl sx={{ margin: 2, width: "90%" }}>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        name="categories"
        label={"Categories"}
        multiple
        value={filters.categories || []}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            value={category}
            style={getStyles(category, selectedCategories, theme)}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Categories;
