import { View, Text, Image } from "react-native";
import React from "react";
import rawData from "@/app/(drawer)/(tabs)/diet/DietDemo.json";
import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
  InterFontText,
} from "../Fonts";

interface TodayMealsProps {
  date: string;
}

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealSectionProps {
  title: string;
  items: MealItem[];
  image: any;
}

const TodayMeals = ({ date }: TodayMealsProps) => {
  const Data = rawData as any;

  const today = Data[date];
  if (!today) return null;

  return (
    <View className="mt-6 mb-4">
      <GilroyBoldText className="text-3xl">Today Meals</GilroyBoldText>

      <MealSection
        title="Breakfast"
        items={today.breakfast}
        image={require("@/assets/images/diet/MyMeals/Breakfast.webp")}
      />

      <MealSection
        title="Lunch"
        items={today.lunch}
        image={require("@/assets/images/diet/MyMeals/Lunch.jpg")}
      />

      <MealSection
        title="Dinner"
        items={today.dinner}
        image={require("@/assets/images/diet/MyMeals/Dinner.jpg")}
      />
    </View>
  );
};

const MealSection = ({ title, items, image }: MealSectionProps) => {
  if (!items || items.length === 0) return null;

  const firstMeal = items[0];

  return (
    <View className="flex-row justify-between bg-white p-4 rounded-xl mt-3">
      <View className="flex-1 pr-3">
        <GilroySemiBoldText className="text-xl">{title}</GilroySemiBoldText>

        {/* First meal name */}
        <InterFontText className="mt-1">{firstMeal.name}</InterFontText>

        {/* Macro List */}
        {items.map((item, index) => (
          <View key={index} className="flex-row mt-4 mb-2 gap-6">
            <View>
              <InterFontText>
                Calories:{" "}
                <GilroyRegularText>{item.calories}g</GilroyRegularText>
              </InterFontText>

              <InterFontText>
                Protein:{" "}
                <GilroyRegularText>{item.protein}g</GilroyRegularText>
              </InterFontText>
            </View>

            <View>
              <InterFontText>
                Carbs:{" "}
                <GilroyRegularText>{item.carbs}g</GilroyRegularText>
              </InterFontText>

              <InterFontText>
                Fats:{" "}
                <GilroyRegularText>{item.fats}g</GilroyRegularText>
              </InterFontText>
            </View>
          </View>
        ))}
      </View>

      {/* Meal Image */}
      <Image
        source={image}
        className="w-24 h-24 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};

export default TodayMeals;
