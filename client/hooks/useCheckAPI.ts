import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResponse = async () => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL!}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data ? true : false;
};

export const useCheckAPI = () => {
  return useQuery({
    queryKey: [`API Status`],
    queryFn: () => fetchResponse(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });
};
