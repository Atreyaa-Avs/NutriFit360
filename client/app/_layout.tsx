import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text as RNText,
  TextProps,
  View,
  ActivityIndicator,
} from "react-native";
import { ShareIntentProvider, useShareIntentContext } from "expo-share-intent";
import * as FileSystem from "expo-file-system/legacy";
import { GilroySemiBoldText } from "@/components/Fonts";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import * as SplashScreen from "expo-splash-screen";

import {
  createNotificationChannel,
  registerNotificationCategories,
  requestNotificationPermissions,
} from "@/utils/notification";

import * as QuickActions from "expo-quick-actions";
import { useQuickActionRouting } from "expo-quick-actions/router";
import { scheduleFullDailyRoutine } from "@/utils/dailyRoutine";
import { useMMKVBoolean } from "react-native-mmkv";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [scheduled, setScheduled] = useMMKVBoolean("notifications_scheduled_v2");

  // -----------------------------
  // Load Fonts
  // -----------------------------
  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Gilroy-Regular": require("@/assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Bold": require("@/assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-SemiBold": require("@/assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("@/assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-UltraLight": require("@/assets/fonts/Gilroy-UltraLight.ttf"),
    "Cool-Jazz": require("@/assets/fonts/CoolJazz.ttf"),
    Inter: require("@/assets/fonts/Inter.ttf"),
  });

  useQuickActionRouting();

  // -----------------------------
  // 1. Schedule Daily Routine Once
  // -----------------------------
  useEffect(() => {
    if (!scheduled) {
      (async () => {
        try {
          const success = await scheduleFullDailyRoutine();
          if (success) {
            console.log("Daily routine notifications scheduled");
            setScheduled(true);
          } else {
            console.log(
              "Failed to schedule notifications (permissions likely denied)"
            );
          }
        } catch (e) {
          console.error("Error scheduling notifications:", e);
        }
      })();
    }
  }, [scheduled]);

  // -----------------------------
  // 2. Quick Actions
  // -----------------------------
  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Diet",
        subtitle: "Log a meal",
        icon: "diet_icon",
        id: "0",
        params: { href: "/(drawer)/(tabs)/diet" },
      },
      {
        title: "Workout",
        subtitle: "Go to Workout",
        icon: "workout_icon",
        id: "1",
        params: { href: "/(drawer)/(tabs)/workout" },
      },
      {
        title: "Progress",
        subtitle: "Go to Progress",
        icon: "progress_icon",
        id: "2",
        params: { href: "/(drawer)/(tabs)/progress" },
      },
      {
        title: "Notification Timeline",
        subtitle: "View notifications",
        icon: "notification_icon",
        id: "3",
        params: { href: "/(drawer)/notificationTimeline" },
      },
    ]);
  }, []);

  // -----------------------------
  // 3. Setup Notifications
  // -----------------------------
  useEffect(() => {
    requestNotificationPermissions();
    createNotificationChannel();
    registerNotificationCategories([
      {
        id: "water_reminder",
        actions: [
          { identifier: "DONE", buttonTitle: "Done" },
          {
            identifier: "SNOOZE",
            buttonTitle: "Snooze",
            options: { opensAppToForeground: false },
          },
          { identifier: "DISMISS", buttonTitle: "Dismiss" },
        ],
      },
      {
        id: "daily_routine",
        actions: [
          {
            identifier: "DONE",
            buttonTitle: "Done",
            options: { opensAppToForeground: true },
          } as any,
          {
            identifier: "DO_LATER",
            buttonTitle: "Do Later",
            options: { opensAppToForeground: true },
          },
          {
            identifier: "MUTE",
            buttonTitle: "Mute",
            options: { opensAppToForeground: false },
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    registerNotificationCategories([
      {
        id: "water_reminder",
        actions: [
          { identifier: "DONE", buttonTitle: "Done" },
          {
            identifier: "SNOOZE",
            buttonTitle: "Snooze",
            options: { opensAppToForeground: false },
          }as any,
          { identifier: "DISMISS", buttonTitle: "Dismiss" },
        ],
      },
    ]);
  }, []);

  // -----------------------------
  // 4. Splash screen handling
  // -----------------------------
  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(async () => {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }, 2500);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !appReady) {
    return <AnimatedSplashScreen />;
  }

  const AppText: React.FC<TextProps> = (props) => (
    <RNText {...props} style={[props.style, { fontFamily: "Gilroy-Regular" }]} />
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

// INNER NAVIGATOR

function InnerNavigator() {
  const router = useRouter();
  const { hasShareIntent, shareIntent } = useShareIntentContext();
  const [processingShare, setProcessingShare] = useState(false);

  // Handle incoming share intents
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
          `/(drawer)/(tabs)/diet/AnalyzeRecipe?imageBase64=${encodeURIComponent(
            base64
          )}`
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
    <View style={{ flex: 1, backgroundColor: "#FAD5A5" }}>
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
            backgroundColor: "rgba(0,0,0,0.15)",
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
    </View>
  );
}
