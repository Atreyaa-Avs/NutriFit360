import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FetchPlanParams {
  workoutRecommendation: string;
}

const fetchAIWorkoutPlan = async ({ workoutRecommendation }: FetchPlanParams) => {
  try {
    const response = await axios.post(
      "http://192.168.1.19:8080/ai/workout-plan",
      { workoutRecommendation: workoutRecommendation },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    return response.data; // should match WorkoutPlan structure
  } catch (err: any) {
    console.error("Error fetching AI workout plan:", err.message);
    throw err;
  }
};

export const useAIWorkoutPlan = (workoutRecommendation: string) => {
  return useQuery({
    queryKey: ["aiWorkoutPlan", workoutRecommendation],
    queryFn: () => fetchAIWorkoutPlan({ workoutRecommendation }),
    enabled: !!workoutRecommendation,
  });
};
