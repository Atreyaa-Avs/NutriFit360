import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { SchedulableTriggerInputTypes } from "expo-notifications";

// Foreground Notification Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type DataCustomObjectType = {
  type: string;
  id: string;
};

interface NotificationProps {
  content: {
    title: string;
    body: string;
    data?: DataCustomObjectType;
    categoryIdentifier?: string; // ⭐ FIXED: correct key
  };
  time?: Date | string | null;
}

interface NotificationCategory {
  id: string;
  actions: {
    buttonTitle: string;
    identifier: string;
    options?: Notifications.NotificationAction["options"];
  }[];
}

/**
 * ⭐ Register categories with Quick Actions
 */
export const registerNotificationCategories = async (
  categories: NotificationCategory[]
) => {
  for (const cat of categories) {
    await Notifications.setNotificationCategoryAsync(
      cat.id,
      cat.actions.map((a) => ({
        identifier: a.identifier,
        buttonTitle: a.buttonTitle,
        options: a.options,
      }))
    );
  }
};

/**
 * ⭐ Send Notification (Immediate or Scheduled)
 */
export const sendNotification = async ({ content, time }: NotificationProps) => {
  // Request permission
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permission not granted");
    return;
  }

  // Android Notification Channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  let trigger: Notifications.CalendarTriggerInput | null = null;

  if (time) {
    const date = typeof time === "string" ? new Date(time) : time;

    if (isNaN(date.getTime())) {
      console.warn("Invalid date for notification trigger");
      return;
    }

    trigger = {
      type: SchedulableTriggerInputTypes.CALENDAR,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      repeats: false,
    };
  }

  await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });
};
