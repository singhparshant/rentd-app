import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Application } from "../components/common/interfaces/Interfaces";

export const useApplications = (status: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response: any = await axiosInstance.get(
          `/applications?status=${status}`
        );
        setApplications(response.data.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [status]);
  return { applications, loading, error };
};
