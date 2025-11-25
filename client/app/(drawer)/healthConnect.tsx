import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
} from "@/components/Fonts";

import HealthConnectSvg from "@/assets/svgs/Health_Connect.svg";
import ExchangeSvg from "@/assets/svgs/arrow-down-up.svg";
import LogoSvg from "@/assets/svgs/logo/trans-logo-orange.svg";

import {
  getSdkStatus,
  SdkAvailabilityStatus,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from "react-native-health-connect";

// ----------------------------
// Reusable Permission Card
// ----------------------------
const PermissionCard = ({
  title,
  selectedDate,
  onPrev,
  onNext,
  value,
}: any) => {
  const formatDate = (date: Date) => date.toDateString();

  return (
    <View className="bg-white p-4 rounded-xl mt-4">
      <GilroySemiBoldText className="mb-2">{title}</GilroySemiBoldText>

      {/* Date Navigation */}
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={onPrev}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>

        <GilroyRegularText className="text-base">
          {formatDate(selectedDate)}
        </GilroyRegularText>

        <TouchableOpacity onPress={onNext}>
          <Ionicons name="chevron-forward" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <GilroyBoldText className="text-3xl text-center">{value}</GilroyBoldText>
    </View>
  );
};

const HealthConnect = () => {
  const router = useRouter();
  const theme = useColorScheme();

  const [availability, setAvailability] = useState<string>("");
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // ALL HEALTH VALUES
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [hydration, setHydration] = useState<string>("");
  const [heartRate, setHeartRate] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("0/0");
  const [activeCalories, setActiveCalories] = useState<string>("");
  const [totalCalories, setTotalCalories] = useState<string>("");

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(drawer)/(tabs)/home");
  };

  const goToPreviousDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  // ----------------------------------
  // Request Permissions
  // ----------------------------------
  const requestPermissions = async () => {
    const permissions = await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "Distance" },
      { accessType: "read", recordType: "Speed" },
      { accessType: "read", recordType: "Hydration" },
      { accessType: "read", recordType: "HeartRate" },
      { accessType: "read", recordType: "BloodPressure" },
      { accessType: "read", recordType: "TotalCaloriesBurned" },
      { accessType: "read", recordType: "ActiveCaloriesBurned" },
    ]);

    console.log("Granted permissions", permissions);
    checkGrantedPermissions();
  };

  // ----------------------------------
  // Check Granted Permissions
  // ----------------------------------
  const checkGrantedPermissions = async () => {
    const p = await getGrantedPermissions();
    setGrantedPermissions(p.map((x) => x.recordType));
  };

  // ----------------------------------
  // Fetch ALL data for selected date
  // ----------------------------------
  const fetchAllData = async () => {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const filter = {
      timeRangeFilter: {
        operator: "between" as const,
        startTime: startOfDay.toISOString(),
        endTime: endOfDay.toISOString(),
      },
    };

    try {
      // Steps
      const stepsResult = await readRecords("Steps", filter);
      let totalSteps = 0;
      stepsResult.records?.forEach((r: any) => (totalSteps += r.count ?? 0));
      setSteps(totalSteps);

      // Distance
      const distResult = await readRecords("Distance", filter);
      let totalDist = 0;
      distResult.records?.forEach((r: any) => (totalDist += r.distance ?? 0));
      setDistance(totalDist.toFixed(2) + " m");

      // Speed
      const speedResult = await readRecords("Speed", filter);
      let avgSpeed = 0;
      if (speedResult.records?.length > 0) {
        avgSpeed =
          speedResult.records.reduce(
            (sum: number, r: any) => sum + (r.speed ?? 0),
            0
          ) / speedResult.records.length;
      }
      setSpeed(avgSpeed.toFixed(2) + " m/s");

      // Hydration
      const hydrationResult = await readRecords("Hydration", filter);
      let totalHydration = 0;
      hydrationResult.records?.forEach(
        (r: any) => (totalHydration += r.volume ?? 0)
      );
      setHydration((totalHydration / 1000).toFixed(2) + " L");

      // Heart Rate
      const hrResult = await readRecords("HeartRate", filter);
      let avgHr = 0;
      if (hrResult.records?.length > 0) {
        avgHr =
          hrResult.records.reduce(
            (sum: number, r: any) => sum + (r.bpm ?? 0),
            0
          ) / hrResult.records.length;
      }
      setHeartRate(avgHr.toFixed(0) + " bpm");

      // Blood Pressure
      const bpResult = await readRecords("BloodPressure", filter);
      if (bpResult.records?.length > 0) {
        const bp = bpResult.records[0];
        setBloodPressure(`${bp.systolic}/${bp.diastolic} mmHg`);
      }

      // Active Calories
      const acResult = await readRecords("ActiveCaloriesBurned", filter);
      let ac = 0;
      acResult.records?.forEach((r: any) => (ac += r.energy ?? 0));
      setActiveCalories(ac.toFixed(0) + " kcal");

      // Total Calories
      const tcResult = await readRecords("TotalCaloriesBurned", filter);
      let tc = 0;
      tcResult.records?.forEach((r: any) => (tc += r.energy ?? 0));
      setTotalCalories(tc.toFixed(0) + " kcal");
    } catch (err) {
      console.log("Error reading data:", err);
    }
  };

  // ----------------------------------
  // On First Load
  // ----------------------------------
  useEffect(() => {
    const checkAvailability = async () => {
      const s = await getSdkStatus();
      if (s === SdkAvailabilityStatus.SDK_AVAILABLE) setAvailability("Yes");
      else setAvailability("No");
    };

    checkAvailability();
  }, []);

  useEffect(() => {
    checkGrantedPermissions();
  }, []);

  // Fetch every time date changes
  useEffect(() => {
    fetchAllData();
  }, [selectedDate]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-[#E5E5E5]">
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={theme === "dark" ? "#1a1a1a" : "#E5E5E5"}
        />

        {/* <ScrollView> */}
        <ScrollView className="" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center justify-between p-3 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <GilroyBoldText className="text-xl text-gray-900 mt-2">
            Health Connect 
          </GilroyBoldText>
          <View className="w-10" />
        </View>

          {/* Header Icons */}
          <View className="flex-1 items-center mt-7">
            <View className="flex-row gap-3">
              <HealthConnectSvg width={64} height={64} />
              <ExchangeSvg width={32} height={64} />
              <LogoSvg width={64} height={64} />
            </View>

            <GilroyBoldText className="text-3xl my-4">
              Sync with Health Connect
            </GilroyBoldText>

            <GilroyRegularText className="text-sm text-neutral-500 text-center">
              Your data, your control. Check what NutriFit360 syncs from Google
              Health Connect.
            </GilroyRegularText>
          </View>

          {/* Sync Button */}
          <TouchableOpacity
            onPress={requestPermissions}
            className="bg-gray-300 mt-6 px-4 py-3 rounded-xl w-full items-center"
          >
            <GilroyBoldText>Sync with Health Connect Now</GilroyBoldText>
          </TouchableOpacity>

          {/* Availability */}
          <View className="bg-white p-4 rounded-xl mt-4">
            <GilroySemiBoldText>
              Availability:{" "}
              <GilroyRegularText>{availability}</GilroyRegularText>
            </GilroySemiBoldText>
          </View>

          {/* Granted Permissions */}
          <View className="bg-white p-4 rounded-xl mt-4">
            <GilroySemiBoldText>Granted Permissions:</GilroySemiBoldText>
            {grantedPermissions.length === 0 ? (
              <GilroyRegularText className="text-gray-500 mt-2">
                No permissions granted yet.
              </GilroyRegularText>
            ) : (
              grantedPermissions.map((p, i) => (
                <GilroyRegularText key={i} className="text-gray-700 mt-1">
                  • {p}
                </GilroyRegularText>
              ))
            )}
          </View>

          {/* ----- DYNAMIC CARDS FOR EACH METRIC ----- */}

          <PermissionCard
            title="Steps"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={`${steps} steps`}
          />

          <PermissionCard
            title="Distance"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={distance}
          />

          <PermissionCard
            title="Speed"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={speed}
          />

          <PermissionCard
            title="Hydration"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={hydration}
          />

          <PermissionCard
            title="Heart Rate"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={heartRate}
          />

          <PermissionCard
            title="Blood Pressure"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={bloodPressure}
          />

          <PermissionCard
            title="Active Calories"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={activeCalories}
          />

          <PermissionCard
            title="Total Calories Burned"
            selectedDate={selectedDate}
            onPrev={goToPreviousDay}
            onNext={goToNextDay}
            value={totalCalories}
          />

          {/* Footer */}
          <View className="items-center py-6 w-full">
            <GilroyBoldText className="text-sm text-gray-500">
              NutriFit360
            </GilroyBoldText>
            <GilroySemiBoldText className="text-xs text-gray-400 mt-1">
              Your complete fitness companion app.
            </GilroySemiBoldText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HealthConnect;
