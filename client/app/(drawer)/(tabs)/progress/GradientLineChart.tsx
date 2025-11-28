import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import colors from "tailwindcss/colors";
import { GilroyBoldText } from "@/components/Fonts";
import StepsSvg from "@/assets/svgs/home/steps.svg";

const GradientLineChart = () => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [50, 80, 40, 95, 85, 55, 90];

  const data = values.map((value, index) => ({
    value,
    label: labels[index],
  }));

  return (
    <View className="w-full p-4 mt-4 bg-white rounded-xl">
      {/* Header */}
      <View className="flex-row items-end justify-between mb-4">
        <GilroyBoldText className="text-3xl">Weekly Steps</GilroyBoldText>

        <View className="flex-col items-center justify-center gap-1 mr-6">
          <StepsSvg width={32} height={32} fill="#736EEA" />

          {/* Progress Bar */}
          <View className="w-[250%] h-2 bg-gray-300 rounded-xl">
            <View
              className={`h-2 ${
                values[0] > 100 ? "bg-amber-500" : "bg-green-500"
              } rounded-xl`}
              style={{ width: `${Math.min(values[0], 100)}%` }}
            />
          </View>
        </View>
      </View>

      {/* Chart */}
      <View
        className="py-4 mt-2 bg-neutral-100 rounded-xl"
        style={{ elevation: 1 }}
      >
        <LineChart
          data={data}
          curved
          thickness={4}
          color={colors.lime[500]}
          // GRADIENT AREA
          areaChart
          startFillColor={colors.lime[400]}
          endFillColor={colors.lime[200]}
          startOpacity={0.8}
          endOpacity={0.1}
          // Show dots
          dataPointsColor={colors.lime[600]}
          dataPointsRadius={3}
          disableScroll
          // Axes styling
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          spacing={40}
          xAxisLabelTextStyle={{
            color: colors.black,
            fontSize: 12,
            fontWeight: "900",
          }}
          yAxisTextStyle={{
            color: colors.gray[400],
            fontSize: 12,
            fontWeight: "500",
          }}
        />
      </View>
    </View>
  );
};

export default GradientLineChart;
