import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FetchPlanParams {
  dietRecommendation: string;
}

const fetchAIDietPlan = async ({ dietRecommendation }: FetchPlanParams) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL!}/ai/diet-plan`,
      { dietRecommendation: dietRecommendation },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // should match DietPlan structure
  } catch (err: any) {
    console.error("Error fetching AI workout plan:", err.message);
    throw err;
  }
};

export const useAIDietPlan = (dietRecommendation: string) => {
  return useQuery({
    queryKey: ["aiDietPlan", dietRecommendation],
    queryFn: () => fetchAIDietPlan({ dietRecommendation }),
    enabled: !!dietRecommendation,
  });
};
