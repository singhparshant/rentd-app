import create from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  userId: string;
  userName: string;
  role: string;
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

export default useAuthState;
