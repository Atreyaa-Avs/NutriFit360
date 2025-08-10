import MoonSleepSvg from "@/assets/svgs/home/moonSleep.svg";
import React from "react";
import { Text, View } from "react-native";
import { CoolJazzText, GilroySemiBoldText } from "../Fonts";

const Sleep = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center mb-4">
        <GilroySemiBoldText className="text-xl font-semibold tracking-tight">
          Sleep
        </GilroySemiBoldText>
        <MoonSleepSvg width={32} height={32} fill="#FFA445" />
      </View>
      <View className="flex-row items-end gap-2">
        <CoolJazzText className="text-3xl text-[#FFA445]">7.50</CoolJazzText>
        <CoolJazzText className="text-base text-neutral-400">Hours</CoolJazzText>
      </View>
    </View>
  );
};

export default Sleep;
