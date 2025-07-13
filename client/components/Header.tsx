import Logo from "@/assets/svgs/logo/trans-logo2.svg";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";

export default function Header(props: DrawerContentComponentProps) {
  const { state, ...rest } = props;

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

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-row items-end justify-between p-2 mt-2">
        <View className="flex-row items-end space-x-2">
          <Logo height={54} width={54} />
          <Text className="pb-2 text-3xl font-bold text-primary">360</Text>
        </View>
        <Text className="self-end pb-1 text-base text-neutral-500">v1.0.0</Text>
      </View>

      <DrawerItemList {...rest} state={newState} />
    </DrawerContentScrollView>
  );
}
