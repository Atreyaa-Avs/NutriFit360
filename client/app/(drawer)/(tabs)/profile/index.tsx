import Banner from "@/components/Profile/Banner";
import Details from "@/components/Profile/Details";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView>
      <View className="flex-1 bg-[#E5E5E5] min-h-screen pb-32 -mt-10 px-4 pt-2">
        <Text className="text-3xl font-bold text-center">Profile</Text>
        <Banner />
        <Text className="mt-4 text-3xl font-bold ">Details</Text>
        <Details />
      </View>
    </SafeAreaView>
  );
};

export default profile;
