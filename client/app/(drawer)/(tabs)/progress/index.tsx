import ActivityRingWorkout from "@/assets/svgs/workout/AcitivityRingCenter.svg";
import RecommendationWorkout from "@/assets/svgs/workout/RecommendWorkout.svg";
import StackCircles from "@/components/Diet/StackCircles";
import { GilroyBoldText, GilroyMediumText } from "@/components/Fonts";
import WorkoutCalendar from "@/components/Workout/WorkoutCalendar";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Charts from "./Charts";
import GradientLineChart from "./GradientLineChart";
import MultiLineChart from "./MultiLineChart";

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

const Progress = () => {
  const todayISO = getLocalISODate();
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    // Defer rendering of charts to next frame
    const id = setTimeout(() => setChartsReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 bg-[#E5E5E5] min-h-screen pb-32 pt-4"
    >
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <GilroyBoldText className="pb-3 text-4xl font-semibold tracking-tighter">
          Progress
        </GilroyBoldText>

        <View>
          <WorkoutCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>

        <GilroyMediumText className="mb-4">
          Selected Date: {formatDateToDMY(selectedDate)}
        </GilroyMediumText>

        <StackCircles
          Icon={ActivityRingWorkout}
          title="Metrics"
          start={true}
          scale={0.9}
          unit="min"
          data={[
            {
              label: "Steps",
              percentage: 75,
              strokeColor: "#FF9F1C",
              value: 40,
              target: 500,
            },
            {
              label: "Speed",
              percentage: 40,
              strokeColor: "#2EC4B6",
              value: 40,
              target: 500,
            },
            {
              label: "Calories",
              percentage: 60,
              strokeColor: "#E71D36",
              value: 40,
              target: 500,
            },
          ]}
          gap={1}
        />
        {chartsReady && (
          <>
            <Charts />
            <GradientLineChart />
            <MultiLineChart />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
