import WheelPicker from "@quidone/react-native-wheel-picker";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";

const data = [...Array(100).keys()].map((index) => ({
  value: index,
  label: (index + 1).toString(),
}));

const Wheel = () => {
  const [value, setValue] = useState(0);
  const dimensions = useWindowDimensions();
  const screenWidth = Dimensions.get("window").width;

  return (
    <WheelPicker
      style={{ flex:1, marginTop: -50 }}
      data={data}
      value={value}
      onValueChanged={({ item: { value: newValue } }) => {
        // Trigger heavy haptic on each change
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setValue(newValue);
      }}
      enableScrollByTapOnItem={true}
    />
  );
};

export default Wheel;
