import ActivityRingWorkout from "@/assets/svgs/workout/AcitivityRingCenter.svg";
import RecommendationWorkout from "@/assets/svgs/workout/RecommendWorkout.svg";
import StackCircles from "@/components/Diet/StackCircles";
import { GilroyBoldText, GilroyMediumText } from "@/components/Fonts";
import ProgressCalendar from "@/components/Progress/ProgressCalendar";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDateToDMY = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
};

const getLocalISODate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Workout = () => {
  const todayISO = getLocalISODate();
  const [selectedDate, setSelectedDate] = useState(todayISO);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 bg-[#E5E5E5] min-h-screen pb-32 pt-4"
    >
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <GilroyBoldText className="pb-3 text-4xl font-semibold tracking-tighter">
          Workout Tracker
        </GilroyBoldText>

        <View>
          <ProgressCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>

        <GilroyMediumText>Selected Date: {formatDateToDMY(selectedDate)}</GilroyMediumText>

        <Link href={"/(drawer)/(tabs)/workout/Recommendation"} asChild>
          <Pressable className="my-4 bg-white/50 rounded-xl p-4 flex-row items-center justify-center gap-2">
            <RecommendationWorkout />
            <GilroyMediumText className="text-lg font-semibold text-center">
              View Workout Recommendation
            </GilroyMediumText>
          </Pressable>
        </Link>

        <StackCircles
          Icon={ActivityRingWorkout}
          title="Exercise"
          start={true}
          scale={0.9}
          unit="min"
          data={[
            {
              label: "Cardio",
              percentage: 75,
              strokeColor: "#FF9F1C",
              value: 40,
              target: 500,
            },
            {
              label: "Yoga",
              percentage: 40,
              strokeColor: "#2EC4B6",
              value: 40,
              target: 500,
            },
            {
              label: "Stretch",
              percentage: 60,
              strokeColor: "#E71D36",
              value: 40,
              target: 500,
            },
          ]}
          gap={1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;
