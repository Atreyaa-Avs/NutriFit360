import ViewSvg from "@/assets/svgs/diet/view.svg";
import { GilroyMediumText } from "@/components/Fonts";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ViewMeal = () => {
  return (
    <View>
      <Pressable onPress={() => alert("Pressed!")}>
        <View className="flex-row p-3 bg-white/50 rounded-xl my-4 py-5 items-center justify-center gap-2">
          <ViewSvg width={24} height={24} />
          <GilroyMediumText>View Meals</GilroyMediumText>
        </View>
      </Pressable>
    </View>
  );
};

export default ViewMeal;
