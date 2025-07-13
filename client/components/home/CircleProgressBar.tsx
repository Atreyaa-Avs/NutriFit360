import React, { JSX, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleProgressBarProps {
  percentage?: number;
  circleWidth?: number;
  strokeColor?: string;
  backgroundStroke?: string;
  strokeWidth?: number;
  content: JSX.Element;
  scale?: number;
  color?: string;
  start?: boolean;
  showPercentage?: boolean;
}

const CircleProgressBar = ({
  percentage = 0,
  circleWidth = 80,
  strokeColor = "#12c2e9",
  backgroundStroke = "#D3D3D4",
  strokeWidth = 6,
  content,
  scale = 1.7,
  color = "#FFF",
  start = false,
  showPercentage = true,
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
          stroke={strokeColor}
          fill="none"
          strokeDasharray={`${dashArray}, ${dashArray}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(90 ${normalizedRadius} ${normalizedRadius})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <View>{content}</View>
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
