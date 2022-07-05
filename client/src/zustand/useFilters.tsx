import create from "zustand";
import { Filter } from "../components/common/interfaces/Interfaces";

interface FilterStore {
  filters: Filter;
  setFilters: (name: any, value: any) => void;
  resetFilters: () => void;
}

const useFilters = create<FilterStore>((set) => ({
  filters: {},
  setFilters: (name: any, value: any) =>
    set((state: any) => ({
      filters: { ...state.filters, [name]: value },
    })),
  resetFilters: () =>
    set((state: any) => ({
      filters: {},
    })),
  clearSearch: () =>
    set((state: any) => ({ filters: { ...state.filters, search: "" } })),
}));

export default useFilters;
