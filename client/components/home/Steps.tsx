import StepsSvg from "@/assets/svgs/home/steps.svg";
import React from "react";
import { Text, View } from "react-native";
import CircleProgressBar from "./CircleProgressBar";

function formatToIndianNumberSystem(number: number | bigint): string {
  return new Intl.NumberFormat("en-IN").format(number);
}

const Calories = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="px-4 pt-4 pb-8 bg-[#736EEA] rounded-xl">
      <View className="flex flex-row justify-between items-center mb-12">
        <Text className="text-xl font-semibold tracking-tight text-white">
          Walk
        </Text>
        <StepsSvg width={32} height={32} fill="#fff" />
      </View>
      <View className="items-center pb-8">
        <CircleProgressBar
          showPercentage={false}
          percentage={(5000 / 5000) * 100}
          color={"#000"}
          start={startAnimation}
          strokeColor="#fff"
          value={formatToIndianNumberSystem(4112)}
          unit={"Steps"}
        />
      </View>
    </View>
  );
};

export default Calories;
