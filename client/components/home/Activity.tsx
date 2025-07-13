import CyclingSvg from "@/assets/svgs/home/cycling.svg";
import React from "react";
import { Text, View } from "react-native";

const Activity = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold tracking-tight">Activity</Text>
        <CyclingSvg width={32} height={32} fill="#FF9E59" />
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="font-extrabold text-3xl text-[#FF9E59]">90</Text>
        <Text className="text-base font-semibold text-neutral-400">Minutes</Text>
      </View>
    </View>
  );
};

export default Activity;
