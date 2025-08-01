import "@/app/globals.css";
import Stats from "@/components/home/Stats";
import { sendNotification } from "@/utils/notification";
import {
  Button,
  Image,
  Platform,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useColorScheme();

  const showNotificationNow = async () => {
    await sendNotification({
      content: {
        title: "💧 Stay Hydrated!, Atreyaa",
        body: "Drink a glass of water now.",
      },
    });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="never">
      <SafeAreaView
        className={`flex-1 bg-[#E5E5E5] min-h-screen ${Platform.OS === "ios" ? "pb-16" : "pb-24"}`}
      >
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={theme === "dark" ? "#1a1a1a" : "#E5E5E5"}
        />
        <Header />
        <View className="p-4">
          <Text className="mb-2 text-xl font-semibold">Today's Summary</Text>
          <View className="p-4 mb-4 bg-white shadow-md rounded-xl">
            <Text className="text-base">• You've burned 300 kcal</Text>
            <Text className="text-base">• Completed 40% of your workout</Text>
          </View>
          <Button
            title="Show Hydration Alert Now"
            onPress={showNotificationNow}
          />
        </View>

        <Stats />
      </SafeAreaView>
    </ScrollView>
  );
}

const Header = () => {
  const getGreeting: () => string = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return "Good Morning,";
    if (hour >= 12 && hour < 15) return "Good Afternoon,";
    if (hour >= 15 && hour < 23) return "Good Evening,";
    return "Good Night,";
  };

  const greeting: string = getGreeting();

  return (
    <View className="flex-col items-start p-2 -mt-10">
      <View className="flex-row justify-between w-full">
        {/* <Image
          source={require("@/assets/images/home/greeting-bg.jpg")}
          className="absolute top-0 left-0 w-full h-full rounded-xl z-[-1] brightness-0"
          resizeMode="cover"
          blurRadius={4}
        /> */}
        <View>
          <Text className="pl-3 text-4xl font-bold">{greeting}</Text>
          <Text className="pl-3 text-4xl font-bold">Atreyaa!</Text>
          {greeting === "Good Morning," && (
            <Text className="pt-2 pl-3 text-xl font-semibold text-neutral-500">
              Fuel your body{"\n"} and own the day! 💪
            </Text>
          )}

          {greeting === "Good Afternoon," && (
            <Text className="pt-2 pl-3 text-xl font-semibold text-neutral-500">
              Keep going,your goals {"\n"}are in reach! 🥗
            </Text>
          )}

          {greeting === "Good Evening," && (
            <Text className="pt-2 pl-3 text-xl font-semibold text-neutral-500">
              Evening grind!{"\n"}Let's get that sweat on. 🔥
            </Text>
          )}

          {greeting === "Good Night," && (
            <Text className="pt-2 pl-3 text-xl font-semibold text-neutral-500">
              Rest well, recovery is{"\n"}just as important! 🛌
            </Text>
          )}
        </View>

        {greeting === "Good Morning," && (
          <View className="relative w-full mr-6">
            <Image
              source={require("@/assets/images/greetings/morning.jpg")}
              className="object-cover h-24 mr-12 rounded-full mt-7 w-44"
            />
          </View>
        )}
        {greeting === "Good Afternoon," && (
          <View className="relative w-full mr-6">
            <Image
              source={require("@/assets/images/greetings/afternoon.jpg")}
              className="object-cover h-24 mt-14 rounded-full right-10 w-44"
            />
          </View>
        )}
        {greeting === "Good Evening," && (
          <View className="relative w-full mr-6 -left-4">
            <Image
              source={require("@/assets/images/greetings/evening2.jpg")}
              className="object-cover h-24 mr-12 rounded-full mt-7 w-44"
            />
          </View>
        )}
        {greeting === "Good Night," && (
          <View className="relative w-full mr-6 -top-2 left-4">
            <Image
              source={require("@/assets/images/greetings/night.jpg")}
              className="object-cover h-24 mr-12 rounded-full mt-7 w-44"
            />
          </View>
        )}
      </View>
    </View>
  );
};
