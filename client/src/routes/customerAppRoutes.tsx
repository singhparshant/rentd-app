import { ReactNode } from "react";
import Login from "../components/common/login/Login";
import NotFound from "../components/common/notFound/NotFound";
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen";
import SignUp from "../components/common/signUp/SignUp";
import CartScreen from "../components/customerApp/cartScreen/CartScreen";
import CheckoutScreen from "../components/customerApp/checkoutScreen/CheckoutScreen";
import HomeScreen from "../components/customerApp/homeScreen/HomeScreen";
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen";
import OrdersScreen from "../components/common/ordersScreen/OrdersScreen";
import ProductsSearchScreen from "../components/common/productsSearchScreen/ProductsSearchScreen";

export interface AppRoute {
  path: string;
  component: ReactNode;
}
export const customerAppRoutes: Array<AppRoute> = [
  {
    path: "/",
    component: <HomeScreen />,
  },
  {
    path: "/register",
    component: <SignUp />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/products/:id",
    component: <ProductDetailsScreen />,
  },
  {
    path: "/products/search/:searchString",
    component: <ProductsSearchScreen />,
  },
  {
    path: "/cart",
    component: <CartScreen />,
  },
  {
    path: "/checkout",
    component: <CheckoutScreen />,
  },
  {
    path: "/orders",
    component: <OrdersScreen />,
  },
  {
    path: "/orders/:id",
    component: <OrderDetailsScreen />,
  },
  {
    path: "/*",
    component: <NotFound />,
  },
];
