import MoonSleepSvg from "@/assets/svgs/home/moonSleep.svg";
import React from "react";
import { Text, View } from "react-native";

const Sleep = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold tracking-tight">Sleep</Text>
        <MoonSleepSvg width={32} height={32} fill="#FFA445" />
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="font-extrabold text-3xl text-[#FFA445]">7.40</Text>
        <Text className="text-base font-semibold text-neutral-400">Hours</Text>
      </View>
    </View>
  );
};

export default Sleep;
