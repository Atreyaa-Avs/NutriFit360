import Avatar from "@/assets/svgs/avatar.svg";
import ExerciseSvg from "@/assets/svgs/home/exercise.svg";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import StepsSvg from "@/assets/svgs/home/steps.svg";
import HeartSvg from "@/assets/svgs/home/heart.svg";
import { GilroyBoldText, GilroyMediumText, GilroyRegularText } from "../Fonts";

const Banner = () => {
  return (
    <View className="mt-3">
      <ImageBackground
        source={require("@/assets/images/profile/profilebanner.jpg")}
        style={{ width: "100%", height: 230 }}
        imageStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        className="pb-4"
      >
        <View className="flex-row items-center justify-between h-full pr-2">
          <View className="justify-center h-full px-2 rounded-tl-2xl">
            <View className="w-[80px] h-[80px] rounded-full overflow-hidden border-[3px] border-primary/90 bg-gray-200">
              <Avatar
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </View>
          </View>

          <View className="flex-1 pt-4 pb-3 pl-4 text-black rounded-2xl">
            <GilroyBoldText className="px-2 text-3xl">
              Atreyaa Subramanya AVS
            </GilroyBoldText>
            <GilroyMediumText className="px-2 text-md">
              atreyaaavs@gmail.com
            </GilroyMediumText>

            {/* User Stats */}
            <View className="flex-wrap items-center justify-center flex-1 gap-5 p-2 px-4 mt-4 bg-gray-300 rounded-xl">
              <View className="flex-col gap-1">
                <GilroyRegularText>Ht: 1.6m</GilroyRegularText>
                <GilroyRegularText>Wt: 68kg</GilroyRegularText>
                <GilroyRegularText>Age: 19, M</GilroyRegularText>
                <GilroyRegularText>BMI: 26.0</GilroyRegularText>
              </View>
              <View>
                <GilroyRegularText>DOB: 11/11/2005</GilroyRegularText>
                <GilroyRegularText>Blood: O+ve</GilroyRegularText>
                <GilroyRegularText>Activity: Active</GilroyRegularText>
                {/* <Text>📍 BLR, India</Text> */}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View
        className="flex-row items-center justify-center w-full h-20 gap-12 bg-white/50 rounded-b-xl"
        style={{ elevation: 4 }}
      >
        <StepsSvg width={38} height={38} fill="#736EEA" />
        <HeartSvg width={38} height={38} fill="#FF6A5E" />
        <ExerciseSvg width={38} height={38} fill="" />
      </View>
    </View>
  );
};

export default Banner;
