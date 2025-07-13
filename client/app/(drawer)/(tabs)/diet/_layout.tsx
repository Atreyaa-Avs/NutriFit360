import { Stack, useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function DietLayout() {
  const CustomMealHeader = () => {
    const navigation = useNavigation();

    return (
      <View className="px-4 bg-gray-200 flex-row items-center text-black">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center gap-4"
        >
          <Text className="text-2xl font-bold">{"<"}</Text>
          <Text className="text-2xl">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Meal"
        options={{
          presentation: "modal",
          header: () => <CustomMealHeader />,
        }}
      />
    </Stack>
  );
}
