import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResponse = async (IP: string) => {
  const response = await axios.get(`http://${IP}:8080/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data ? true : false;
};

export const useCheckAPI = (IP: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: [`API Status of ${IP}`],
    queryFn: () => fetchResponse(IP),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });
};
