import ExerciseSvg from "@/assets/svgs/home/exercise.svg";
import React from "react";
import { Text, View } from "react-native";
import BarsIndicator from "./BarsIndicator";

const Exercise = ({ startAnimation }: { startAnimation: boolean }) => {
  const values = [15, 8, 3, 10, 6, 9, 2, 7, 15, 8, 3, 10, 6, 10,11];
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-xl font-semibold tracking-tight">Exercise</Text>
        <ExerciseSvg width={32} height={32} fill="" />
      </View>
      <View className="items-center pl-16 my-4">
        <BarsIndicator
          values={values}
          width={200}
          height={110}
          barColor="#22AED6"
          barWidth={6}
          spacing={4}
        />
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="font-extrabold text-3xl text-[#22AED6]">3</Text>
        <Text className="text-base font-bold text-neutral-400">Hours</Text>
      </View>
    </View>
  );
};

export default Exercise;
