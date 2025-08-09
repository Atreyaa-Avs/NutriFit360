import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Gilroy-Regular": require("@/assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Bold": require("@/assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-SemiBold": require("@/assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("@/assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-UltraLight": require("@/assets/fonts/Gilroy-UltraLight.ttf"),
    "Cool-Jazz": require("@/assets/fonts/CoolJazz.ttf"),
  });

  useEffect(() => {
    let isMounted = true;
    if (fontsLoaded && isMounted) {
      SplashScreen.hideAsync();
    }
    return () => {
      isMounted = false;
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Keep showing the splash until fonts are ready
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(drawer)" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
