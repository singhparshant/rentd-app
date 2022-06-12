import create from 'zustand'

const useAuthState = create(set => ({
  user: null,
  loading: true,
  setUser: (user:any) => set({ user }),
  setLoading: (loading:Boolean) => set({loading})
}))

export default useAuthState;