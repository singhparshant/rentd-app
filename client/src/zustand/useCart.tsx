import create from "zustand";
import { persist } from "zustand/middleware";

//TODO make it persistent
const useCart = create((set, get) => ({
  cart: [],
  addItemToCart: (item: any) => addItemToCart(item, get, set),
  removeItem: (item: any) => removeItem(item, get, set),
  emptyCart: () => set({ cart: [] }),
}));

const addItemToCart = (item: any, get: any, set: any) => {};
const removeItem = (item: any, get: any, set: any) => {};
export default useCart;
