import AddMeal from "@/components/Diet/AddMeal/AddMealLayout";
import DietCalendar from "@/components/Diet/DietCalendar";
import StackCircles from "@/components/Diet/StackCircles";
import ViewMeal from "@/components/Diet/ViewMeal/ViewMealLayout";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import rawData from "./DietDemo.json";
import { router } from "expo-router";

// interface DietIndexProps {
//   selectedDate: Array<String>[]
// }

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DailyMeals {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}

const formatDateToDMY = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
};

const getLocalISODate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// const typedData: Record<string, DailyMeals> = Data;

const Diet = () => {
  const Data = rawData as Record<string, DailyMeals>;
  const todayISO = getLocalISODate();
  const [selectedDate, setSelectedDate] = useState(todayISO);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-[#E5E5E5] min-h-screen pb-32 -mt-7 px-4 pt-2">
        <Text className="text-4xl tracking-tighter pb-3 font-semibold">
          Diet Tracker
        </Text>
        <View>{/* <Calendar /> */}</View>
        <View className="">
          <DietCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        <Text>Selected Date: {formatDateToDMY(selectedDate)}</Text>
        <View>
          {Data[formatDateToDMY(selectedDate)]?.breakfast?.map(
            (item: MealItem, index: number) => (
              <View key={index} className="mb-2">
                <Text className="font-semibold">{item.name}</Text>
                <Text>Calories: {item.calories}</Text>
                <Text>Protein: {item.protein}g</Text>
                <Text>Carbs: {item.carbs}g</Text>
                <Text>Fats: {item.fats}g</Text>
              </View>
            )
          )}
        </View>
        <Text>{Data["06-07-2025"].breakfast[0].name}</Text>
        <View className="flex-row w-full gap-4">
          <View className="flex-1">
            <Pressable onPress={() => router.push("/(drawer)/(tabs)/diet/Meal")}>
              <AddMeal />
            </Pressable>
          </View>
          <View className="flex-1">
            <ViewMeal />
          </View>
        </View>

        <StackCircles
          start={true}
          scale={0.9}
          data={[
            {
              label: "Carbs",
              percentage: 75,
              strokeColor: "#8EFBFC",
              value: 40,
              target: 500,
            },
            {
              label: "Protein",
              percentage: 40,
              strokeColor: "#BFFA64",
              value: 40,
              target: 500,
            },
            {
              label: "Fats",
              percentage: 60,
              strokeColor: "#FA111E",
              value: 40,
              target: 500,
            },
          ]}
          gap={1}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Diet;
