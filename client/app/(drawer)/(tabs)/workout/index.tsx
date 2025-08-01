import ActivityRingWorkout from "@/assets/svgs/workout/AcitivityRingCenter.svg";
import RecommendationWorkout from "@/assets/svgs/workout/RecommendWorkout.svg";
import StackCircles from "@/components/Diet/StackCircles";
import WorkoutCalendar from "@/components/Workout/WorkoutCalendar";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
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
    <ScrollView>
      <SafeAreaView className="flex-1 bg-[#E5E5E5] min-h-screen pb-24 -mt-7 px-4">
        <Text className="pb-3 text-4xl font-semibold tracking-tighter">
          Workout Tracker
        </Text>
        <View>
          <WorkoutCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        <Text>Selected Date: {formatDateToDMY(selectedDate)}</Text>

        <View className="flex-row items-center justify-center gap-2 p-4 my-4 bg-white/50 rounded-xl">
          <RecommendationWorkout />
          <Link
            href={"/(drawer)/(tabs)/workout/Recommendation"}
            className="text-lg font-semibold text-center"
          >
            View Workout Recommendation
          </Link>
        </View>

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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Workout;
