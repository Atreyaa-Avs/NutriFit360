import CaloriesSvg from "@/assets/svgs/home/calories.svg";
import React from "react";
import { Text, View } from "react-native";
import CircleProgressBar from "./CircleProgressBar";

const Calories = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="p-4">
      <View className="flex flex-row justify-between items-center mb-10">
        <Text className="text-xl font-semibold tracking-tight">Calories</Text>
        <CaloriesSvg width={32} height={32} fill="#41B576" />
      </View>
      <View className="items-center pb-8">
        <CircleProgressBar
          showPercentage={false}
          percentage={(145 / 600) * 100}
          color={"#000"}
          start={startAnimation}
          strokeColor="#3CB87F"
          value={345}
          valColor={"text-black"}
          unit={"kcal"}
        />
      </View>
    </View>
  );
};

export default Calories;
