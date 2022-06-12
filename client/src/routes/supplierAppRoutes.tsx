import NotFound from "../components/common/notFound/NotFound"
import OrderDetailsScreen from "../components/common/orderDetailsScreen/OrderDetailsScreen"
import OrdersScreen from "../components/common/ordersScreen/OrdersScreen"
import ProductDetailsScreen from "../components/common/productDetails/ProductDetailsScreen"
import AddProductScreen from "../components/supplierApp/addProductScreen/AddProductScreen"
import ProductsScreen from "../components/supplierApp/productsScreen/ProductsScreen"
import SupplierHomeScreen from "../components/supplierApp/supplierHomeScreen/SupplierHomeScreen"
import { AppRoute } from "./customerAppRoutes"

export const supplierAppRoutes: Array<AppRoute> = [
    {
        path: "/",
        component: <SupplierHomeScreen />
    },

    {
        path: "/orders",
        component: <OrdersScreen />
    },

    {
        path: "/orders/:id",
        component: <OrderDetailsScreen />
    },

    {
        path: "/products",
        component: <ProductsScreen />
    },

    {
        path: "/products/:id",
        component: <ProductDetailsScreen />
    },

    {
        path: "/addProduct",
        component: <AddProductScreen />
    },
    {
        path: "/*",
        component: <NotFound />
    },
]