import { scheduleDailyNotification } from "./notification";

export const scheduleFullDailyRoutine = async () => {
  const results = await Promise.all([
    scheduleDailyNotification({
      hour: 6,
      minute: 0,
      title: "Wake Up",
      body: "Start the day with 300ml warm water + electrolytes.",
    }),

    scheduleDailyNotification({
      hour: 6,
      minute: 30,
      title: "Morning Mobility Routine",
      body: "10-minute stretching + 5-minute deep breathing.",
    }),

    scheduleDailyNotification({
      hour: 7,
      minute: 0,
      title: "Balanced Breakfast",
      body: "Oats, chia seeds, yogurt, berries — 35g protein.",
    }),

    scheduleDailyNotification({
      hour: 8,
      minute: 0,
      title: "Supplement Reminder",
      body: "Take Vitamin D3, Omega-3, and Multivitamin.",
    }),

    scheduleDailyNotification({
      hour: 10,
      minute: 0,
      title: "Mid-Morning Snack",
      body: "15 almonds + 1 banana.",
    }),

    scheduleDailyNotification({
      hour: 12,
      minute: 30,
      title: "Strength Training Session",
      body: "45-minute upper-body workout.",
    }),

    scheduleDailyNotification({
      hour: 13,
      minute: 30,
      title: "Post-Workout Meal",
      body: "Chicken + quinoa + veggies. Protein target: 40g.",
    }),

    scheduleDailyNotification({
      hour: 13,
      minute: 35,
      title: "Post-Workout Meal 2",
      body: "Additional meal reminder.",
    }),

    scheduleDailyNotification({
      hour: 13,
      minute: 40,
      title: "Post-Workout Meal 3",
      body: "Additional reminder.",
    }),

    scheduleDailyNotification({
      hour: 15,
      minute: 30,
      title: "Hydration Reminder",
      body: "Drink 250ml water.",
    }),

    scheduleDailyNotification({
      hour: 16,
      minute: 0,
      title: "Evening Walk",
      body: "20-minute brisk walk.",
    }),

    scheduleDailyNotification({
      hour: 17,
      minute: 30,
      title: "Healthy Snack",
      body: "Protein smoothie with spinach and banana.",
    }),

    scheduleDailyNotification({
      hour: 19,
      minute: 30,
      title: "Light Dinner",
      body: "Vegetable soup + tofu.",
    }),

    scheduleDailyNotification({
      hour: 21,
      minute: 0,
      title: "Mindfulness & Journaling",
      body: "10 minutes meditation.",
    }),

    scheduleDailyNotification({
      hour: 22,
      minute: 0,
      title: "Sleep Routine",
      body: "Prepare for bed. No screens.",
    }),
  ]);

  return results.every(Boolean);
};
