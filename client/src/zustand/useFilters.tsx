import create from "zustand";
import { Filter } from "../components/common/interfaces/Interfaces";

interface FilterStore {
  filters: Filter;
  setFilters: (name: any, value: any) => void;
  resetFilters: () => void;
}

const useFilters = create<FilterStore>((set) => ({
  filters: {
    categories: [],
    duration: 1,
    maxPrice: 1000000,
    reviewed: false,
  },
  setFilters: (name: any, value: any) =>
    set((state: any) => ({
      filters: { ...state.filters, [name]: value },
    })),
  resetFilters: () =>
    set((state: any) => ({
      filters: {
        categories: [],
        duration: 1,
        maxPrice: 1000000,
        reviewed: false,
      },
    })),
}));

export default useFilters;
