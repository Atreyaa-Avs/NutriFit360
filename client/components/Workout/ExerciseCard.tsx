import { View, Pressable, Image } from "react-native";
import React from "react";
import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
} from "../Fonts";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseCardProps {
  title: string;
  desc: string;
  benefits: string;
}

const ImageMap: Record<string, number> = {
  squats: require("@/assets/images/workout/squats.jpg"),
  yoga: require("@/assets/images/workout/yoga.png"),
  deadlifts: require("@/assets/images/workout/deadlift.jpg"),
  "bench presses": require("@/assets/images/workout/benchpress.webp"),
  "overhead presses": require("@/assets/images/workout/overheadpresses.png"),
  "brisk walking": require("@/assets/images/workout/briskwalking.jpg"),
  cycling: require("@/assets/images/workout/cycling.jpg"),
  swimming: require("@/assets/images/workout/swimming.jpg"),
  dancing: require("@/assets/images/workout/dancing.jpg"),
  walking: require("@/assets/images/workout/walking.webp"),
};

const ExerciseCard = ({ title, desc, benefits }: ExerciseCardProps) => {
  const normalize = (str: string) =>
    str.trim().replace(/\s+/g, " ").toLowerCase();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(drawer)/(tabs)/workout/[exercise]",
          params: { exercise: title },
        })
      }
      className="p-4 bg-white shadow-sm rounded-xl"
      style={{ elevation: 2 }}
    >
      {/* TOP ROW — TITLE + CHEVRON */}
      <View className="flex-row items-start justify-between mb-4">
        <GilroyBoldText className="text-lg text-black">{title}</GilroyBoldText>
        <Ionicons name="chevron-forward" size={20} color="#333" />
      </View>

      {/* BOTTOM ROW — LEFT CONTENT + RIGHT IMAGE */}
      <View className="flex-row items-start justify-between">
        {/* LEFT TEXT SECTION */}
        <View className="flex-col justify-between">
          <View className="flex-1 pr-3 max-w-64">
            <GilroyRegularText className="mb-4 text-sm text-gray-600">
              {desc}
            </GilroyRegularText>
          </View>
          {/* BENEFITS */}
          <View className="flex-row flex-wrap gap-2">
            {benefits.split(",").map((ele, index) => (
              <View key={index} className="px-2 py-1 rounded-md bg-neutral-200">
                <GilroySemiBoldText className="text-xs text-gray-700 capitalize">
                  {ele.trim()}
                </GilroySemiBoldText>
              </View>
            ))}
          </View>
        </View>

        {/* RIGHT IMAGE */}
        <View className="mr-2">
          <Image
            source={ImageMap[normalize(title)]}
            className="w-24 h-24 rounded-lg"
            resizeMode={normalize(title) === "swimming" ? "contain" : "cover"}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExerciseCard;
