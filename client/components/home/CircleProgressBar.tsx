import MedalSvg from "@/assets/svgs/home/medal.svg";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { GilroyRegularText, GilroySemiBoldText } from "../Fonts";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleProgressBarProps {
  percentage?: number;
  circleWidth?: number;
  strokeColor?: string;
  backgroundStroke?: string;
  strokeWidth?: number;
  scale?: number;
  color?: string;
  start?: boolean;
  showPercentage?: boolean;
  value: number | string;
  unit: string;
  valColor?: string;
}

const CircleProgressBar = ({
  percentage = 0,
  circleWidth = 80,
  strokeColor = "#12c2e9",
  backgroundStroke = "#D3D3D4",
  strokeWidth = 6,
  scale = 1.7,
  color = "#FFF",
  start = false,
  showPercentage = true,
  unit,
  value,
  valColor = "text-white",
}: CircleProgressBarProps) => {
  const radius = 30;
  const normalizedRadius = radius + strokeWidth / 2;
  const dashArray = 2 * Math.PI * radius;

  const animatedPercentage = useSharedValue(0);

  useEffect(() => {
    if (start) {
      animatedPercentage.value = withTiming(Math.min(percentage, 100), {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [start, percentage]);

  const animatedProps = useAnimatedProps(() => {
    const dashOffset = dashArray - (dashArray * animatedPercentage.value) / 100;

    return {
      strokeDashoffset: dashOffset,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: circleWidth,
          height: circleWidth,
          transform: [{ scale }],
        },
      ]}
    >
      <Svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${normalizedRadius * 2} ${normalizedRadius * 2}`}
      >
        <Circle
          cx={normalizedRadius}
          cy={normalizedRadius}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={backgroundStroke}
          fill="none"
        />
        <AnimatedCircle
          cx={normalizedRadius}
          cy={normalizedRadius}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={percentage >= 100 ? "#FFD700" : `${strokeColor}`}
          fill="none"
          strokeDasharray={`${dashArray}, ${dashArray}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(90 ${normalizedRadius} ${normalizedRadius})`}
        />
      </Svg>

      <View style={styles.textContainer}>
        <View className="">
          <View className="mx-auto">
            {percentage >= 100 && (
              <MedalSvg color={"#FFD700"} width={12} height={12} />
            )}
          </View>
          <GilroySemiBoldText className={`${valColor} text-sm`}>
            {value}
          </GilroySemiBoldText>
          <GilroyRegularText
            className="text-center text-neutral-400"
            style={{ fontSize: 8 }}
          >
            {unit}
          </GilroyRegularText>
        </View>
        {showPercentage && (
          <Animated.Text
            style={[
              styles.text,
              {
                color,
              },
            ]}
          >
            {percentage}%
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CircleProgressBar;
