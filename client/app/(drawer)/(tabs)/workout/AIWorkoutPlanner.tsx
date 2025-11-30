import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useResponse } from "@/hooks/useResponse";
import { useProfileStore } from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import { GilroyBoldText, GilroySemiBoldText, InterFontText } from "@/components/Fonts";
import AIWorkoutPlannerUI from "@/components/Workout/AIWorkoutPlannerUI";
import { ScrollView } from "react-native-gesture-handler";

const formatItems = (ele: string): string => {
  let formattedItems = ele;

  if (formattedItems.endsWith(".")) {
    formattedItems = formattedItems.slice(0, -1);
  }

  let individualItems = formattedItems.split(",");

  const lastIndex = individualItems.length - 1;
  const lastItem = individualItems[lastIndex]?.trim();

  if (lastItem.startsWith("and")) {
    individualItems[lastIndex] = lastItem.slice(3).trim();
  } else if (lastItem.startsWith("or")) {
    individualItems[lastIndex] = lastItem.slice(2).trim();
  }

  formattedItems = individualItems.join(",");

  return formattedItems;
};

const AIPlanner = () => {
  const profile = useProfileStore();
  const body = mapProfileToRequestBody(profile);

  // Auto-fetch on mount
  const { data, isLoading, isFetching, error, refetch } = useResponse(
    body,
    "Workout",
    false
  );

  if (isLoading || isFetching) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-lg text-gray-700">
          Generating AI Plan...
        </Text>
      </View>
    );
  }

  if (error) {
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-5">
        <GilroyBoldText className="text-2xl mb-2">
          Recommended Exercises
        </GilroyBoldText>
        <View className="flex-row flex-wrap p-2 pb-4 bg-white rounded-lg">
          {formatItems(data?.recommendations?.[0]?.Exercises || "")
            .split(",")
            .map((ele, indx) => (
              <Card key={indx} val={ele} />
            ))}
        </View>
        <AIWorkoutPlannerUI
          workoutRecommendation={data?.recommendations?.[0]?.Exercises || ""}
        />
        
        <View className="items-center w-full pt-4 mb-2">
          <GilroyBoldText className="text-sm text-gray-500">
            NutriFit360
          </GilroyBoldText>
          <GilroySemiBoldText className="mt-1 text-xs text-gray-400">
            Your complete fitness companion app.
          </GilroySemiBoldText>
        </View>
      </View>
    </ScrollView>
  );
};

export default AIPlanner;

type CardProps = {
  val: string;
};

const Card = ({ val }: CardProps) => {
  return (
    <View
      className="flex-1 min-w-[32%] p-3 m-2 bg-[#ccc] rounded-md"
      style={{ elevation: 4 }}
    >
      <InterFontText className="font-medium text-center capitalize">
        {" "}
        {val}{" "}
      </InterFontText>
    </View>
  );
};
