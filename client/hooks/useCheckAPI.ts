import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMMKVString } from "react-native-mmkv";

/**
 * Hook to check if backend API is reachable
 * @param enabled Whether to run the query
 */
export const useCheckAPI = (enabled: boolean = false) => {
  // Get IP directly from MMKV hook
  const [IP] = useMMKVString("IP");

  const fetchResponse = async () => {
    if (!IP) throw new Error("IP not set");

    const response = await axios.get(`http://${IP}:8080/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data ? true : false;
  };

  return useQuery({
    queryKey: [`API Status of ${IP}`],
    queryFn: fetchResponse,
    enabled: enabled && !!IP, // only run if enabled and IP exists
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });
};
