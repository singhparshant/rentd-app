import {
  Select,
  OutlinedInput,
  Box,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  Theme,
  TextField,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";

const categories = ["Mobility", "Furniture", "Household"];

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

  const handleChange = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <FormControl sx={{ margin: 2, width: "90%" }}>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        // labelId="demo-multiple-chip-label"
        label={"Categories"}
        multiple
        value={selectedCategories}
        onChange={handleChange}
        // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
