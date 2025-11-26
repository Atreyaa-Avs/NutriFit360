import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text as RNText,
  TextProps,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { ShareIntentProvider, useShareIntentContext } from "expo-share-intent";
import * as FileSystem from "expo-file-system/legacy";
import { GilroySemiBoldText } from "@/components/Fonts";


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
  const router = useRouter();
  const { hasShareIntent, shareIntent } = useShareIntentContext();

  const [processingShare, setProcessingShare] = useState(false);

  useEffect(() => {
    if (!hasShareIntent) return;
    if (!shareIntent?.files?.length) return;

    const processShared = async () => {
      try {
        setProcessingShare(true);

        const sharedFile = shareIntent.files![0];
        const filePath = sharedFile.path;

        if (!filePath) return;

        const base64 = await FileSystem.readAsStringAsync(filePath, {
          encoding: "base64",
        });

        router.push(
          `/(drawer)/(tabs)/diet/AnalyzeRecipe?imageBase64=${encodeURIComponent(base64)}`
        );
      } catch (e) {
        console.error("Failed to process share intent:", e);
      } finally {
        setProcessingShare(false);
      }
    };

    processShared();
  }, [hasShareIntent]);

  return (
    <>
      {/* Small Loading Overlay */}
      {processingShare && (
        <View
          className="flex-row"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.15)", // light dim
            zIndex: 999,
          }}
        >
          <View className="flex-row items-center gap-2 p-4 bg-white rounded-xl">
            <ActivityIndicator size="large" color="#f09e54" />
            <GilroySemiBoldText className="mt-1 text-sm text-black">
              Processing Image..
            </GilroySemiBoldText>
          </View>
        </View>
      )}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </>
  );
}
