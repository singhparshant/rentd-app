import create from "zustand";
import { Filter } from "../components/common/interfaces/Interfaces";

interface FilterStore {
  filters: Filter;
  setFilters: (name: any, value: any) => void;
  resetFilters: () => void;
}

const useFilters = create<FilterStore>((set) => ({
  filters: {
    categories: ["Transport", "Electronics"],
    minDuration: 1,
    monthlyPrice: 1000000,
    reviewed: false,
  },
  setFilters: (name: any, value: any) =>
    set((state: any) => ({
      filters: { ...state.filters, [name]: value },
    })),
  resetFilters: () =>
    set((state: any) => ({
      filters: {
        categories: ["Transport", "Electronics"],
        minDuration: 1,
        monthlyPrice: 1000000,
        reviewed: false,
      },
    })),
}));

export default useFilters;
