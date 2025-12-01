import { useEffect, useState } from "react";
import { getStepsForLastNDays } from "@/utils/healthConnect";

export const useWeeklySteps = () => {
  const [weeklySteps, setWeeklySteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const res = await getStepsForLastNDays(7); // returns [{date, steps}]
        const stepsOnly = res.map((d) => d.steps);
        setWeeklySteps(stepsOnly);
      } catch (err) {
        console.log("Weekly steps error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSteps();
  }, []);

  return { weeklySteps, loading };
};
