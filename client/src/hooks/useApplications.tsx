import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Application } from "../components/common/interfaces/Interfaces";

export const useApplications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await axiosInstance.get("/applications");
        setApplications(response.data.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return { applications, loading, error };
};
