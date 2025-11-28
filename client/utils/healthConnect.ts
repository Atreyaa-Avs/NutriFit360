// utils/healthConnect.service.ts

import {
  initialize,
  getSdkStatus,
  SdkAvailabilityStatus,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from "react-native-health-connect";

/** ----- RECORD TYPES YOU WANT TO SUPPORT ----- */
export type HealthRecordType =
  | "Steps"
  | "Distance"
  | "ActiveCaloriesBurned"
  | "TotalCaloriesBurned"
  | "HeartRate"
  | "Hydration"
  | "SleepSession";

/** ----- INITIALIZE SDK ----- */
export async function initHealthConnect() {
  try {
    const isInitialized = await initialize();
    return { initialized: isInitialized };
  } catch (err) {
    console.log("HC Init Error:", err);
    return { initialized: false };
  }
}

/** ----- CHECK AVAILABILITY ----- */
export async function checkHealthConnectAvailability() {
  const status = await getSdkStatus();

  switch (status) {
    case SdkAvailabilityStatus.SDK_AVAILABLE:
      return "Available";
    case SdkAvailabilityStatus.SDK_UNAVAILABLE:
      return "Not Installed";
    default:
      return "Update Required";
  }
}

/** ----- ASK FOR ALL PERMISSIONS YOU NEED ----- */
export async function askHealthPermissions() {
  try {
    const granted = await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "Distance" },
      { accessType: "read", recordType: "ActiveCaloriesBurned" },
      { accessType: "read", recordType: "TotalCaloriesBurned" },
      { accessType: "read", recordType: "HeartRate" },
      { accessType: "read", recordType: "Hydration" },
      { accessType: "read", recordType: "SleepSession" },
    ]);
    return granted;
  } catch (err) {
    console.log("Permission Error:", err);
    return [];
  }
}

/** ----- GET GRANTED PERMISSIONS ----- */
export async function fetchGrantedPermissions() {
  const stored = await getGrantedPermissions();
  return stored.map((p) => p.recordType);
}

/** ----- GENERIC READ RECORD FUNCTION ----- */
export async function readHealthRecord(
  type: HealthRecordType,
  start: Date,
  end: Date
) {
  try {
    const response = await readRecords(type, {
      timeRangeFilter: {
        operator: "between",
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      },
    });

    return Array.isArray((response as any).records)
      ? (response as any).records
      : [];
  } catch (err) {
    console.log("Read Error:", err);
    return [];
  }
}

/** ----- SPECIAL HELPERS (STEPS, CALORIES, ETC.) ----- */
export async function getStepsForDate(date: Date) {
  // Start of the day in LOCAL TIME
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  // End of the day in LOCAL TIME
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const records = await readHealthRecord("Steps", start, end);

  return records.reduce((sum: number, r: any) => sum + (r.count ?? 0), 0);
}

export async function getStepsForLastNDays(days: number) {
  const results: { date: string; steps: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0); // normalize
    d.setDate(d.getDate() - i);

    const steps = await getStepsForDate(d);

    results.push({
      date: d.toISOString().split("T")[0], // YYYY-MM-DD
      steps,
    });
  }

  return results;
}

export async function getCaloriesForDate(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const active = await readHealthRecord("ActiveCaloriesBurned", start, end);
  const total = await readHealthRecord("TotalCaloriesBurned", start, end);

  const activeSum = active.reduce(
    (s: number, r: any) => s + (r.energy?.inKilocalories ?? 0),
    0
  );
  const totalSum = total.reduce(
    (s: number, r: any) => s + (r.energy?.inKilocalories ?? 0),
    0
  );

  return { active: activeSum, total: totalSum };
}

export async function getDistanceForDate(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const records = await readHealthRecord("Distance", start, end);

  return records.reduce(
    (sum: number, r: any) => sum + (r.distance?.inMeters ?? 0),
    0
  );
}
