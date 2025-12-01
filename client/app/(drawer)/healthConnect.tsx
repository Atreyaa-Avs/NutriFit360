import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
} from "@/components/Fonts";

import HealthConnectSvg from "@/assets/svgs/Health_Connect.svg";
import ExchangeSvg from "@/assets/svgs/arrow-down-up.svg";
import LogoSvg from "@/assets/svgs/logo/trans-logo-health.svg";

import {
  initHealthConnect,
  checkHealthConnectAvailability,
  askHealthPermissions,
  fetchGrantedPermissions,
  getStepsForDate,
  getStepsForLastNDays,
} from "@/utils/healthConnect";

const HealthConnect = () => {
  const router = useRouter();
  const theme = useColorScheme();

  const [availability, setAvailability] = useState("");
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [steps, setSteps] = useState(0);
  const [loadingSteps, setLoadingSteps] = useState(false);
  const [last7DaysSteps, setLast7DaysSteps] = useState<
    { date: string; steps: number }[]
  >([]);
  const [loadingLast7Days, setLoadingLast7Days] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(drawer)/(tabs)/home");
  };

  /** ---------- DATE CONTROLS ---------- */
  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);

    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (next > tomorrow) return;

    setSelectedDate(next);
  };

  const goToPreviousDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /** ---------- PERMISSIONS ---------- */
  const handlePermissionRequest = async () => {
    const granted = await askHealthPermissions();
    console.log("PERMISSIONS GRANTED:", granted);
    loadGrantedPermissions();
    loadSteps(); // reload today’s steps after permissions
    loadLast7Days();
  };

  const loadGrantedPermissions = async () => {
    const perms = await fetchGrantedPermissions();
    setGrantedPermissions(perms);
  };

  /** ---------- LOAD STEPS ---------- */
  const loadSteps = async () => {
    setLoadingSteps(true);
    try {
      const total = await getStepsForDate(selectedDate);
      setSteps(total);
    } catch (err) {
      console.log("Error fetching steps →", err);
    }
    setLoadingSteps(false);
  };

  const loadLast7Days = async () => {
    setLoadingLast7Days(true);
    try {
      const data = await getStepsForLastNDays(7);
      setLast7DaysSteps(data);
    } catch (err) {
      console.log("Error loading last 7 days →", err);
    }
    setLoadingLast7Days(false);
  };

  /** ---------- INIT ---------- */
  useEffect(() => {
    const init = async () => {
      await initHealthConnect();
      const av = await checkHealthConnectAvailability();
      setAvailability(av);
      await loadGrantedPermissions();
      await loadSteps();
      await loadLast7Days();
    };
    init();
  }, []);

  /** ---------- REFRESH TODAY'S STEPS ON DATE CHANGE ---------- */
  useEffect(() => {
    loadSteps();
  }, [selectedDate]);

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView className="flex-1 bg-[#E5E5E5]">
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={theme === "dark" ? "#1a1a1a" : "#E5E5E5"}
        />

        {/* Header */}
        <View className="flex-row items-center justify-between p-3 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <GilroyBoldText className="mt-2 text-xl text-gray-900">
            Health Connect
          </GilroyBoldText>
          <View className="w-10" />
        </View>

        <View className="p-4">
          {/* Logos */}
          <View className="items-center flex-1 mt-3">
            <View className="flex-row gap-3">
              <HealthConnectSvg width={64} height={64} />
              <ExchangeSvg width={24} height={64} />
              <LogoSvg width={64} height={64} />
            </View>
            <GilroyBoldText className="my-4 text-3xl">
              Sync with Health Connect
            </GilroyBoldText>
            <GilroyRegularText className="text-sm text-center text-neutral-500">
              Your data, your control. Check what NutriFit360 syncs from Google
              Health Connect.
            </GilroyRegularText>
          </View>

          {/* Sync Button */}
          <View className="items-center flex-1 w-fit">
            <TouchableOpacity
              onPress={handlePermissionRequest}
              className="items-center w-full px-4 py-3 mt-6 bg-gray-300 rounded-xl"
            >
              <GilroyBoldText className="tracking-tight">
                Sync with Health Connect Now
              </GilroyBoldText>
            </TouchableOpacity>
          </View>

          {/* Availability */}
          <View className="p-4 mt-4 bg-white rounded-xl">
            <GilroySemiBoldText>
              Availability:{" "}
              <GilroyRegularText>{availability}</GilroyRegularText>
            </GilroySemiBoldText>
          </View>

          {/* Granted Permissions */}
          <View className="p-4 mt-4 bg-white rounded-xl">
            <GilroySemiBoldText>Granted Permissions:</GilroySemiBoldText>
            {grantedPermissions.length === 0 ? (
              <GilroyRegularText className="mt-2 text-gray-500">
                No permissions granted yet.
              </GilroyRegularText>
            ) : (
              grantedPermissions.map((p, index) => (
                <GilroyRegularText key={index} className="mt-1 text-gray-700">
                  • {p}
                </GilroyRegularText>
              ))
            )}
          </View>

          {/* Steps Section */}
          <View className="p-4 mt-4 bg-gray-300 rounded-xl">
            <View className="flex-row items-center justify-between p-2 bg-white rounded-xl">
              <TouchableOpacity onPress={goToPreviousDay}>
                <Ionicons name="chevron-back" size={28} color="#333" />
              </TouchableOpacity>
              <View className="flex-row items-center gap-1">
                <GilroySemiBoldText className="text-xl">
                  {formatDate(selectedDate).split(" ")[0]}
                </GilroySemiBoldText>
                <GilroyRegularText className="text-base text-gray-500">
                  {formatDate(selectedDate).split(",").slice(1).join(",")}
                </GilroyRegularText>
              </View>
              <TouchableOpacity onPress={goToNextDay}>
                <Ionicons name="chevron-forward" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <HealthStepsSection
              steps={steps}
              loadingSteps={loadingSteps}
              last7DaysSteps={last7DaysSteps}
              loadingLast7Days={loadingLast7Days}
            />
          </View>

          {/* Footer */}
          <View className="items-center w-full mt-24">
            <GilroyBoldText className="text-sm text-gray-500">
              NutriFit360
            </GilroyBoldText>
            <GilroySemiBoldText className="mt-1 text-xs text-gray-400">
              Your complete fitness companion app.
            </GilroySemiBoldText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HealthConnect;

