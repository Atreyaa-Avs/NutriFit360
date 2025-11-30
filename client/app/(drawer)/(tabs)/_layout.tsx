import TabBar from "@/components/TabBar";
import {
  DrawerActions,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

import Menu from "@/assets/svgs/drawer/menu.svg";
import Notify from "@/assets/svgs/notify.svg";
import Exercise from "@/assets/svgs/tabs/exercise.svg";
import Food from "@/assets/svgs/tabs/food.svg";
import Home from "@/assets/svgs/tabs/home.svg";
import Profile from "@/assets/svgs/tabs/profile.svg";
import Progress from "@/assets/svgs/tabs/progress.svg";
import HeaderLogo from "@/assets/svgs/Header_Logo.svg";
import { getFocusedRouteName } from "@/utils/getFocusedRouteName";

interface TabConfig {
  name: string;
  title: string;
  icon: React.FC<SvgProps>;
  strokeWidth?: number;
}

const tabs: TabConfig[] = [
  { name: "home/index", title: "Home", icon: Home },
  { name: "diet", title: "Diet", icon: Food, strokeWidth: 5 },
  { name: "workout", title: "Workout", icon: Exercise, strokeWidth: 20 },
  { name: "progress", title: "Progress", icon: Progress, strokeWidth: 20 },
  { name: "profile", title: "Profile", icon: Profile },
];

const tabMetaMap = tabs.reduce(
  (acc, { name, icon, strokeWidth }) => {
    const key = name.split("/")[0];
    acc[key] = { icon, strokeWidth };
    return acc;
  },
  {} as Record<string, { icon: React.FC<SvgProps>; strokeWidth?: number }>
);

export default function TabsLayout() {
  const navigation = useNavigation();
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const state = useNavigationState((state) => state);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!state) return;

    const currentRouteName = getFocusedRouteName(state);

    const hidePattern = /Meal|Recommendation|AnalyzeRecipe|\[exercise\]|\[RecipeHome\]/;

    const shouldHide = hidePattern.test(currentRouteName);

    setTabBarVisible(!shouldHide); // Show tab bar when not matching
  }, [state]);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Gilroy-Regular": require("@/assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Bold": require("@/assets/fonts/Gilroy-Bold.ttf"),
  });

  return (
    <>
      {tabBarVisible && (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#E5E7EB" />
          <View
            className={`flex-row items-center justify-between w-full px-5 bg-gray-200 pb-3`}
            style={{ paddingTop: insets.top + 20 }}
          >
            <View className="flex-row items-center justify-between gap-2">
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Menu height={30} width={30} fill="#F09E54" />
              </TouchableOpacity>
              {/* <View className="aspect-square w-[40px] rounded-full overflow-hidden border-[3px] border-primary bg-gray-200">
                <Avatar
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </View> */}
              <View className="flex-row mr-5">
                {/* <Text
                  className="text-2xl mr-[1.5px]"
                  style={{ fontFamily: "Gilroy-Bold" }}
                >
                  NutriFit
                </Text>
                <Text
                  className="text-2xl text-primary"
                  style={{ fontFamily: "Gilroy-Regular" }}
                >
                  360
                </Text> */}
                <HeaderLogo width={120} height={40} />
              </View>
            </View>

            {/* <View className="mr-10">
              <Logo width={40} height={40} />
            </View> */}

            <Notify
              width={24}
              height={24}
              stroke="black"
              fill="#F09E54"
              strokeWidth={1}
            />
          </View>
        </>
      )}

      <Tabs
        screenOptions={{
          headerShown: false,
          lazy: false,
        }}
        tabBar={(props) =>
          tabBarVisible ? (
            <TabBar
              {...props}
              tabMetaMap={tabMetaMap}
              isTabBarVisible={tabBarVisible}
            />
          ) : null
        }
      >
        {tabs.map(({ name, title }) => (
          <Tabs.Screen key={name} name={name} options={{ title }} />
        ))}
      </Tabs>
    </>
  );
}
