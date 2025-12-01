import { useEffect, useState } from "react";
import {
  initHealthConnect,
  checkHealthConnectAvailability,
  fetchGrantedPermissions,
  askHealthPermissions,
  getCaloriesForDate,
} from "@/utils/healthConnect";

export function useTodayCalories(autoInit = true) {
  const [activeCalories, setActiveCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCalories = async () => {
    try {
      const today = new Date();
      const { active, total } = await getCaloriesForDate(today);

      setActiveCalories(active);
      setTotalCalories(total);
    } catch (err) {
      console.log("Calories Error:", err);
    }
  };

  const init = async () => {
    setLoading(true);

    await initHealthConnect();
    await checkHealthConnectAvailability();

    const granted = await fetchGrantedPermissions();

    if (!granted.includes("TotalCaloriesBurned")) {
      await askHealthPermissions();
    }

    await loadCalories();
    setLoading(false);
  };

  useEffect(() => {
    if (autoInit) init();
  }, []);

  return {
    activeCalories,
    totalCalories,
    loading,
    refreshCalories: loadCalories,
  };
}
