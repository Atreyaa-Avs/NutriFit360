import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { SchedulableTriggerInputTypes } from "expo-notifications";

// Foreground notification handler
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
  };
  time?: Date | string | null;
}

export const sendNotification = async ({ content, time }: NotificationProps) => {
  // Request permission
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permission not granted");
    return;
  }

  // Android Channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
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