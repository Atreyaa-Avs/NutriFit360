import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { GilroyBoldText, GilroySemiBoldText, InterFontText } from "@/components/Fonts";
import { useResponse } from "@/hooks/useResponse";
import { useProfileStore } from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import AIDietPlannerUI from "@/components/Diet/AIDietPlannerUI";

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

const AIDietPlanner = () => {
  const profile = useProfileStore();
  const body = mapProfileToRequestBody(profile);

  const [vegetables, setVegetables] = useState("");
  const [proteinIntake, setProteinIntake] = useState("");
  const [juices, setJuices] = useState("");

  const { data, isLoading, isFetching, error, refetch } = useResponse(
    body,
    "Diet",
    false
  );

  // Extract diet items and store in state
  useEffect(() => {
    if (data?.recommendations?.[0]?.Diet) {
      const dietParts = data.recommendations[0].Diet.split(";");
      setVegetables(dietParts[0]?.split("(")[1]?.slice(0, -1) || "");
      setProteinIntake(dietParts[1]?.split("(")[1]?.slice(0, -1) || "");
      setJuices(dietParts[2]?.split("(")[1]?.slice(0, -1) || "");
    }
  }, [data]);

  if (isLoading || isFetching) {
    return (
      <View className="items-center justify-center flex-1 px-5 bg-white">
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-5">
        <GilroyBoldText className="mb-2 text-2xl">
          Recommended Items
        </GilroyBoldText>
        <View className="flex-col gap-2 my-4">
          <GilroyBoldText className="text-xl">
            Vegetables:{" "}
            <InterFontText className="text-lg">{vegetables}.</InterFontText>
          </GilroyBoldText>
          <GilroyBoldText className="text-xl">
            Protein Intake:{" "}
            <InterFontText className="text-lg">{proteinIntake}.</InterFontText>
          </GilroyBoldText>
          <GilroyBoldText className="text-xl">
            Juices: <InterFontText className="text-lg">{juices}.</InterFontText>
          </GilroyBoldText>
        </View>
        <AIDietPlannerUI dietRecommendation={data?.recommendations?.[0]?.Diet} />
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

export default AIDietPlanner;
