import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResponse = async (base64: string): Promise<any> => {
  const response = await axios.post(
    "http://192.168.1.2:8080/analyze/ollama",
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

export const useOllamaVisionResponse = (
  base64: string,
  enabled: boolean = false
) => {
  return useQuery({
    queryKey: ["OllamaVisionResponse", base64],
    queryFn: () => fetchResponse(base64),
    enabled,
  });
};
