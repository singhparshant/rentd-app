import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { getProductsPath } from "../api/requestPaths";
import { Product } from "../components/common/interfaces/Interfaces";

const useProducts = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Product[] = await axiosInstance.get(getProductsPath);
        setData(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return { data, loading };
};
export default useProducts;
