import { ReactNode } from "react";
import Login from "../components/common/login/Login";
import NotFound from "../components/common/notFound/NotFound";
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen";
import SignUp from "../components/common/signUp/SignUp";
import CartScreen from "../components/customerApp/cartScreen/CartScreen";
// import CheckoutScreen from "../components/customerApp/checkoutScreen/CheckoutScreen";
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen";
import OrdersScreen from "../components/common/ordersScreen/OrdersScreen";
import HomeScreen from "../components/customerApp/homeScreen/HomeScreen";
// import ProductsSearchScreen from "../components/common/productsSearchScreen/ProductsSearchScreen";
import {
  getCartPath,
  getOrderByIdPath,
  getOrdersPath,
  getProductByIdPath,
  landingPagePath,
  loginPagePath,
  profilePath,
  registerPagePath,
  success,
  failure,
} from "../api/requestPaths";
import ProfileScreen from "../components/common/profileScreen/ProfileScreen";
import Success from "../components/customerApp/postpaymentScreens/Success";
import Failure from "../components/customerApp/postpaymentScreens/Failure";

export interface AppRoute {
  path: string;
  component: ReactNode;
}
export const customerAppRoutes: Array<AppRoute> = [
  {
    path: landingPagePath,
    component: <HomeScreen />,
  },
  {
    path: registerPagePath,
    component: <SignUp />,
  },
  {
    path: loginPagePath,
    component: <Login />,
  },
  {
    path: getProductByIdPath,
    component: <ProductDetailsScreen />,
  },
  {
    path: getCartPath,
    component: <CartScreen />,
  },
  {
    path: success,
    component: <Success />,
  },
  {
    path: failure,
    component: <Failure />,
  },
  {
    path: getOrdersPath,
    component: <OrdersScreen />,
  },
  {
    path: getOrderByIdPath,
    component: <OrderDetailsScreen />,
  },
  { path: profilePath, component: <ProfileScreen /> },
  {
    path: "/*",
    component: <NotFound />,
  },
];
