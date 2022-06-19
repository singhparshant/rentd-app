import create from "zustand";

export interface AuthUser {
  userId: string;
  userName: string;
  role: string;
}
//TODO: make it persistent
const useAuthState = create((set) => ({
  user: { name: "Anoir", role: "supplier" },
  loading: true,
  setUser: (user: any) => set({ user }),
  setLoading: (loading: Boolean) => set({ loading }),
}));

export default useAuthState;
