import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResponse = async (body: any): Promise<any> => {
  const response = await axios.post(
    // `${process.env.EXPO_PUBLIC_BACKEND_URL}/recommend/`,
    "http://192.168.1.19:8080/recommend",
    body
  );
  return response.data;
};

export const useResponse = (body: any, mode: string, enabled = true) => {
  return useQuery({
    queryKey: [`response${mode}`, body],
    queryFn: () => fetchResponse(body),
    enabled: false,
  });
};