import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { getProductsPath } from "../api/requestPaths";
import { Filter } from "../components/common/interfaces/Interfaces";
import useAuthState from "../zustand/useAuthState";

const useProducts = (filters: Filter) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [pages, setPages] = useState(0);
  const user = useAuthState((state: any) => state.user);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await axiosInstance.get(getProductsPath, {
          params:
            user && user.role === "supplier"
              ? { ...filters, supplierId: user.id }
              : filters,
        });

        setProducts(response.data.data);
        setPages(response.data.paging.pages);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [filters, user]);
  return { products, loading, error, pages };
};
export default useProducts;
