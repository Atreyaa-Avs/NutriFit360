import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, StatusBar, Dimensions } from "react-native";
import { Canvas, vec } from "@shopify/react-native-skia";

import { Ring } from "@/components/Ring";

const { width, height } = Dimensions.get("window");
const center = vec(width / 2, height / 5);
export const SIZE = 250;
export const strokeWidth = 25;

const color = (r: number, g: number, b: number) =>
  `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

const rings = [
  {
    totalProgress: 6.35,
    colors: [color(0.008, 1, 0.659), color(0, 0.847, 1)],
    background: color(0.016, 0.227, 0.212),
    size: SIZE - strokeWidth * 4,
  },
  {
    totalProgress: 6.1,
    colors: [color(0.008, 0.659, 0.004), color(0.004, 1, 0)],
    background: color(0.016, 0.012, 0.133),
    size: SIZE - strokeWidth * 6,
  },
  {
    totalProgress: 8.2,
    colors: [color(0.008, 0.659, 1), color(0.004, 0.004, 1)],
    background: color(0.016, 0.012, 0.227),
    size: SIZE - strokeWidth * 4,
  },
  {
    totalProgress: 3.5,
    colors: [color(0.847, 1, 0), color(0.6, 1, 0.004)],
    background: color(0.133, 0.2, 0),
    size: SIZE - strokeWidth * 2,
  },
  {
    totalProgress: 2.7,
    colors: [color(0.98, 0.067, 0.31), color(0.976, 0.22, 0.522)],
    background: color(0.196, 0.012, 0.063),
    size: SIZE,
  },
];

export const Rings = () => {
  const [trigger, setTrigger] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // increment trigger so all rings reanimate
      setTrigger((t) => t + 1);
    }, [])
  );

  return (
    <View style={{ height: 400 }}>
      <StatusBar barStyle={"dark-content"} />
      <Canvas style={{ width: 400, height: 500, transform: [{ scale: 0.8 }] }}>
        {rings.map((ring, index) => (
          <Ring
            key={index}
            ring={ring}
            center={center}
            strokeWidth={strokeWidth}
            animateTrigger={trigger}
          />
        ))}
      </Canvas>
    </View>
  );
};
