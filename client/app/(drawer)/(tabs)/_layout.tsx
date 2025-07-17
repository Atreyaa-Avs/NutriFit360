// import Exercise from "@/assets/svgs/tabs/exercise.svg";
// import Food from "@/assets/svgs/tabs/food.svg";
// import Home from "@/assets/svgs/tabs/home.svg";
// import Profile from "@/assets/svgs/tabs/profile.svg";
// import Progress from "@/assets/svgs/tabs/progress.svg";
// import TabBar from "@/components/TabBar";
// import { Tabs } from "expo-router";
// import React from "react";
// import { SvgProps } from "react-native-svg";

// interface TabConfig {
//   name: string;
//   title: string;
//   icon: React.FC<SvgProps>;
//   strokeWidth?: number;
// }

// const tabs: TabConfig[] = [
//   { name: "index", title: "Home", icon: Home },
//   { name: "diet", title: "Diet", icon: Food, strokeWidth: 6 },
//   { name: "workout", title: "Workout", icon: Exercise, strokeWidth: 16 },
//   { name: "progress", title: "Progress", icon: Progress, strokeWidth: 16 },
//   { name: "profile", title: "Profile", icon: Profile },
// ];

// const tabMetaMap: Record<
//   string,
//   { icon: React.FC<SvgProps>; strokeWidth?: number }
// > = tabs.reduce(
//   (acc, { name, icon, strokeWidth }) => {
//     acc[name] = { icon, strokeWidth };
//     return acc;
//   },
//   {} as Record<string, { icon: React.FC<SvgProps>; strokeWidth?: number }>
// );

// const _layout: React.FC = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={(props) => <TabBar {...props} tabMetaMap={tabMetaMap} />}
//     >
//       {tabs.map(({ name, title }) => (
//         <Tabs.Screen
//           key={name}
//           name={name}
//           options={{
//             headerShown: false,
//             title,
//           }}
//         />
//       ))}
//     </Tabs>
//   );
// };

// export default _layout;

import TabBar from "@/components/TabBar";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

import Avatar from "@/assets/svgs/avatar.svg";
import Menu from "@/assets/svgs/drawer/menu.svg";
import Logo from "@/assets/svgs/logo/trans-logo2.svg";
import Notify from "@/assets/svgs/notify.svg";
import Exercise from "@/assets/svgs/tabs/exercise.svg";
import Food from "@/assets/svgs/tabs/food.svg";
import Home from "@/assets/svgs/tabs/home.svg";
import Profile from "@/assets/svgs/tabs/profile.svg";
import Progress from "@/assets/svgs/tabs/progress.svg";

interface TabConfig {
  name: string; // folder name: "home", "diet", etc.
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

  return (
    <>
      <SafeAreaView className="flex-row items-center justify-between w-full px-5 pt-4 pb-1 bg-gray-200">
        <View className="flex-row items-center justify-between gap-2">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Menu height={30} width={30} fill="#F09E54" />
          </TouchableOpacity>
          <View className="aspect-square w-[40px] rounded-full overflow-hidden border-[3px] border-primary bg-gray-200">
            <Avatar
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </View>
        </View>

        <View className="mr-10">
          <Logo width={40} height={40} />
        </View>

        <Notify
          width={24}
          height={24}
          stroke="black"
          fill="#F09E54"
          strokeWidth={1}
        />
      </SafeAreaView>

      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} tabMetaMap={tabMetaMap} />}
      >
        {tabs.map(({ name, title }) => (
          <Tabs.Screen key={name} name={name} options={{ title }} />
        ))}
      </Tabs>
    </>
  );
}
