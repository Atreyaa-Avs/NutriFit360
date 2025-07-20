import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  withRepeat,
} from 'react-native-reanimated';

const BAR_COUNT = 12;
const DURATION = 1000;

type SpinnerProps = {
  size?: number;
  color?: string;
};

const Spinner = ({ size = 60, color = 'black' }: SpinnerProps) => {
  const progress = useSharedValue(0);

  const STROKE = 2;
  const BAR_HEIGHT = size * 0.35;

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: DURATION,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size },
      ]}
    >
      {[...Array(BAR_COUNT)].map((_, i) => {
        const angle = (360 / BAR_COUNT) * i;

        const animatedStyle = useAnimatedStyle(() => {
          const delay = i / BAR_COUNT;
          const localProgress = (progress.value + (1 - delay)) % 1;

          const scaleY = interpolate(
            localProgress,
            [0, 0.2, 1],
            [0.6, 1, 0.6]
          );

          const opacity = interpolate(
            localProgress,
            [0, 0.2, 1],
            [0.3, 1, 0.3]
          );

          return {
            transform: [{ scaleY }],
            opacity,
          };
        });

        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: STROKE,
              height: size,
              justifyContent: 'flex-start',
              alignItems: 'center',
              transform: [{ rotate: `${angle}deg` }],
            }}
          >
            <Animated.View
              style={[
                {
                  width: STROKE,
                  height: BAR_HEIGHT,
                  borderRadius: STROKE / 2,
                  backgroundColor: color,
                },
                animatedStyle,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default Spinner;
