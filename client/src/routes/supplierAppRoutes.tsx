import { Redirect } from "react-router-dom";
import {
  addProductPath,
  getOrderByIdPath,
  getOrdersPath,
  getProductByIdPath,
  getProductsPath,
  landingPagePath,
  profilePath,
} from "../api/requestPaths";
import NotFound from "../components/common/notFound/NotFound";
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen";
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen";
import AddProductScreen from "../components/supplierApp/addProductScreen/AddProductScreen";
import DisplayOrdersPage from "../components/supplierApp/Pages/DisplayOrdersPage";
import ProductsPage from "../components/supplierApp/Pages/ProductsPage";
import ProfilePage from "../components/supplierApp/Pages/ProfilePage";
import { AppRoute } from "./customerAppRoutes";

export const supplierAppRoutes: Array<AppRoute> = [
  {
    path: landingPagePath,
    component: <Redirect to={getOrdersPath} />,
    // component: <LandingPage />,
  },

  {
    path: getOrdersPath,
    component: <DisplayOrdersPage />,
  },

  {
    path: getOrderByIdPath,
    component: <OrderDetailsScreen />,
  },

  {
    path: getProductsPath,
    component: <ProductsPage />,
  },

  {
    path: getProductByIdPath,
    component: <ProductDetailsScreen />,
  },

  {
    path: addProductPath,
    component: <AddProductScreen />,
  },
  {
    path: profilePath,
    component: <ProfilePage />,
  },
  {
    path: "/*",
    component: <NotFound />,
  },
];
