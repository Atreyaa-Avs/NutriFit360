import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

const fetchResponse = async (base64: string) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL!}/analyze/cloud`,
      { image: base64 },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    console.log("CloudVision error:", error.response?.data || error.message);
    throw error;
  }
};

export const useCloudVisionResponse = (base64: string, enabled = false) => {
  return useQuery({
    queryKey: ["CloudVisionResponse", base64],
    queryFn: () => fetchResponse(base64),
    enabled,
  });
};
