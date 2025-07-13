import React, { useEffect, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Rect } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type Props = {
  percentage: number;
  height?: number;
  color?: string;
};

const AnimatedBar = ({ percentage, height = 15, color = "#4CAF50" }: Props) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const animatedProps = useAnimatedProps(() => ({
    width: interpolate(progress.value, [0, 100], [0, containerWidth]),
  }));

  return (
    <View onLayout={onLayout}>
      {containerWidth > 0 && (
        <Svg width={containerWidth} height={height}>
          <Rect x="0" y="0" width={containerWidth} height={height} fill="#E0E0E0" rx={5} />
          <AnimatedRect
            x="0"
            y="0"
            height={height}
            rx={5}
            fill={color}
            animatedProps={animatedProps}
          />
        </Svg>
      )}
    </View>
  );
};

export default AnimatedBar;
