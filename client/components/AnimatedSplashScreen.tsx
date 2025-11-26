import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AnimatedSplashScreen = () => {
  return (
    <View className="items-center justify-center flex-1 w-screen bg-black">
      <LottieView
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
          transform: [{ scale: 1.5 }]
        }}
        source={require("@/assets/lottie/NutriFit2.json")}
      />
    </View>
  );
};

export default AnimatedSplashScreen;
