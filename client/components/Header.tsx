import Logo from "@/assets/svgs/logo/trans-logo2.svg";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/assets/svgs/avatar.svg";

export default function Header(props: DrawerContentComponentProps) {
  const { state, navigation, descriptors, ...rest } = props;

  // Filter out unwanted routes
  const filteredRoutes = state.routes.filter(
    (route) => route.name !== "(tabs)"
  );

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
      default:
        return "ellipse-outline";
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-between">
        {/* Top content */}
        <View>
          {/* Header */}
          <View className="flex-row items-center justify-between py-2 mt-2">
            {/* Left side: Logo */}
            <View className="flex-row items-end space-x-2">
              <Logo height={64} width={64} />
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
              <Text className="font-bold text-2xl">Atreyaa AVS</Text>
              <Text className="text-neutral-400 text-sm">atreyaaavs@gmail.com</Text>
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
                  descriptors[route.key]?.options?.drawerLabel ?? route.name
                }
                focused={isFocused}
                onPress={() => navigation.navigate(route.name)}
                icon={({ size, color }) => (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={isDanger ? "#dc2626" : color}
                  />
                )}
                labelStyle={{
                  fontSize: 14,
                  textTransform: "capitalize",
                  color: isDanger ? "#dc2626" : "#1f2937",
                }}
                style={isDanger ? { backgroundColor: "#fee2e2" } : {}}
              />
            );
          })}
        </View>

        {/* Bottom Footer */}
        <View className="pb-2">
          <Text className="text-center text-base text-neutral-500">v1.0.0</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
