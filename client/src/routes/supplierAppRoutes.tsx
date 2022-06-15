import {
  addProductPath,
  getOrderByIdPath,
  getOrdersPath,
  getProductByIdPath,
  getProductsPath,
  landingPagePath,
  profilePath,
  settingsPath,
} from "../api/requestPaths";
import NotFound from "../components/common/notFound/NotFound";
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen";
import OrdersScreen from "../components/common/ordersScreen/OrdersScreen";
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen";
import ProfileScreen from "../components/common/profileScreen/ProfileScreen";
import AddProductScreen from "../components/supplierApp/addProductScreen/AddProductScreen";
import ProductsScreen from "../components/supplierApp/productsScreen/ProductsScreen";
import SettingsScreen from "../components/supplierApp/settingsScreen/SettingsScreen";
import SupplierHomeScreen from "../components/supplierApp/supplierHomeScreen/SupplierHomeScreen";
import { AppRoute } from "./customerAppRoutes";

export const supplierAppRoutes: Array<AppRoute> = [
  {
    path: landingPagePath,
    component: <SupplierHomeScreen />,
  },

  {
    path: getOrdersPath,
    component: <OrdersScreen />,
  },

  {
    path: getOrderByIdPath,
    component: <OrderDetailsScreen />,
  },

  {
    path: getProductsPath,
    component: <ProductsScreen />,
  },

  {
    path: getProductByIdPath,
    component: <ProductDetailsScreen />,
  },

  {
    path: addProductPath,
    component: <AddProductScreen />,
  },
  { path: profilePath, component: <ProfileScreen /> },
  { path: settingsPath, component: <SettingsScreen /> },
  {
    path: "/*",
    component: <NotFound />,
  },
];
