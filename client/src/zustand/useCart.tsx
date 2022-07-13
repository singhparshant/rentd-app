import { PersonAddDisabledTwoTone } from "@mui/icons-material";
import create from "zustand";
import { persist } from "zustand/middleware";
import { OrderItem, Product } from "../components/common/interfaces/Interfaces";
import Cart from "../components/common/navBar/Cart";

const product1: Product = {
  name: "Nike Air Limited Edition 42",
  monthlyPrice: 25,
  discount: 0,
  deposit: 100,
  minDuration: 6,
  maxDuration: 10,
  description: "Shoes are beautiful",
  avgRating: 5,
  numberRatings: 5,
  category: "Shoes",
  productImages: ["images"],
  supplierId: "ttt",
};
const product2: Product = {
  name: "Adidas StanSmith",
  monthlyPrice: 25,
  discount: 0,
  deposit: 100,
  minDuration: 6,
  maxDuration: 10,
  description: "Shoes are beautiful",
  avgRating: 5,
  numberRatings: 5,
  category: "Shoes",
  productImages: ["images"],
  supplierId: "ttt",
};
const orderItem1: OrderItem = {
  id: 1,
  product: product1,
  quantity: 2,
  rentalDuration: 3,
};
const orderItem2: OrderItem = {
  id: 2,
  product: product2,
  quantity: 2,
  rentalDuration: 3,
};

const useCart = create((set) => ({
  cart: [orderItem1, orderItem2],
  addItemToCart: (item: any) => {
    set((state: any) => ({
      cart: [...state.cart, item],
    }));
  },
  removeItem: (item: any) => {
    set((state: any) => ({
      cart: state.cart.filter((el: OrderItem) => el.id !== item.id),
    }));
  },
  emptyCart: () => set({ cart: [] }),
  incrementItemQuantity: (item: OrderItem) => {
    set((state: any) => ({
      cart: state.cart.map((el: OrderItem) => {
        if (el.id === item.id) {
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
        if (el.id === item.id) {
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
        if (el.id === item.id) {
          return {
            ...el,
            rentalDuration: item.rentalDuration + 1,
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
        if (el.id === item.id) {
          return {
            ...el,
            rentalDuration: item.rentalDuration - 1,
          };
        } else {
          return el;
        }
      }),
    }));
  },
}));

export default useCart;
