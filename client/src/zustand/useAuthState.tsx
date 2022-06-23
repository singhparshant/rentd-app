import create from "zustand";
import { persist } from "zustand/middleware";

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

const useAuthState = create(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user: any) => set({ user }),
      setLoading: (loading: Boolean) => set({ loading }),
    }),
    {
      name: "authState", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

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
