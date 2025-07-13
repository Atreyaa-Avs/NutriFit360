import "@/app/globals.css";
import Avatar from "@/assets/svgs/avatar.svg";
import Notify from "@/assets/svgs/notify.svg";
import { sendNotification } from "@/utils/notification";
import {
  Button,
  Image,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
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
    <SafeAreaView className="flex-1 bg-[#E5E5E5]">
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
    </SafeAreaView>
  );
}

const Header = () => {
  const getGreeting: () => string = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return "Good Morning,";
    if (hour >= 12 && hour < 16) return "Good Afternoon,";
    if (hour >= 16 && hour < 23) return "Good Evening,";
    return "Good Night,";
  };

  const greeting: string = getGreeting();

  return (
    <View className="flex-col items-start p-2">
      <View className="flex-row justify-between w-full p-3">
        <View className="aspect-square w-[40px] rounded-full overflow-hidden border-[3px] border-primary bg-gray-200">
          <Avatar
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </View>

        <Notify
          width={20}
          height={30}
          stroke="black"
          fill="#F09E54"
          strokeWidth={30}
        />
      </View>
      <View className="flex-row justify-between w-full mt-3">
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
              className="object-cover h-24 mt-12 rounded-full right-12 w-44"
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
