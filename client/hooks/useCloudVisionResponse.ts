import axios from "axios";

export const fetchResponse = async (base64: string) => {
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