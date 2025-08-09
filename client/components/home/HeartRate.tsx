import HeartSvg from "@/assets/svgs/home/heart.svg";
import React from "react";
import { Text, View } from "react-native";
import BarsIndicator from "./BarsIndicator";
import { CoolJazzText, GilroySemiBoldText } from "../Fonts";

const HeartRate = ({ startAnimation }: { startAnimation: boolean }) => {
  const values = [15, 12, 13, 10, 14, 11, 12, 12, 15, 10, 13, 10, 10, 10, 14];
  return (
    <View className="px-4 pt-4 pb-6 rounded-xl bg-white">
      <View className="flex flex-row justify-between items-center">
        <GilroySemiBoldText className="text-xl tracking-tight">
          Heart
        </GilroySemiBoldText>
        <HeartSvg width={32} height={32} fill="#FF6A5E" />
      </View>
      <View className="items-center pl-16 my-4">
        <BarsIndicator
          values={values}
          width={200}
          height={110}
          barColor="#FF6A5E"
          barWidth={6}
          spacing={4}
        />
      </View>
      <View className="flex-row items-center gap-2">
        <CoolJazzText className="font-extrabold text-3xl text-[#FF6A5E]">
          75
        </CoolJazzText>
        <CoolJazzText className="text-base font-bold text-neutral-400">
          bpm
        </CoolJazzText>
      </View>
    </View>
  );
};

export default HeartRate;
