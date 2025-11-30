import { View, Image, Pressable } from "react-native";
import React from "react";
import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
  InterFontText,
} from "../Fonts";

// SVGs
import BreakfastSvg from "@/assets/svgs/diet/Breakfast.svg";
import LunchSvg from "@/assets/svgs/diet/Lunch.svg";
import DinnerSvg from "@/assets/svgs/diet/Dinner.svg";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealItem {
  name: string;
  desc: string;
  nutrition: Nutrition;
  image: any;
  youtubeId: string;
}

interface MealSectionProps {
  title: string;
  items: MealItem[];
}

const dummyData = {
  breakfast: [
    {
      name: "Boiled Eggs & Multigrain Toast",
      desc: "High-protein breakfast to kickstart your metabolism.",
      nutrition: { calories: 280, protein: 18, carbs: 25, fats: 12 },
      image: require("@/assets/images/diet/MyMeals/Breakfast.webp"),
      youtubeId: "mpcJZ9LLqic",
    },
    {
      name: "Greek Yogurt with Berries",
      desc: "Antioxidant-packed and gut-friendly meal.",
      nutrition: { calories: 150, protein: 12, carbs: 20, fats: 3 },
      image: require("@/assets/images/diet/MyMeals/Breakfast2.jpg"),
      youtubeId: "7rsCpwRoYJI",
    },
  ],

  lunch: [
    {
      name: "Grilled Paneer Wrap",
      desc: "Protein-rich wrap perfect for a balanced lunch.",
      nutrition: { calories: 450, protein: 30, carbs: 40, fats: 18 },
      image: require("@/assets/images/diet/MyMeals/Lunch.jpg"),
      youtubeId: "Wb95nUQZLXM",
    },
    {
      name: "Quinoa Veggie Bowl",
      desc: "Mineral-rich quinoa bowl loaded with veggies.",
      nutrition: { calories: 390, protein: 14, carbs: 55, fats: 10 },
      image: require("@/assets/images/diet/MyMeals/Lunch2.jpg"),
      youtubeId: "rIYqwpgNhu0",
    },
  ],

  dinner: [
    {
      name: "Lentil Soup + Whole Grain Bread",
      desc: "Light, nutritious, and fiber-rich dinner meal.",
      nutrition: { calories: 400, protein: 22, carbs: 45, fats: 10 },
      image: require("@/assets/images/diet/MyMeals/Dinner.jpg"),
      youtubeId: "mdT3tFEug00",
    },
    {
      name: "Stir-Fried Veggies with Tofu",
      desc: "Low-calorie plant-based protein dinner.",
      nutrition: { calories: 350, protein: 20, carbs: 28, fats: 14 },
      image: require("@/assets/images/diet/MyMeals/Dinner2.jpg"),
      youtubeId: "RI5VE3IRjGc",
    },
  ],
};

// ----------------------------------
// MAIN COMPONENT
// ----------------------------------
const TodayMeals = () => {
  return (
    <View className="my-4">
      <GilroyBoldText className="text-3xl">Recipes</GilroyBoldText>

      <View className="flex-col gap-3">
        <MealSection title="Breakfast" items={dummyData.breakfast} />
        <MealSection title="Lunch" items={dummyData.lunch} />
        <MealSection title="Dinner" items={dummyData.dinner} />
      </View>
    </View>
  );
};

// ----------------------------------
// 🔥 DYNAMIC SVG PICKER
// ----------------------------------
const getMealIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "breakfast":
      return <BreakfastSvg width={26} height={26} />;
    case "lunch":
      return <LunchSvg width={26} height={26} />;
    case "dinner":
      return <DinnerSvg width={26} height={26} />;
    default:
      return null;
  }
};

// ----------------------------------
// MEAL SECTION
// ----------------------------------
const MealSection = ({ title, items }: MealSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <View className="bg-neutral-300 p-4 rounded-xl mt-3">
      <View className="flex-row items-start mb-5">
        {" "}
        {getMealIcon(title)}
        <GilroySemiBoldText className="text-xl" style={{ marginTop: 2 }}>
          {" "}
          {title}:{" "}
        </GilroySemiBoldText>{" "}
      </View>

      {items.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between mb-4 bg-white p-4 rounded-xl"
        >
          <View className="flex-1 pr-3">
            <GilroySemiBoldText className="text-lg" style={{ lineHeight: 20 }}>
              {item.name}
            </GilroySemiBoldText>

            <InterFontText className="text-gray-600 text-sm mt-2 mb-2">
              {item.desc}
            </InterFontText>

            <View className="flex-row mt-2 gap-6">
              <View>
                <InterFontText className="text-sm">
                  Calories:{" "}
                  <GilroyRegularText>
                    {item.nutrition.calories}g
                  </GilroyRegularText>
                </InterFontText>

                <InterFontText className="text-sm">
                  Protein:{" "}
                  <GilroyRegularText>
                    {item.nutrition.protein}g
                  </GilroyRegularText>
                </InterFontText>
              </View>

              <View>
                <InterFontText className="text-sm">
                  Carbs:{" "}
                  <GilroyRegularText>{item.nutrition.carbs}g</GilroyRegularText>
                </InterFontText>

                <InterFontText className="text-sm">
                  Fats:{" "}
                  <GilroyRegularText>{item.nutrition.fats}g</GilroyRegularText>
                </InterFontText>
              </View>
            </View>
          </View>

          <View className="flex-col gap-4 items-end justify-between">
            <Image
              source={item.image}
              className="w-20 h-20 rounded-lg"
              resizeMode="cover"
            />

            <Pressable
              className="flex-row items-center bg-primary rounded-md px-2 py-2"
              onPress={() => {
                router.push({
                  pathname: "/diet/[RecipeHome]",
                  params: {
                    RecipeHome: item.name,
                    Title: item.name,
                    YoutubeId: item.youtubeId,
                  },
                });
              }}
            >
              <InterFontText className="text-white text-xs">
                Video
              </InterFontText>
              <Ionicons
                name="chevron-forward"
                size={12}
                color="#FFF"
                style={{ marginTop: 1 }}
              />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodayMeals;
