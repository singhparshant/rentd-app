import {
  addProductPath,
  getOrderByIdPath,
  getOrdersPath,
  getProductByIdPath,
  getProductsPath,
  landingPagePath,
} from "../api/requestPaths";
import NotFound from "../components/common/notFound/NotFound";
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen";
import OrdersScreen from "../components/common/ordersScreen/OrdersScreen";
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen";
import AddProductScreen from "../components/supplierApp/addProductScreen/AddProductScreen";
import ProductsScreen from "../components/supplierApp/productsScreen/ProductsScreen";
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
  {
    path: "/*",
    component: <NotFound />,
  },
];
