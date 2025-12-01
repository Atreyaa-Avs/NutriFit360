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
      <GilroyBoldText className="mb-2 text-xl">{title}</GilroyBoldText>

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
        {slot.exercises.map((ex: string, idx: number) => (
          <View
            key={idx}
            className="px-3 py-1 mb-2 mr-2 bg-gray-200 rounded-lg"
          >
            <InterFontText className="capitalize">{ex}</InterFontText>
          </View>
        ))}
      </View>
    </View>
  );
};

const AIWorkoutPlannerUI: React.FC<AIPlannerUIProps> = ({
  workoutRecommendation,
}) => {
  const { data, isLoading, isFetching, error, refetch } =
    useAIWorkoutPlan(workoutRecommendation);

  if (isLoading || isFetching) {
    return (
      <View className="flex-row items-center justify-center p-5">
        <View className="flex-row items-center gap-3 p-3 bg-white w-fit rounded-xl">
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
        <Text className="text-center text-red-600">
          Something went wrong. Try again.
        </Text>
        <Text
          className="mt-3 text-center text-blue-600"
          onPress={() => refetch()}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View>
      <GilroyBoldText className="my-4 text-2xl">
        Your Weekly AI Workout Plan
      </GilroyBoldText>

      {Object.entries(data.workoutPlan).map(([dayName, dayData]: any) => (
        <View
          key={dayName}
          className="flex-col gap-2 p-4 mb-6 bg-white rounded-xl"
          style={{ elevation: 3 }}
        >
          <GilroyBoldText className="text-xl">{dayName}</GilroyBoldText>

          <InterFontText>
            <GilroySemiBoldText>Focus:</GilroySemiBoldText> {dayData.focus}
          </InterFontText>

          <InterFontText>
            <GilroySemiBoldText>Summary:</GilroySemiBoldText> {dayData.summary}
          </InterFontText>

          <SlotSection title="Morning" slot={dayData.morning} />
          <SlotSection title="Afternoon" slot={dayData.afternoon} />
          <SlotSection title="Evening" slot={dayData.evening} />
        </View>
      ))}
    </View>
  );
};

export default AIWorkoutPlannerUI;
