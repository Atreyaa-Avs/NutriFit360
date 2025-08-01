import { Stack, useNavigation } from "expo-router";
import { Platform, Pressable, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DietLayout() {
  const insets = useSafeAreaInsets();

  const CustomMealHeader = ({ title }: { title?: string }) => {
    const navigation = useNavigation();

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#E5E7EB" />
        <View className={`pt-2 ${!title && "pl-2 pt-6"}`}>
          {title ? (
            <View
              className="flex-row items-end -mt-6 gap-4 pb-4 px-2 bg-neutral-400"
              style={{ elevation: 7, paddingTop: insets.top + 40 }}
            >
              <View className="">
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="items-end justify-centerw-10 h-10 rounded-full"
                >
                  <Text
                    className={`text-5xl font-bold text-white ml-2 ${Platform.OS === "android" && "-mt-1"}`}
                  >
                    &lsaquo;
                  </Text>
                </Pressable>
              </View>
              <Text className="text-2xl tracking-tighter font-bold">
                {title}
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={() => navigation.goBack()}
              className="items-center justify-center w-16 h-16 rounded-full bg-neutral-500 mt-14 pr-1"
              style={{ elevation: 6 }}
            >
              <Text className="text-3xl font-bold text-white">{"<"}</Text>
            </Pressable>
          )}
        </View>
      </>
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
          header: () => <CustomMealHeader />,
        }}
      />
      <Stack.Screen
        name="Recommendation"
        options={{
          header: () => <CustomMealHeader title="Diet Recommendation" />,
        }}
      />
      <Stack.Screen
        name="AnalyzeRecipe"
        options={{
          presentation: "modal",
          header: () => <CustomMealHeader title="Analyze Recipe" />,
        }}
      />
    </Stack>
  );
}
