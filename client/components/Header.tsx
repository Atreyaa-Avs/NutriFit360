import Logo from "@/assets/svgs/Header_Logo.svg";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/svgs/avatar.svg";
import { GilroyBoldText, GilroyMediumText, GilroySemiBoldText } from "./Fonts";
import HealthConnectSvg from "@/assets/svgs/Health_Connect.svg";
import NotificationTimelineSvg from "@/assets/svgs/notificationTimeline/icon.svg";

export default function Header(props: DrawerContentComponentProps) {
  const { state, navigation, descriptors, ...rest } = props;

  // Filter out unwanted routes
  const filteredRoutes = state.routes.filter(
    (route) => route.name !== "(tabs)"
  );

  const drawerLabels: Record<string, string> = {
  home: "Home",
  settings: "Settings",
  healthConnect: "Health Connect",
  notificationTimeline: "Notification Timeline",
};

  // Reconstruct the navigation state safely
  const newState = {
    ...state,
    routes: filteredRoutes,
    routeNames: filteredRoutes.map((route) => route.name),
    index: Math.min(state.index, filteredRoutes.length - 1),
  };

  // Icon mappings
  const getIconForRoute = (routeName: string) => {
    switch (routeName) {
      case "home":
        return "home-outline";
      case "settings":
        return "settings-outline";
      case "logout":
        return "log-out-outline";
      case "healthConnect":
        return "HEALTH_SVG"; // custom flag
      case "notificationTimeline":
        return "NOTIFICATION_SVG"
      default:
        return "home-outline";
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="justify-between flex-1">
        {/* Top content */}
        <View>
          {/* Header */}
          <View className="flex-row items-center justify-between py-2 mt-2">
            {/* Left side: Logo */}
            <View className="flex-row items-end w-32 pl-1 space-x-2">
              <Logo height={64} width={128} />
            </View>

            {/* Right side: Notification and Settings icons */}
            <View className="flex-row items-center gap-3 px-6 space-x-4">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#1f2937"
              />
              <Ionicons name="settings-outline" size={24} color="#1f2937" />
            </View>
          </View>

          {/* Profile Info */}
          <View className="flex-row items-center justify-between px-4 pb-4">
            <View>
              <GilroyBoldText className="text-2xl">Atreyaa AVS</GilroyBoldText>
              <GilroyMediumText className="text-sm text-neutral-400">
                atreyaaavs@gmail.com
              </GilroyMediumText>
            </View>
            <View className="w-[50px] h-[50px] rounded-full overflow-hidden border-[3px] border-primary/90 bg-gray-200">
              <Avatar
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </View>
          </View>

          {/* Drawer Items */}
          {newState.routes.map((route, index) => {
            const isFocused = newState.index === index;
            const isDanger = route.name === "Logout";
            const iconName = getIconForRoute(route.name);
            return (
              <DrawerItem
                key={route.key}
                label={
                  drawerLabels[route.name] ?? route.name
                }
                focused={isFocused}
                onPress={() => navigation.navigate(route.name)}
                icon={({ size, color }) => {
                  const label =
                    descriptors[route.key]?.options?.drawerLabel ?? route.name;
                  const iconName = getIconForRoute(route.name);

                  if (iconName === "HEALTH_SVG") {
                    return <HealthConnectSvg width={size} height={size} />;
                  }
                  if (iconName === "NOTIFICATION_SVG") {
                    return <NotificationTimelineSvg width={size} height={size} />;
                  }
                  return (
                    <Ionicons
                      name={iconName}
                      size={size}
                      color={isDanger ? "#dc2626" : color}
                    />
                  );
                }}
                labelStyle={{
                  fontSize: 14,
                  textTransform: "capitalize",
                  fontFamily: "Gilroy-Bold",
                  color: isDanger ? "#dc2626" : "#1f2937",
                }}
                style={isDanger ? { backgroundColor: "#fee2e2" } : {}}
              />
            );
          })}
        </View>

        {/* Bottom Footer */}
        <View className="pb-2">
          <GilroySemiBoldText className="text-base text-center text-neutral-500">
            v0.1.0
          </GilroySemiBoldText>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
