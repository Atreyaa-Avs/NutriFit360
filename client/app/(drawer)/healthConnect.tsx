import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
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
import LogoSvg from "@/assets/svgs/logo/trans-logo-health.svg";

import {
  initialize,
  getSdkStatus,
  SdkAvailabilityStatus,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from "react-native-health-connect";

type AllowedRecordTypes =
  | "Steps"
  | "Distance"
  | "ActiveCaloriesBurned"
  | "TotalCaloriesBurned"
  | "HeartRate"
  | "SleepSession"
  | "BackgroundAccessPermission"; // must be literal

const HealthConnect = () => {
  const router = useRouter();
  const theme = useColorScheme();

  const [availability, setAvailability] = useState<string>("");
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [steps, setSteps] = useState<number>(0);
  const [loadingSteps, setLoadingSteps] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(drawer)/(tabs)/home");
    }
  };

  // Prevent showing future dates
  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (next > today) return; // prevent moving into future
    setSelectedDate(next);
  };

  const goToPreviousDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const formatDate = (date: Date) => date.toDateString();

  // Request permissions
  //   const requestPermissions = async () => {
  //     const permissions = [
  //       {
  //         accessType: "read",
  //         recordType: "Steps",
  //       },
  //       {
  //         accessType: "read",
  //         recordType: "Distance",
  //       },
  //       {
  //         accessType: "read",
  //         recordType: "ActiveCaloriesBurned",
  //       },
  //       {
  //         accessType: "read",
  //         recordType: "TotalCaloriesBurned",
  //       },
  //       {
  //         accessType: "read",
  //         recordType: "HeartRate",
  //       },
  //       {
  //         accessType: "read",
  //         recordType: "Hydration",
  //       },
  //     ];

  //     const granted = await requestPermission(permissions);

  //     console.log("Granted permissions:", granted);
  //   };
  const requestPermissions = () => {
    requestPermission([
      {
        accessType: "read",
        recordType: "Steps",
      },
      {
        accessType: "read",
        recordType: "Distance",
      },
      {
        accessType: "read",
        recordType: "ActiveCaloriesBurned",
      },
      {
        accessType: "read",
        recordType: "TotalCaloriesBurned",
      },
      {
        accessType: "read",
        recordType: "HeartRate",
      },
      {
        accessType: "read",
        recordType: "Hydration",
      },
    ]).then((permissions) => {
      console.log("Granted permissions ", { permissions });
      checkGrantedPermissions();
    }).catch((err) => {
      console.log("Error requesting permissions:", err);
    });
  };

  // Get granted permissions
  const checkGrantedPermissions = async () => {
    const permissions = await getGrantedPermissions();
    setGrantedPermissions(permissions.map((p) => p.recordType));
  };

  // Fetch steps for chosen date
  const fetchStepsForDate = async () => {
    setLoadingSteps(true);

    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const stepsResult = await readRecords("Steps", {
        timeRangeFilter: {
          operator: "between",
          startTime: startOfDay.toISOString(),
          endTime: endOfDay.toISOString(),
        },
      });

      let total = 0;
      const records = Array.isArray((stepsResult as any).records)
        ? (stepsResult as any).records
        : [];

      records.forEach((record: any) => {
        total += record.count ?? 0;
      });

      setSteps(total);
    } catch (err) {
      console.log("Error reading steps:", err);
    } finally {
      setLoadingSteps(false);
    }
  };

  // Initial checks
  useEffect(() => {
    const checkAvailability = async () => {
      const status = await getSdkStatus();

      if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
        setAvailability("Available");
      } else if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
        setAvailability("Not Installed");
      } else {
        setAvailability("Update Required");
      }
    };

    const initializeHealthConnect = async () => {
      const isInitialized = await initialize();
      console.log({ isInitialized });
    };

    checkAvailability();
    checkGrantedPermissions();
    initializeHealthConnect();
  }, []);

  // Fetch steps when date changes
  useEffect(() => {
    fetchStepsForDate();
  }, [selectedDate]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          <GilroyBoldText className="text-xl text-gray-900 mt-2">
            Health Connect
          </GilroyBoldText>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 p-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logos */}
          <View className="flex-1 items-center mt-3">
            <View className="flex-row gap-3">
              <HealthConnectSvg width={64} height={64} />
              <ExchangeSvg width={24} height={64} />
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
          <View className="flex-1 items-center w-fit">
            <TouchableOpacity
              onPress={requestPermissions}
              className="bg-gray-300 mt-6 px-4 py-3 rounded-xl w-full items-center"
            >
              <GilroyBoldText className="tracking-tight">
                Sync with Health Connect Now
              </GilroyBoldText>
            </TouchableOpacity>
          </View>

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
              grantedPermissions.map((p, index) => (
                <GilroyRegularText key={index} className="text-gray-700 mt-1">
                  • {p}
                </GilroyRegularText>
              ))
            )}
          </View>

          {/* Steps */}
          <View className="bg-white p-4 rounded-xl mt-4">
            <GilroySemiBoldText className="mb-2">Steps</GilroySemiBoldText>

            {/* Date Navigation */}
            <View className="flex-row justify-between items-center mb-3">
              <TouchableOpacity onPress={goToPreviousDay}>
                <Ionicons name="chevron-back" size={28} color="#333" />
              </TouchableOpacity>

              <GilroyRegularText className="text-base">
                {formatDate(selectedDate)}
              </GilroyRegularText>

              <TouchableOpacity onPress={goToNextDay}>
                <Ionicons name="chevron-forward" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Steps Count */}
            {loadingSteps ? (
              <ActivityIndicator size="large" />
            ) : (
              <GilroyBoldText className="text-3xl text-center">
                {steps} steps
              </GilroyBoldText>
            )}
          </View>

          {/* App Info */}
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
