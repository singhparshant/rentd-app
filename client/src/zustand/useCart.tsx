import { PersonAddDisabledTwoTone } from "@mui/icons-material";
import create from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axios";
import {
  OrderItem,
  Product,
  ShoppingCart,
} from "../components/common/interfaces/Interfaces";
import Cart from "../components/common/navBar/Cart";
const useCart = create((set) => ({
  cart: [],
  setCart: async (id: any) => {
    
    //TODO
    const shoppingCart = await axiosInstance.get("/shoppingCarts", id);
    console.log("Getting the shopping cart of the user: ");
    set(() => ({
      cart: shoppingCart.data.data,
    }));
  },
  addItemToCart: (item: OrderItem) => {
    set((state: any) => ({
      cart: [...state.cart, item],
    }));
  },
  removeItem: (item: any) => {
    set((state: any) => ({
      cart: state.cart.filter((el: OrderItem) => el._id !== item.id),
    }));
  },
  emptyCart: () => set({ cart: [] }),
  incrementItemQuantity: (item: OrderItem) => {
    set((state: any) => ({
      cart: state.cart.map((el: OrderItem) => {
        if (el._id === item._id) {
          return {
            ...el,
            quantity: item.quantity + 1,
          };
        } else {
          return el;
        }
      }),
    }));
  },
  decrementItemQuantity: (item: OrderItem) => {
    set((state: any) => ({
      cart: state.cart.map((el: OrderItem) => {
        if (el._id === item._id) {
          return {
            ...el,
            quantity: item.quantity - 1,
          };
        } else {
          return el;
        }
      }),
    }));
  },
  incrementItemDuration: (item: OrderItem) => {
    set((state: any) => ({
      cart: state.cart.map((el: OrderItem) => {
        if (el._id === item._id) {
          return {
            ...el,
            duration: item.duration + 1,
          };
        } else {
          return el;
        }
      }),
    }));
  },
  decrementItemDuration: (item: OrderItem) => {
    set((state: any) => ({
      cart: state.cart.map((el: OrderItem) => {
        if (el._id === item._id) {
          return {
            ...el,
            duration: item.duration - 1,
          };
        } else {
          return el;
        }
      }),
    }));
  },
}));

export default useCart;
