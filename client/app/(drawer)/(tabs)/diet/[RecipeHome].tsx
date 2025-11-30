import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { GilroyBoldText } from "@/components/Fonts";

const RecipeHome = () => {
  const { Title, YoutubeId } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-white p-4">
      {/* Title */}
      <GilroyBoldText className="text-xl mb-2">Recipe Name:</GilroyBoldText>
      <View className="bg-neutral-200 p-4 rounded-xl" style={{ elevation: 4 }}>
        <GilroyBoldText className="text-2xl text-center">
          {Title}
        </GilroyBoldText>
      </View>

      {/* Center Container */}
      <View className="flex-1 justify-center items-center -mt-32">
        <GilroyBoldText className="text-xl underline mb-2">
          Video:
        </GilroyBoldText>
        <View className="w-full h-56 rounded-xl overflow-hidden">
          <YoutubePlayer height={224} play={true} videoId={String(YoutubeId)} />
        </View>
      </View>
    </View>
  );
};

export default RecipeHome;
