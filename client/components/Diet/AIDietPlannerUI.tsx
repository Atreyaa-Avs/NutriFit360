import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { GilroyBoldText, GilroySemiBoldText, InterFontText } from "../Fonts";
import { useAIDietPlan } from "@/hooks/useAIDietPlan";

interface AIDietPlannerUIProps {
  dietRecommendation: string;
}

const AIDietPlannerUI = ({ dietRecommendation }: AIDietPlannerUIProps) => {
  const { data, isLoading, isFetching, error, refetch } =
    useAIDietPlan(dietRecommendation);

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
        Your AI Diet Plan
      </GilroyBoldText>

      {Object.entries(data.dietPlan).map(([dayName, dayObj]: any) => (
        <View
          key={dayName}
          className="flex-col gap-4 p-4 mb-6 bg-white rounded-xl"
        >
          {/* Day Header */}
          <GilroyBoldText className="text-xl">{dayName}</GilroyBoldText>

          {/* Meals */}
          {Object.entries(dayObj.meals).map(([mealName, mealData]: any) => (
            <View key={mealName} className="mt-2">
              <GilroyBoldText className="text-xl">{mealName}</GilroyBoldText>

              <GilroySemiBoldText className="mt-3 text-gray-700">
                {mealData.description}
              </GilroySemiBoldText>

              {/* Items */}
              <View className="mt-4">
                <GilroySemiBoldText className="mb-1 text-lg">Items:</GilroySemiBoldText>

                {mealData.items.map((item: string, idx: number) => (
                  <GilroyBoldText key={idx} className="mb-1">
                    {idx + 1}. <InterFontText>{item}</InterFontText>
                  </GilroyBoldText>
                ))}
              </View>

              {/* Dishes */}
              {mealData.dishes && mealData.dishes.length > 0 && (
                <View className="mt-4">
                  <GilroySemiBoldText className="mb-1 text-lg">
                    Dishes you can prepare:
                  </GilroySemiBoldText>

                  {mealData.dishes.map((dish: string, idx: number) => (
                    <GilroyBoldText key={idx} className="mb-1">
                      <InterFontText>{dish}</InterFontText>
                    </GilroyBoldText>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default AIDietPlannerUI;
