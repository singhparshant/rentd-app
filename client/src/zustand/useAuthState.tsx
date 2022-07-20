import create from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  userName: string;
  role: string;
}
//TODO: make it persistent
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

export default useAuthState;
