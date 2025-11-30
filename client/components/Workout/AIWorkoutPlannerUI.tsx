import { View, ActivityIndicator, Text } from "react-native";
import React from "react";
import { GilroyBoldText, GilroySemiBoldText, InterFontText } from "../Fonts";
import { useAIWorkoutPlan } from "@/hooks/useAIWorkoutPlan";

interface AIPlannerUIProps {
  workoutRecommendation: string;
}

interface WorkoutSlot {
  summary: string;
  focus: string;
  duration: string;
  intensity: string;
  calories: number;
  exercises: string[];
}

interface SlotSectionProps {
  title: string;
  slot: WorkoutSlot;
}

const SlotSection: React.FC<SlotSectionProps> = ({ title, slot }) => {
  return (
    <View className="mt-4">
      <GilroyBoldText className="text-xl mb-2">{title}</GilroyBoldText>

      <InterFontText>
        <GilroySemiBoldText>Focus:</GilroySemiBoldText> {slot.focus}
      </InterFontText>

      <InterFontText>
        <GilroySemiBoldText>Summary:</GilroySemiBoldText> {slot.summary}
      </InterFontText>

      <InterFontText>
        <GilroySemiBoldText>Duration:</GilroySemiBoldText> {slot.duration}
      </InterFontText>

      <InterFontText>
        <GilroySemiBoldText>Intensity:</GilroySemiBoldText> {slot.intensity}
      </InterFontText>

      <InterFontText>
        <GilroySemiBoldText>Calories:</GilroySemiBoldText> {slot.calories}
      </InterFontText>

      <GilroySemiBoldText className="mt-2 mb-1">Exercises:</GilroySemiBoldText>
      <View className="flex-row flex-wrap">
        {slot.exercises.map((ex: any, idx: number) => (
          <View
            key={idx}
            className="px-3 py-1 bg-gray-200 rounded-lg mr-2 mb-2"
          >
            <InterFontText className="capitalize">{ex}</InterFontText>
          </View>
        ))}
      </View>
    </View>
  );
};

/* ---------------------------------------------
 * MAIN COMPONENT
 * ------------------------------------------- */
const AIWorkoutPlannerUI: React.FC<AIPlannerUIProps> = ({
  workoutRecommendation,
}) => {
  const { data, isLoading, isFetching, error, refetch } = useAIWorkoutPlan(
    workoutRecommendation
  );

  if (isLoading || isFetching) {
    return (
      <View className="flex-row justify-center items-center p-5">
        <View className="flex-row w-fit items-center bg-white gap-3 p-3 rounded-xl">
          <ActivityIndicator size="small" color="#000" />
          <GilroyBoldText className="text-gray-700">
            Generating AI Plan...
          </GilroyBoldText>
        </View>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="p-5">
        <Text className="text-red-600 text-center">
          Something went wrong. Try again.
        </Text>
        <Text
          className="text-blue-600 text-center mt-3"
          onPress={() => refetch()}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View>
      <GilroyBoldText className="text-2xl my-4">
        Your AI Workout Plan
      </GilroyBoldText>

      {data.days.map((day: any, index: number) => (
        <View
          key={index}
          className="flex-col gap-2 bg-white rounded-xl p-4 mb-6"
          style={{ elevation: 3 }}
        >
          <GilroyBoldText className="text-xl">{day.day}</GilroyBoldText>

          <InterFontText>
            <GilroySemiBoldText>Focus:</GilroySemiBoldText> {day.focus}
          </InterFontText>

          <InterFontText>
            <GilroySemiBoldText>Summary:</GilroySemiBoldText> {day.summary}
          </InterFontText>

          <SlotSection title="Morning" slot={day.morning} />
          <SlotSection title="Afternoon" slot={day.afternoon} />
          <SlotSection title="Evening" slot={day.evening} />
        </View>
      ))}
    </View>
  );
};

export default AIWorkoutPlannerUI;
