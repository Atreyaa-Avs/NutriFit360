import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router , Href} from "expo-router";

interface AIButtonProps {
  children: React.ReactNode;
  className?: string;
  onPressGoto: Href;
}

const AIButton = ({ className, children, onPressGoto }: AIButtonProps) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className={className}>
      <TouchableOpacity
        activeOpacity={0.85}
        className="relative flex-row items-center justify-center p-1 overflow-hidden bg-white rounded-lg"
        onPress={() => router.navigate(onPressGoto)}
      >
        {/* Rotating Circular Glow */}
        <Animated.View
          className="absolute rounded-full opacity-60"
          style={{
            width: 240,
            height: 240,
            transform: [{ rotate: rotation }],
            top: "50%",
            left: "50%",
            marginLeft: -120,
            marginTop: -120,
          }}
        >
          <LinearGradient
            colors={[
              "#5A8EFF",
              "#A45CFF",
              "#FF5CF4",
              "#FF3F3F",
              "#FFB800",
              "#6CFF4F",
              "#3CFFF5",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 rounded-full"
          />
        </Animated.View>

        {/* Label */}
        <View className="flex-row items-center justify-center gap-3 px-5 py-2 bg-black rounded-lg">
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AIButton;
