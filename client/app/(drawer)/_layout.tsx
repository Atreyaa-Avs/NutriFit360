import Header from "@/components/Header";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{ headerShown: false, drawerStyle: { width: "70%" } }}
      drawerContent={(props) => <Header {...props} />}
    />
  );
}
