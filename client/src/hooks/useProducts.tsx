import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { getProductsPath } from "../api/requestPaths";
import { Filter } from "../components/common/interfaces/Interfaces";

const useProducts = (filters: Filter) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axiosInstance.get(getProductsPath, {
          params: filters,
        });
        setData(response);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [filters]);
  return { data, loading, error };
};
export default useProducts;
