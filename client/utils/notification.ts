import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// FOREGROUND HANDLER

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//REQUEST PERMISSIONS

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

// CREATE ANDROID CHANNEL
export const createNotificationChannel = async () => {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("daily_routine", {
    name: "Daily Routine",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
  });
};

export const registerNotificationCategories = async (
  categories: { id: string; actions: { identifier: string; buttonTitle: string }[] }[]
) => {
  for (const cat of categories) {
    await Notifications.setNotificationCategoryAsync(
      cat.id,
      cat.actions.map((a) => ({
        identifier: a.identifier,
        buttonTitle: a.buttonTitle,
      }))
    );
  }
};

export const sendImmediateNotification = async ({
  title,
  body,
  data,
  categoryIdentifier,
}: {
  title: string;
  body: string;
  data?: any;
  categoryIdentifier?: string;
}) => {
  if (!(await requestNotificationPermissions())) return;

  await createNotificationChannel();

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      categoryIdentifier,
      channelId: "daily_routine",
    }as any,
    trigger: null, // immediate
  });
};

export const scheduleDailyNotification = async ({
  hour,
  minute,
  title,
  body,
  data,
  categoryIdentifier = "daily_routine",
}: {
  hour: number;
  minute: number;
  title: string;
  body: string;
  data?: any;
  categoryIdentifier?: string;
}) => {
  if (!(await requestNotificationPermissions())) return;

  await createNotificationChannel();

  const trigger = {
    hour,
    minute,
    repeats: true,
  } as any;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      categoryIdentifier,
      channelId: "daily_routine",
    } as any,
    trigger,
  });
};
