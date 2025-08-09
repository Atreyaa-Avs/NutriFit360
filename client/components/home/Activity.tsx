import CyclingSvg from "@/assets/svgs/home/cycling.svg";
import React from "react";
import { Text, View } from "react-native";
import { CoolJazzText, GilroySemiBoldText } from "../Fonts";

const Activity = ({ startAnimation }: { startAnimation: boolean }) => {
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center mb-4">
        <GilroySemiBoldText className="text-xl font-semibold tracking-tight">
          Activity
        </GilroySemiBoldText>
        <CyclingSvg width={32} height={32} fill="#FF9E59" />
      </View>
      <View className="flex-row items-center gap-2">
        <CoolJazzText className="text-3xl text-[#FF9E59]">
          90
        </CoolJazzText>
        <CoolJazzText className="text-base text-neutral-400">
          Minutes
        </CoolJazzText>
      </View>
    </View>
  );
};

export default Activity;
