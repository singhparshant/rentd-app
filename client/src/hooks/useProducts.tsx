import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { getProductsPath } from "../api/requestPaths";
import { Filter } from "../components/common/interfaces/Interfaces";

const useProducts = (filters: Filter) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await axiosInstance.get(getProductsPath, {
          params: filters,
        });

        setProducts(response.data.data);
        setPages(response.data.paging.pages);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [filters]);
  return { products, loading, error, pages };
};
export default useProducts;
