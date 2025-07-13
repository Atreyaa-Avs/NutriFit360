import CameraSvg from "@/assets/svgs/diet/camera.svg";
import React from "react";
import { View } from "react-native";

const CameraButton = () => {
  return (
    <View className="bg-primary p-2 rounded-full" style={{ elevation: 12 }}>
      <View className="flex-col items-center bg-gray-400 p-6 rounded-full">
        <CameraSvg width={32} height={32} />
      </View>
    </View>
  );
};

export default CameraButton;
