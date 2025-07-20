import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResponse = async (base64: string): Promise<any> => {
  const response = await axios.post(
    "http://192.168.1.2:8080/analyze/cloud",
    {
      image: base64,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useCloudVisionResponse = (
  base64: string,
  enabled: boolean = false
) => {
  return useQuery({
    queryKey: ["CloudVisionResponse", base64],
    queryFn: () => fetchResponse(base64),
    enabled,
  });
};
