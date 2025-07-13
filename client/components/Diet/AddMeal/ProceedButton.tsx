import ProceedSvg from "@/assets/svgs/diet/proceed.svg";
import React from "react";
import { Text, View } from "react-native";

const ProceedButton = () => {
  return (
    <View
      className="flex-col items-center bg-gray-400 p-3 rounded-xl"
      style={{ elevation: 6 }}
    >
      <ProceedSvg width={24} height={24} />
      <Text>Proceed</Text>
    </View>
  );
};

export default ProceedButton;
