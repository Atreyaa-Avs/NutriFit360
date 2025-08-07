import { Drawer } from "expo-router/drawer";
import Header from "@/components/Header";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        overlayColor: "rgba(0,0,0,0.5)",
        drawerStyle: { width: "70%" },
        drawerType: "front",
      }}
      drawerContent={(props) => <Header {...props} />}
    />
  );
}
