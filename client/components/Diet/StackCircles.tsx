import ActivtyRingCenter from "@/assets/svgs/diet/ActivityRingCenter.svg";
import Checkbox from "@/assets/svgs/diet/Checkbox.svg";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingData = {
  label: string;
  percentage: number;
  strokeColor: string;
  value?: number;
  target?: number;
};

interface ActivityRingsProps {
  data: RingData[];
  circleWidth?: number;
  strokeWidth?: number;
  gap?: number;
  start?: boolean;
  scale?: number;
}

const StackCircles = ({
  data,
  circleWidth = 200,
  strokeWidth = 10,
  gap = 12,
  start = false,
  scale = 1,
}: ActivityRingsProps) => {
  const baseRadius = 30;

  // Create persistent shared values for each ring
  const animatedValues = data.map(() => useSharedValue(0));

  useEffect(() => {
    if (start) {
      reversedData.forEach((ring, index) => {
        animatedValues[index].value = withTiming(
          Math.min(ring.percentage, 100),
          {
            duration: 1000 + index * 200,
            easing: Easing.out(Easing.exp),
          }
        );
      });
    }
  }, [start, data]);

  const reversedData = [...data].reverse();

  const rings = reversedData.map((ring, index) => {
    const radius = baseRadius + index * (strokeWidth + gap);
    const dashArray = 2 * Math.PI * radius;

    const animatedProps = useAnimatedProps(() => {
      const dashOffset =
        dashArray - (dashArray * animatedValues[index].value) / 100;
      return {
        strokeDashoffset: dashOffset,
      };
    });

    return {
      ...ring,
      radius,
      dashArray,
      animatedProps,
    };
  });

  const outermostRadius = baseRadius + (data.length - 1) * (strokeWidth + gap);
  const viewBoxSize = outermostRadius * 2 + strokeWidth;

  return (
    <View className="flex-row-reverse justify-between w-full bg-white p-4 rounded-lg">
      <View
        style={[
          styles.container,
          { width: circleWidth, height: circleWidth, transform: [{ scale }] },
        ]}
        className="mt-20 -mr-4"
      >
        <Svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          {rings.map((ring, i) => (
            <React.Fragment key={i}>
              <Circle
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={ring.radius}
                strokeWidth={strokeWidth}
                stroke="#eee"
                fill="none"
              />
              <AnimatedCircle
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={ring.radius}
                strokeWidth={strokeWidth}
                stroke={ring.strokeColor || "#ccc"}
                fill="none"
                strokeDasharray={`${ring.dashArray}, ${ring.dashArray}`}
                animatedProps={ring.animatedProps}
                strokeLinecap="round"
                transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
              />
            </React.Fragment>
          ))}
        </Svg>
        <View style={styles.centerText}>
          <ActivtyRingCenter width={40} height={40} />
        </View>
      </View>

      <View>
        <Text className="font-extrabold text-3xl mt-1 underline">
          Nutrition
        </Text>
        <View className="flex my-auto mt-5">
          {/* {data.map((ring, i) => (
            <View className="py-1" key={i}>
              <View className="flex-col bg-neutral-300 px-4 py-1 rounded-xl">
                <View className="flex-row items-center pt-2">
                  <View
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: ring.strokeColor }}
                  />
                  <Text className="font-semibold">
                    {ring.label}: {ring.percentage}%
                  </Text>
                </View>
                <View className="ml-5 my-2">
                  <Text>
                    <Text className="font-extrabold text-3xl">{ring.value ?? 0}</Text>
                    <Text className="text-neutral-500"> / {ring.target ?? 0}g</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))} */}
          {data.map((ring, i) => (
            <View key={i}>
              <InfoComponent
                title={ring.label}
                percentage={ring.percentage}
                value={ring.value ?? 0}
                strokeColor={ring.strokeColor}
                target={ring.target ?? 0}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

interface StackComponentProps {
  title: string;
  value: number;
  target: number;
  strokeColor: string;
  percentage: number;
}

const InfoComponent = ({
  title,
  percentage,
  value,
  target,
  strokeColor,
}: StackComponentProps) => {
  return (
    <View className="flex-col my-1 p-2 px-4 rounded-xl bg-gray-300">
      <View className="flex-row">
        <View className="flex-row gap-2 items-center pb-2">
          <View
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: strokeColor }}
          ></View>
          <Text className="font-semibold text-base">{title}:</Text>
          <Text>{percentage}%</Text>
        </View>
      </View>
      <View
        className={`flex-row ${percentage == 100 ? "justify-between" : "justify-end"} items-center`}
      >
        {percentage === 100 && (
          <View className="pl-2">
            <Checkbox width={16} height={16} stroke={"#32CD32"} />
          </View>
        )}
        <Text>
          <Text className="font-extrabold text-2xl">{value ?? 0}</Text>
          <Text className="text-neutral-500"> / {target ?? 0}g</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
  },
});

export default StackCircles;
