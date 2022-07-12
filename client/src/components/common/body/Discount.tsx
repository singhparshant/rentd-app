import { Checkbox, FormControlLabel } from "@mui/material";
import useFilters from "../../../zustand/useFilters";

export const Discount = () => {
  const filters = useFilters((state: any) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);

  const handleChange = (e: any) => {
    console.log("checked", e.target.checked);
    setFilters(e.target.name, e.target.checked);
  };

  return (
    <div className="resetButton">
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="in discount"
        name="hasDiscount"
        onChange={handleChange}
        checked={filters.hasDiscount || false}
      />
    </div>
  );
};
