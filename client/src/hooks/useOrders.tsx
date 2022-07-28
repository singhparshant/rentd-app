import { RepeatOneSharp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import useAuthState from "../zustand/useAuthState";

export const useOrders = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const { id, role } = useAuthState((state: any) => state.user);

  const getProductById = async (productId: string[]) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        //fetch orders by userId
        const response = await axiosInstance.get(
          `/orders?userId=${id}&role=${role}`
        );
        let orders = response.data.data;

        for (let i = 0; i < orders.length; i++) {
          const orderItems = orders[i].orderItems;
          for (let j = 0; j < orderItems.length; j++) {
            const product = await getProductById(
              orders[i].orderItems[j].productId
            );
            orders[i].orderItems[j] = { ...orders[i].orderItems[j], product };
          }
        }
        setOrders(orders);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, role]);
  return { orders, loading, error };
};
