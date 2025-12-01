import StepsSvg from "@/assets/svgs/home/steps.svg";
import React from "react";
import { View } from "react-native";
import CircleProgressBar from "./CircleProgressBar";
import { GilroySemiBoldText } from "../Fonts";
import { useTodaySteps } from "@/hooks/useTodaySteps";

function formatToIndianNumberSystem(number: number | bigint): string {
  return new Intl.NumberFormat("en-IN").format(number);
}

const Steps = ({ startAnimation }: { startAnimation: boolean }) => {
  const { steps, loading } = useTodaySteps(true);

  const GOAL = 5000;
  const percentage = loading ? 0 : Math.min((steps / GOAL) * 100, 100);

  return (
    <View className="px-4 pt-4 pb-8 bg-[#736EEA] rounded-xl">
      <View className="flex flex-row items-center justify-between mb-12">
        <GilroySemiBoldText className="text-xl font-semibold tracking-tight text-white">
          Walk
        </GilroySemiBoldText>
        <StepsSvg width={32} height={32} fill="#fff" />
      </View>

      <View className="items-center pb-8">
        <CircleProgressBar
          showPercentage={false}
          percentage={percentage}
          color={"#000"}
          start={!loading && startAnimation}
          strokeColor="#fff"
          value={
            loading ? "..." : formatToIndianNumberSystem(steps)
          }
          unit={"Steps"}
        />
      </View>
    </View>
  );
};

export default Steps;
