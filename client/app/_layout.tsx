import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text as RNText, TextProps } from "react-native";
import { ShareIntentProvider, useShareIntentContext } from "expo-share-intent";
import * as FileSystem from "expo-file-system";

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
    return null;
  }

  // Custom Text component to apply default font
  const AppText: React.FC<TextProps> = (props) => (
    <RNText
      {...props}
      style={[props.style, { fontFamily: "Gilroy-Regular" }]}
    />
  );

  return (
    <ShareIntentProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <InnerNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ShareIntentProvider>
  );
}

// Hook inside the provider
function InnerNavigator() {
  const { hasShareIntent, shareIntent } = useShareIntentContext();
  const router = useRouter();

  useEffect(() => {
    if (!hasShareIntent || !shareIntent?.files?.length) return;

    const processShare = async () => {
      try {
        // get the first shared file (expo-share-intent exposes files[])
        const file = shareIntent?.files?.[0] as any;
        const path = file?.uri ?? file?.path ?? file?.filePath ?? file?.url;

        if (!path) return;

        // Convert file to base64
        const base64 = await FileSystem.readAsStringAsync(path, {
          encoding: "base64",
        });

        // Navigate & send image
        router.push(
          `/(drawer)/(tabs)/diet/AnalyzeRecipe?imageBase64=${encodeURIComponent(
            base64
          )}`
        );
      } catch (err) {
        console.error("ShareIntent base64 conversion failed:", err);
      }
    };

    processShare();
  }, [hasShareIntent]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}
