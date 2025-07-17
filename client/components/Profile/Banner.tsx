import Avatar from "@/assets/svgs/avatar.svg";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const Banner = () => {
  return (
    <View className="mt-3">
      {/* Banner Background */}
      <ImageBackground
        source={require("@/assets/images/profile/profilebanner.jpg")}
        style={{ width: "100%", height: 230 }}
        imageStyle={{ borderRadius: 16 }}
        className="pb-4"
      >
        <View className="flex-row items-center justify-between h-full pr-2">
          {/* Avatar Section with Purple Background */}
          <View className="bg-[#736EEA] h-full justify-center rounded-tl-2xl px-2">
            <View className="w-[80px] h-[80px] rounded-full overflow-hidden border-[3px] border-primary/90 bg-gray-200">
              <Avatar
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </View>
          </View>

          <View className="flex-1 pt-4 pb-3 pl-4 text-black rounded-2xl">
            <Text className="px-2 text-3xl font-bold">
              Atreyaa Subramanya AVS
            </Text>
            <Text className="px-2 font-medium text-md">
              atreyaaavs@gmail.com
            </Text>

            {/* User Stats */}
            <View className="flex-wrap items-center justify-center flex-1 gap-5 p-2 px-4 mt-4 bg-gray-300 rounded-xl">
              <View>
                <Text>Ht: 1.6m</Text>
                <Text>Wt: 68kg</Text>
                <Text>Age: 19, M</Text>
                <Text>BMI: 26.0</Text>
              </View>
              <View>
                <Text>DOB: 11/11/2005</Text>
                <Text>Blood: O+ve</Text>
                <Text>Activity: Active</Text>
                {/* <Text>📍 BLR, India</Text> */}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View
        className="bg-[#736EEA] h-10 w-full -mt-5 rounded-b-xl"
        style={{ elevation: 4 }}
      />
    </View>
  );
};

export default Banner;
