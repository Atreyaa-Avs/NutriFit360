import React from "react";
import { Text, View } from "react-native";

const AddMeal = () => {
  return (
    <View>
      <View className="flex-row p-3 bg-white/50 rounded-xl my-4 py-5 items-center justify-center gap-2">
        <Text className="text-primary">{"+"}</Text>
        <Text>Add Meal</Text>
      </View>
    </View>
  );
};

export default AddMeal;
