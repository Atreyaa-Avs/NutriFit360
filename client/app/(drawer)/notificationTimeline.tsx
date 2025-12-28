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
import { GilroyBoldText, GilroyRegularText, GilroySemiBoldText } from "@/components/Fonts";
import { useRouter } from "expo-router";
import NotificationTimelineSvg from "@/assets/svgs/notificationTimeline/icon.svg";
import Timeline from "react-native-timeline-flatlist";

const NotificationTimeline = () => {
  const router = useRouter();
  const theme = useColorScheme();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(drawer)/(tabs)/home");
  };

  const data = [
    {
      time: "06:00",
      title: "Wake Up",
      description:
        "Start the day with 300ml warm water + electrolytes. Helps kickstart metabolism and rehydrate after sleep.",
    },
    {
      time: "06:30",
      title: "Morning Mobility Routine",
      description:
        "10-minute light stretching + 5-minute deep breathing to improve circulation and reduce morning stiffness.",
    },
    {
      time: "07:00",
      title: "Balanced Breakfast",
      description:
        "High-protein breakfast: Oats with chia seeds, Greek yogurt, and berries (35g protein). Tracks added to Food Log.",
    },
    {
      time: "08:00",
      title: "Supplement Reminder",
      description:
        "Take Vitamin D3, Omega-3, and Multivitamin. Helps support immunity, bone strength, and energy levels.",
    },
    {
      time: "10:00",
      title: "Mid-Morning Snack",
      description:
        "15 almonds + 1 banana to maintain stable energy and avoid mid-day sugar crashes.",
    },
    {
      time: "12:30",
      title: "Strength Training Session",
      description:
        "45-minute upper-body workout: Bench press, shoulder press, rows, and accessory work. Tracked in Workout Log.",
    },
    {
      time: "13:30",
      title: "Post-Workout Meal",
      description:
        "High-protein lunch with complex carbs: Grilled chicken, quinoa, and steamed veggies. Protein target: 40g.",
    },
    {
      time: "15:30",
      title: "Hydration Reminder",
      description: "Drink 250ml water. Daily hydration goal: 2.8L.",
    },
    {
      time: "16:00",
      title: "Evening Walk",
      description:
        "20-minute brisk walk to boost step count and improve digestion.",
    },
    {
      time: "17:30",
      title: "Healthy Snack",
      description:
        "Smoothie with whey protein, spinach, banana, and flax seeds. Great for muscle recovery.",
    },
    {
      time: "19:30",
      title: "Light Dinner",
      description:
        "Vegetable soup + tofu/stir fry. Low-carb and high-fiber to support fat loss and better sleep.",
    },
    {
      time: "21:00",
      title: "Mindfulness & Journaling",
      description:
        "10 minutes meditation + daily progress review in NutriFit360. Helps track consistency and reduce stress.",
    },
    {
      time: "22:00",
      title: "Sleep Routine",
      description:
        "Prepare for bed: No screens, dim lights + magnesium supplement for deeper sleep.",
    },
  ];

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true} // prevents VirtualizedList warning
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

          <View className="w-10" />
        </View>

        {/* Header Logo & Intro */}
        <View className="p-4">
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

      {/* 🔥 MAIN TIMELINE */}
      <ScrollView>
        <Timeline
          data={data}
          circleSize={20}
          circleColor="#FF5733"
          lineColor="#D1D5DB"
          timeContainerStyle={{ minWidth: 72 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#FF5733",
            color: "white",
            padding: 5,
            borderRadius: 8,
          }}
          titleStyle={{
            fontFamily: "Gilroy-Bold",
            fontSize: 16,
            color: "#111827",
            fontWeight: "normal",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 5,
            paddingLeft: 6,
            paddingTop: 6,
            paddingBottom: 6,
            letterSpacing: -0.4,
          }}
          descriptionStyle={{
            fontFamily: "Inter",
            color: "#6B7280",
            fontSize: 14,
            marginTop: 4,
            paddingLeft: 6,
          }}
          innerCircle={"dot"}
          style={{ margin: 16 }}
        />
      </ScrollView>

      <View className="items-center w-full pt-5 mb-10 border-t border-neutral-200">
        <GilroyBoldText className="text-sm text-gray-500">
          NutriFit360
        </GilroyBoldText>
        <GilroySemiBoldText className="mt-1 text-xs text-gray-400">
          Your complete fitness companion app.
        </GilroySemiBoldText>
      </View>
    </ScrollView>
  );
};

export default NotificationTimeline;
