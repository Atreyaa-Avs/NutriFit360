import { useProfileStore } from "@/store/useProfileStore";
import React from "react";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FoodSvg from "@/assets/svgs/tabs/food.svg";
import CheckAPIStatus from "@/components/api/CheckAPIStatus";
import FetchDietRecommendation from "@/components/Diet/FetchDietRecommendation";

const DietRecommendation = () => {
  const {
    age,
    bmi,
    height,
    weight,
    gender,
    hypertension,
    diabetes,
    fitnessLevel,
    fitnessGoal,
    fitnessType,
  } = useProfileStore();

  const screenWidth = Dimensions.get("window").width;
  const snapWidth = screenWidth * 0.48 + 115;

  return (
    <ScrollView contentContainerStyle={{ marginTop: -40 }}>
      <SafeAreaView className="min-h-screen p-4 pb-28">
        <View className={`${Platform.OS === "android" ? "mt-4" : "mt-10"}`}>
          <View className="flex-row items-center gap-2 mb-4 mx-auto">
            <FoodSvg
              width={24}
              height={24}
              fill={"none"}
              stroke={"#000"}
              strokeWidth={6}
            />
            <Text className="text-2xl font-semibold underline">Details:</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            snapToInterval={snapWidth}
            decelerationRate="fast"
          >
            <View className="flex-row items-start pb-4 -ml-3">
              {[
                { title: "Age", value: age, unit: "years" },
                { title: "BMI", value: bmi, unit: "kg/m²" },
                { title: "Height", value: height, unit: "m" },
                { title: "Weight", value: weight, unit: "kg" },
                { title: "Gender", value: gender },
                {
                  title: "Hypertension",
                  value: hypertension === "yes" ? "Yes" : "No",
                },
                { title: "Diabetes", value: diabetes === "yes" ? "Yes" : "No" },
                { title: "Fitness Level", value: fitnessLevel },
                { title: "Fitness Goal", value: fitnessGoal },
                { title: "Fitness Type", value: fitnessType },
              ].map((card, index) => (
                <View key={index} className={"w-[22rem] -mr-44"}>
                  <Card {...card} isLast={index === 9} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <CheckAPIStatus />

        <FetchDietRecommendation />
      </SafeAreaView>
    </ScrollView>
  );
};

type CardProps = {
  title: string;
  value: number | string;
  unit?: string;
  isLast?: boolean;
};

const Card = ({ title, value, unit, isLast }: CardProps) => {
  return (
    <View
      className={`w-[48%] py-3 px-1 bg-white rounded-xl ${isLast && "w-[54%]"}`}
      style={{ elevation: 6 }}
    >
      <View className="flex-col items-center gap-1 pt-1 pl-2">
        <Text className="text-xl font-bold">{title}:</Text>
        <View className="flex-row gap-2">
          <Text
            className={`text-2xl ${unit && "underline"} ${!unit && "text-lg"} ${
              typeof value === "string" ? "capitalize" : ""
            }`}
          >
            {value}
          </Text>
          <Text className="text-xl">{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default DietRecommendation;
