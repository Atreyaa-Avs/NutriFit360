import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import colors from "tailwindcss/colors";
import { GilroyBoldText } from "@/components/Fonts";

const MultiAxisLineChart = () => {
  const line1 = [
    { value: 50, label: "Mon" },
    { value: 80, label: "Tue" },
    { value: 40, label: "Wed" },
    { value: 95, label: "Thu" },
    { value: 85, label: "Fri" },
    { value: 55, label: "Sat" },
    { value: 90, label: "Sun" },
  ]; // Left axis

  const line2 = [
    { value: 7000, label: "Mon" },
    { value: 6000, label: "Tue" },
    { value: 8000, label: "Wed" },
    { value: 7500, label: "Thu" },
    { value: 9500, label: "Fri" },
    { value: 6500, label: "Sat" },
    { value: 10000, label: "Sun" },
  ]; // Right axis (larger scale)

  // Normalize line2 values to line1 scale for overlay
  const maxLine1 = Math.max(...line1.map((d) => d.value));
  const maxLine2 = Math.max(...line2.map((d) => d.value));
  const normalizedLine2 = line2.map((d) => ({
    value: (d.value / maxLine2) * maxLine1,
    label: d.label,
  }));

  const chartDataSets = [
    {
      data: line1,
      color: colors.lime[500],
      startFillColor: colors.lime[400],
      endFillColor: colors.lime[200],
      startOpacity: 0.3,
      endOpacity: 0.05,
    },
    {
      data: normalizedLine2,
      color: colors.blue[400],
      startFillColor: colors.blue[300],
      endFillColor: colors.blue[100],
      startOpacity: 0.3,
      endOpacity: 0.05,
    },
  ];

  return (
    <View className="w-full p-4 mt-4 bg-white rounded-xl">
      {/* Header */}
      <View className="flex-row items-end justify-between py-3 mb-1">
        <GilroyBoldText className="text-2xl tracking-tighter">
          Weekly Steps & Distance
        </GilroyBoldText>
      </View>

      {/* Chart */}
      <View className="py-4 bg-neutral-100 rounded-xl" style={{ elevation: 1 }}>
        <LineChart
          dataSet={chartDataSets}
          curved
          spacing={40}
          yAxisThickness={0}
          dashGap={10}
          xAxisThickness={0}
          hideRules
          scrollRef={null}
          yAxisTextStyle={{
            color: colors.gray[400],
            fontSize: 12,
            fontWeight: "500",
          }}
          xAxisLabelTextStyle={{
            color: colors.black,
            fontSize: 12,
            fontWeight: "900",
          }}
        />
      </View>
    </View>
  );
};

export default MultiAxisLineChart;
