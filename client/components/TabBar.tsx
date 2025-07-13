import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

// Types

type TabBarProps = BottomTabBarProps & {
  tabMetaMap: Record<
    string,
    { icon: React.FC<SvgProps>; strokeWidth?: number }
  >;
};

type DimensionType = {
  height: number;
  width: number;
};

const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  navigation,
  tabMetaMap,
}) => {
  const [dimensions, setDimensions] = useState<DimensionType>({
    height: 20,
    width: 100,
  });

  const buttonWidth = dimensions.width / state.routes.length;
  const bubbleWidth = 56;
  const bubbleOffset = (buttonWidth - bubbleWidth) / 2;

  const tabPositionX = useSharedValue(buttonWidth * state.index + bubbleOffset);

  const calculateTabX = (idx: number) =>
    buttonWidth * idx +
    bubbleOffset +
    4 * state.routes.length -
    idx * state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const scaleValues = state.routes.map((_, index) =>
    useSharedValue(state.index === index ? 1 : 0)
  );

  useEffect(() => {
    scaleValues.forEach((scale, idx) => {
      scale.value = withSpring(state.index === idx ? 1 : 0, {
        damping: 25,
        stiffness: 100,
      });
    });
  }, [state.index]);

  // useEffect(() => {
  //   tabPositionX.value = withSpring(
  //     buttonWidth * state.index +
  //       bubbleOffset +
  //       4 * state.routes.length -
  //       state.index * state.routes.length
  //   );
  // }, [state.index, buttonWidth]);

  useEffect(() => {
    tabPositionX.value = withSpring(calculateTabX(state.index));
  }, [state.index, buttonWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const primaryColor = "#F09E54";
  const greyColor = "#737373";

  return (
    <View className="mx-4" onLayout={onTabbarLayout}>
      <View
        className="absolute flex-row justify-between flex-1 w-full px-4 py-2 overflow-hidden bg-white rounded-full bottom-8"
        style={styles.shadow}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              backgroundColor: "#e5e5e5",
              borderRadius: 999,
              height: 56,
              width: bubbleWidth,
              top: 8,
              left: -10,
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : (options.title ?? route.name);

          const isFocused = state.index === index;

          const scale = scaleValues[index];

          const animatedIconStyle = useAnimatedStyle(() => {
            const scaleValue = interpolate(
              scale.value,
              [0, 0.5, 1],
              [1, 0.8, 1.2]
            );
            return {
              transform: [{ scale: scaleValue }],
            };
          });

          const onPress = () => {
            tabPositionX.value = withSpring(calculateTabX(index), {
              damping: 12,
              stiffness: 100,
            });

            scale.value = withSpring(1);

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const focusedRoute = route.name.split("/")[0];
          const meta = tabMetaMap[focusedRoute];

          const Icon = meta?.icon;
          const strokeWidth = meta?.strokeWidth ?? 1;

          return (
            <View
              key={route.key}
              className="items-center justify-center flex-1"
            >
              <TouchableOpacity
                style={styles.tabItem}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
              >
                {Icon && (
                  <Animated.View
                    style={[
                      animatedIconStyle,
                      {
                        padding: 12,
                        borderRadius: 999,
                      },
                    ]}
                  >
                    <Icon
                      width={26}
                      height={26}
                      fill={isFocused ? primaryColor : "transparent"}
                      stroke={primaryColor}
                      strokeWidth={!isFocused ? strokeWidth : 1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Animated.View>
                )}
                {!isFocused && (
                  <Text
                    style={{ fontSize: 10 }}
                    className="-mt-3 text-neutral-500"
                  >
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});
