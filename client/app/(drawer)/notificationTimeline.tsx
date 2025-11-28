import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { GilroyBoldText, GilroyRegularText } from "@/components/Fonts"; // adjust path if needed
import { useRouter } from "expo-router";
import NotificationTimelineSvg from "@/assets/svgs/notificationTimeline/icon.svg";

const NotificationTimeline = () => {
  const router = useRouter();
  const theme = useColorScheme();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(drawer)/(tabs)/home");
  };

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
            Notification Timeline
          </GilroyBoldText>

          {/* Placeholder for spacing */}
          <View className="w-10" />
        </View>

        {/* Body Content (Add your timeline or items here) */}
        <View className="p-4">
          {/* Logos */}
          <View className="items-center flex-1 mt-3">
            <View className="flex-row gap-3">
              <NotificationTimelineSvg width={64} height={64} />
            </View>
            <GilroyBoldText className="my-4 text-3xl">
              Notification Timeline
            </GilroyBoldText>
            <GilroyRegularText className="text-sm text-center text-neutral-500">
              View all your scheduled notifications and reminders from
              NutriFit360 in one place.
            </GilroyRegularText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NotificationTimeline;
