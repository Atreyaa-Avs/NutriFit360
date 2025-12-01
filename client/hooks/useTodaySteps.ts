import { useEffect, useState } from "react";
import {
  initHealthConnect,
  checkHealthConnectAvailability,
  fetchGrantedPermissions,
  askHealthPermissions,
  getStepsForDate,
} from "@/utils/healthConnect";

export function useTodaySteps(autoInit = true) {
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  const loadSteps = async () => {
    try {
      const today = new Date();
      const total = await getStepsForDate(today);
      setSteps(total);
    } catch (e) {
      console.log("loadSteps error:", e);
    }
  };

  const init = async () => {
    setLoading(true);

    await initHealthConnect();

    const av = await checkHealthConnectAvailability();
    setAvailability(av);

    const granted = await fetchGrantedPermissions();

    // request permissions if missing
    if (!granted.includes("Steps")) {
      await askHealthPermissions();
    }

    const updated = await fetchGrantedPermissions();
    setPermissions(updated);

    await loadSteps();

    setLoading(false);
  };

  useEffect(() => {
    if (autoInit) init();
  }, []);

  return {
    steps,
    loading,
    availability,
    permissions,
    refreshSteps: loadSteps,
  };
}
