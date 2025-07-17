import { Stack, useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DietLayout() {
  const CustomMealHeader = ({ title }: { title?: string }) => {
    const navigation = useNavigation();

    return (
      <View className={`absolute top-0 left-0 right-0 z-20 ${title ? "px-0" : "px-4 pt-4"} `}>
        <Pressable
          onPress={() => navigation.goBack()}
          className="flex-row items-center gap-4"
        >
          {!title ? (
            <View
              className="items-center justify-center w-16 h-16 rounded-full bg-neutral-500"
              style={{ elevation: 6 }}
            >
              <Text className="text-3xl font-bold text-white">{"<"}</Text>
            </View>
          ) : (
            <View className="absolute top-0 left-0 right-0 z-20 py-4 pl-2 pr-4 bg-gray-400 rounded-xl">
              <Pressable
                onPress={() => navigation.goBack()}
                className="flex-row items-center gap-4"
              >
                <View className="items-center justify-center w-12 h-12 rounded-full bg-neutral-500">
                  <Text className="text-3xl font-bold text-white">{"<"}</Text>
                </View>
                <Text className="text-2xl tracking-tighter">{title}</Text>
              </Pressable>
            </View>
          )}
        </Pressable>
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
      <Stack.Screen
        name="Recommendation"
        options={{
          presentation: "modal",
          header: () => <CustomMealHeader title="Diet Recommendation" />,
        }}
      />
    </Stack>
  );
}