type HealthStepsSectionProps = {
  steps: number;
  loadingSteps: boolean;
  last7DaysSteps: { date: string; steps: number }[];
  loadingLast7Days: boolean;
};

const HealthStepsSection = ({
  steps,
  loadingSteps,
  last7DaysSteps,
  loadingLast7Days,
}: HealthStepsSectionProps) => {
  return (
    <View className="p-4 mt-4 bg-white rounded-xl">
      <GilroySemiBoldText className="mb-2">Steps:</GilroySemiBoldText>

      {loadingSteps ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="flex-col gap-2">
          <GilroyBoldText className="text-3xl text-center">
            {steps} steps
          </GilroyBoldText>

          {/* {loadingLast7Days ? (
            <ActivityIndicator size="small" className="mt-4" />
          ) : (
            last7DaysSteps.length > 0 && (
              <View className="flex-col items-center mt-4">
                <GilroySemiBoldText className="mb-3 text-center">
                  Steps in the Last 7 Days
                </GilroySemiBoldText>

                <View className="p-2 bg-gray-100 rounded-lg">
                  <View className="flex-row justify-between px-1 pb-2 border-b border-gray-300">
                    <GilroySemiBoldText className="flex-1 text-left">
                      Date
                    </GilroySemiBoldText>
                    <GilroySemiBoldText className="flex-1 text-right">
                      Steps
                    </GilroySemiBoldText>
                  </View>

                  {last7DaysSteps.map((entry, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between px-1 py-1 border-b border-gray-200 last:border-b-0"
                    >
                      <GilroyRegularText className="flex-1 text-left">
                        {entry.date}
                      </GilroyRegularText>
                      <GilroyRegularText className="flex-1 text-right">
                        {entry.steps}
                      </GilroyRegularText>
                    </View>
                  ))}
                </View>
              </View>
            )
          )} */}
        </View>
      )}
    </View>
  );
};
