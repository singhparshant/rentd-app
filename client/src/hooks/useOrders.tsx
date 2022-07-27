import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import useAuthState from "../zustand/useAuthState";

export const useOrders = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const { id, role } = useAuthState((state: any) => state.user);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        //fetch orders by userId
        const response = await axiosInstance.get(
          `/orders?userId=${id}&role=${role}`
        );
        setOrders(response.data.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, role]);
  return { orders, loading, error };
};
