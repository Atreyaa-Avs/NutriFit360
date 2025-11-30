import ActivityRingWorkout from "@/assets/svgs/workout/AcitivityRingCenter.svg";
import RecommendationWorkout from "@/assets/svgs/workout/RecommendWorkout.svg";
import StackCircles from "@/components/Diet/StackCircles";
import { GilroyBoldText, GilroyMediumText, GilroySemiBoldText } from "@/components/Fonts";
import ProgressCalendar from "@/components/Progress/ProgressCalendar";
import ExerciseCard from "@/components/Workout/ExerciseCard";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SparklesSvg from "@/assets/svgs/sparkles.svg";

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
        showsVerticalScrollIndicator={false}
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

        <GilroyMediumText>
          Selected Date: {formatDateToDMY(selectedDate)}
        </GilroyMediumText>

        <View className="my-4">
          <Link href={"/(drawer)/(tabs)/diet/Recommendation"} asChild>
              <Pressable className="flex-row items-center justify-center gap-2 p-4 bg-white/50 rounded-tr-xl rounded-tl-xl">
                <RecommendationWorkout />
                <GilroySemiBoldText className="text-lg text-center tracking-tighter">
                  View Workout Recommendation
                </GilroySemiBoldText>
              </Pressable>
            </Link>
            <View className="flex flex-row justify-center items-center gap-2 bg-black rounded-bl-xl rounded-br-xl">
              <SparklesSvg width={16} height={25} />
              <GilroySemiBoldText className="text-white text-center text-xs">with AI</GilroySemiBoldText>
            </View>
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
              value: 55,
              target: 150,
            },
            {
              label: "Yoga",
              percentage: 40,
              strokeColor: "#2EC4B6",
              value: 70,
              target: 100,
            },
            {
              label: "Stretch",
              percentage: 60,
              strokeColor: "#E71D36",
              value: 30,
              target: 75,
            },
          ]}
          gap={1}
        />

        <View className="mt-6 ml-1">
          <GilroyBoldText className="mb-4 text-3xl tracking-tighter">
            Exercises
          </GilroyBoldText>
          <View className="flex-col gap-4">
            <ExerciseCard
              title="Squats"
              desc="Builds strong legs and glutes, improves core stability, and enhances overall functional movement."
              benefits="strength,power,stability"
            />

            <ExerciseCard
              title="Yoga"
              desc="Enhances flexibility, reduces stress, improves mobility, and promotes mind–body balance."
              benefits="flexibility,calm,balance"
            />

            <ExerciseCard
              title="Deadlifts"
              desc="Strengthens the entire posterior chain, boosts core stability, and improves full-body power."
              benefits="strength,posture,power"
            />

            <ExerciseCard
              title="Bench Presses"
              desc="Develops strong chest, shoulders, and triceps while improving overall upper-body pushing strength."
              benefits="strength,hypertrophy,power"
            />

            <ExerciseCard
              title="Overhead Presses"
              desc="Improves shoulder strength, enhances upper-body stability, and engages the core for balance."
              benefits="strength,stability,posture"
            />

            <ExerciseCard
              title="Brisk Walking"
              desc="Boosts cardiovascular health with low impact, improves daily stamina, and supports fat burning."
              benefits="cardio,endurance,wellbeing"
            />

            <ExerciseCard
              title="Cycling"
              desc="Strengthens leg muscles, increases cardiovascular endurance, and offers a smooth low-impact workout."
              benefits="cardio,endurance,stamina"
            />

            <ExerciseCard
              title="Swimming"
              desc="Provides a full-body workout, increases endurance, and is gentle on joints while improving mobility."
              benefits="cardio,endurance,flexibility"
            />

            <ExerciseCard
              title="Dancing"
              desc="Burns calories, improves coordination, boosts mood, and offers a fun way to stay active."
              benefits="cardio,coordination,energy"
            />

            <ExerciseCard
              title="Walking"
              desc="Supports everyday health, increases mobility, reduces stress, and promotes steady daily movement."
              benefits="health,mobility,wellbeing"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;
