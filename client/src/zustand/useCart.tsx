import create from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axios";
import { OrderItem } from "../components/common/interfaces/Interfaces";
const useCart = create(
  persist((set, get) => ({
    cart: [],
    setCart: async (id: any) => {
      //TODO
      const shoppingCart = await axiosInstance.get("/shoppingCarts", id);
      set(() => ({
        cart: shoppingCart.data.data,
      }));
    },
    addItemToCart: (item: OrderItem) => AddItemToCart(item, get, set),
    removeItem: (item: any) => {
      set((state: any) => ({
        cart: state.cart.filter((el: OrderItem) => el._id !== item._id),
      }));
    },
    emptyCart: () => set({ cart: [] }),

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
  }))
);

const AddItemToCart = (item: OrderItem, get: any, set: any) => {
  let cart = get().cart;

  const idx = cart.findIndex(
    (it: OrderItem) =>
      item.product._id === it.product._id && item.duration === it.duration
  );

  if (idx > -1) {
    //item exists in cart, update quantity:
    cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + 1 };
  } else {
    //add new item to cart
    cart = [...cart, item];
  }

  set({ cart });
};

export default useCart;
