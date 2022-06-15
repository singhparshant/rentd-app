import create from "zustand";

export interface AuthUser {
  userId: string;
  userName: string;
  role: string;
}

const useAuthState = create((set) => ({
  user: { name: "Anoir", role: "admin" },
  loading: true,
  setUser: (user: any) => set({ user }),
  setLoading: (loading: Boolean) => set({ loading }),
}));

export default useAuthState;
