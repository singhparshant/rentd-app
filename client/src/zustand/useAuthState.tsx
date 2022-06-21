import create from "zustand";

export interface AuthUser {
  userId: string;
  userName: string;
  role: string;
}
//TODO: make it persistent
interface Filter {
  categories: String[];
  minPrice: Number;
  reviewed: boolean;
  minDuration: Number;
}

interface FilterStore {
  filters: Filter;
  setFilters: (newFilter: Filter) => void;
}

const useAuthState = create((set) => ({
  user: null,
  loading: true,
  setUser: (user: any) => set({ user }),
  setLoading: (loading: Boolean) => set({ loading }),
}));

const useFilters = create<FilterStore>((set) => ({
  filters: {
    categories: ["mobility", "furniture", "household"],
    minPrice: Number.MAX_VALUE,
    reviewed: false,
    minDuration: 1,
  },
  setFilters: (newFilter: Filter) =>
    set((state) => ({ filters: { ...state.filters, ...newFilter } })),
}));

export default useAuthState;
