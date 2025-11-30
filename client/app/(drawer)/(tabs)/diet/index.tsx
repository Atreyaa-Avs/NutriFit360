import ActivityRingDiet from "@/assets/svgs/diet/ActivityRingCenter.svg";
import RecommendationRecipeSvg from "@/assets/svgs/diet/RecommendationRecipe.svg";
import AddMeal from "@/components/Diet/AddMeal/AddMealLayout";
import DietCalendar from "@/components/Diet/DietCalendar";
import StackCircles from "@/components/Diet/StackCircles";
import ViewMeal from "@/components/Diet/ViewMeal/ViewMealLayout";
import * as Haptics from "expo-haptics";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Button, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import rawData from "./DietDemo.json";
import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
  InterFontText,
} from "@/components/Fonts";
import TodayMeals from "@/components/Diet/TodayMeals";
import Recipes from "@/components/Diet/Recipes";
import SparklesSvg from "@/assets/svgs/sparkles.svg";

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
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 bg-[#E5E5E5] min-h-screen pb-32 pt-4"
    >
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <GilroyBoldText
          className={`pb-3 text-4xl font-semibold tracking-tighter`}
        >
          Diet Tracker
        </GilroyBoldText>
        <View>{/* <Calendar /> */}</View>
        <View className="">
          <DietCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        <GilroyRegularText>
          <GilroyBoldText>Selected Date:</GilroyBoldText>{" "}
          {formatDateToDMY(selectedDate)}
        </GilroyRegularText>
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
        <View className="flex-row w-full gap-4">
          <View className="flex-1">
            <Pressable
              onPress={() => router.push("/(drawer)/(tabs)/diet/Meal")}
            >
              <AddMeal />
            </Pressable>
          </View>
          <View className="flex-1">
            <ViewMeal />
          </View>
        </View>
        <View className="flex-col mb-4">
          <Link href={"/(drawer)/(tabs)/diet/Recommendation"} asChild>
            <Pressable className="flex-row items-center justify-center gap-2 p-4 bg-white/50 rounded-tr-xl rounded-tl-xl">
              <RecommendationRecipeSvg />
              <GilroySemiBoldText className="text-lg text-center tracking-tighter">
                View Diet Recommendation
              </GilroySemiBoldText>
            </Pressable>
          </Link>
          <View className="flex flex-row justify-center items-center gap-2 bg-black rounded-bl-xl rounded-br-xl">
            <SparklesSvg width={16} height={25} />
            <GilroySemiBoldText className="text-white text-center text-xs">with AI</GilroySemiBoldText>
          </View>
        </View>

        <StackCircles
          Icon={ActivityRingDiet}
          title={"Nutrition"}
          start={true}
          scale={0.9}
          unit="g"
          data={[
            {
              label: "Carbs",
              percentage: 75,
              strokeColor: "#8EFBFC",
              value: 150,
              target: 350,
            },
            {
              label: "Protein",
              percentage: 40,
              strokeColor: "#BFFA64",
              value: 70,
              target: 750,
            },
            {
              label: "Fats",
              percentage: 60,
              strokeColor: "#FA111E",
              value: 45,
              target: 200,
            },
          ]}
          gap={1}
        />

        <TodayMeals date={"06-07-2025"} />
        <Recipes />

        {/* <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          className="gap-2 mt-4"
        >
          <Button
            title="Haptic Impact"
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
            }
          />
          <Button
            title="Haptic Success"
            onPress={() =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
            }
          />
          <Button
            title="Haptic Selection"
            onPress={() => Haptics.selectionAsync()}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Diet;
