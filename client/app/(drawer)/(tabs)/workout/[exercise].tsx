import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  GilroyBoldText,
  GilroyMediumText,
  GilroyRegularText,
  GilroySemiBoldText,
  GilroyUltraLightText,
  InterFontText,
} from "@/components/Fonts";
import ExerciseData from "@/app/(drawer)/(tabs)/workout/Exercises.json";
import YoutubePlayer from "react-native-youtube-iframe";

const Exercise = () => {
  const { exercise } = useLocalSearchParams();

  const getYouTubeId = (url: string) =>
    (url.match(/(?:v=|\/)([A-Za-z0-9_-]{11})/) || [, ""])[1];

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

  const exerciseKey = Array.isArray(exercise) ? exercise[0] : (exercise ?? "");
  const ExerciseName = exerciseKey
    ? ExerciseData[exerciseKey as keyof typeof ExerciseData]
    : null;
  const normalize = (str: string) =>
    str.trim().replace(/\s+/g, " ").toLowerCase();

  return (
    <ScrollView
      className="flex-1 p-4 bg-white"
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
    >
      <View className="pb-16">
        {/* TITLE */}
        <GilroyBoldText className="my-4 text-4xl">{exerciseKey}</GilroyBoldText>
        <View className="flex-row w-full gap-4">
          {/* LEFT: Description + Benefits */}
          <View className="flex-1">
            {/* DESCRIPTION */}
            <View className="mb-4">
              <GilroyRegularText className="text-sm text-gray-700">
                {ExerciseName?.desc}
              </GilroyRegularText>
            </View>
            {/* BENEFITS */}
            <View className="flex-row items-center justify-between w-full p-4 bg-neutral-300 rounded-xl">
              <Image
                source={require("@/assets/images/workout/benefits.png")}
                className="w-12 h-12 rounded-lg"
                resizeMode={exerciseKey === "Swimming" ? "contain" : "cover"}
              />
              <View className="">
                <GilroySemiBoldText className="mb-2">
                  Benefits:
                </GilroySemiBoldText>
                {ExerciseName?.benefits && (
                  <View className="flex-row flex-wrap gap-2">
                    {ExerciseName.benefits.map((benefit, idx) => (
                      <View
                        key={idx}
                        className="px-3 py-1 rounded-md bg-neutral-200"
                      >
                        <GilroyRegularText className="text-xs text-gray-800 capitalize">
                          {benefit}
                        </GilroyRegularText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* RIGHT: Image */}
          <View className="w-16 h-16">
            <Image
              source={ImageMap[normalize(exerciseKey)]}
              className="w-full h-full rounded-lg"
              resizeMode={exerciseKey === "Swimming" ? "contain" : "cover"}
            />
          </View>
        </View>
        <View className="flex-row justify-between flex-1">
          {/* Equipment */}
          <View className="w-[48%] p-4 mt-2 bg-neutral-100 rounded-xl">
            <GilroySemiBoldText className="mb-1">Equipment:</GilroySemiBoldText>
            {ExerciseName?.equipment.map((ele, indx, arr) => (
              <GilroyRegularText className="capitalize" key={indx}>
                {ele}
                {indx === arr.length - 1 ? "." : ","}
              </GilroyRegularText>
            ))}
          </View>
          {/* Level */}
          <View className="w-[48%] p-4 mt-2 bg-neutral-100 rounded-xl">
            <GilroySemiBoldText className="mb-1">Level:</GilroySemiBoldText>
            <GilroyRegularText className="capitalize">
              {ExerciseName?.level}
            </GilroyRegularText>
          </View>
        </View>
        <View className="p-4 mt-2 bg-neutral-100 rounded-xl">
          <GilroySemiBoldText className="mb-1">
            Target Muscles:
          </GilroySemiBoldText>
          <View className="flex-row">
            {ExerciseName?.targetMuscles.map((ele, indx, arr) => (
              <GilroyRegularText className="capitalize" key={indx}>
                {ele}
                {indx === arr.length - 1 ? "." : ","}{" "}
              </GilroyRegularText>
            ))}
          </View>
        </View>
        {/* VIDEO */}
        <View className="my-4 overflow-hidden rounded-xl">
          <GilroySemiBoldText className="mb-4 text-2xl">
            Video:
          </GilroySemiBoldText>

          <View className="overflow-hidden rounded-xl">
            <YoutubePlayer
              height={200}
              play={true}
              videoId={getYouTubeId(ExerciseName?.videoUrl ?? "")}
            />
          </View>
        </View>

        {/* INSTRUCTIONS */}
        {ExerciseName?.instructions && (
          <View className="my-4">
            <GilroyBoldText className="mb-4 text-2xl">
              Instructions:
            </GilroyBoldText>
            {ExerciseName.instructions.map((step, idx) => (
              <View key={idx} className="flex-row pr-8 mb-4 max-w-screen">
                <GilroyBoldText className="mr-2 text-gray-800">
                  {idx + 1}.
                </GilroyBoldText>
                <InterFontText
                  className="text-gray-700"
                  style={{ marginTop: -2 }}
                >
                  {step}
                </InterFontText>
              </View>
            ))}
          </View>
        )}
        {/* TIPS */}
        <View
          className="p-4 bg-neutral-100 rounded-xl"
          style={{ elevation: 1 }}
        >
          <GilroySemiBoldText className="text-lg">Tips:</GilroySemiBoldText>
          {ExerciseName?.tips.map((step, idx) => (
            <View key={idx} className="flex-row mb-1">
              <GilroyBoldText className="mr-2 text-gray-800">
                {idx + 1}.
              </GilroyBoldText>
              <GilroyRegularText className="text-gray-700">
                {step}
              </GilroyRegularText>
            </View>
          ))}
        </View>

        <View className="mt-6">
          <GilroyBoldText className="text-lg text-center">
            Keep Exercising!
          </GilroyBoldText>
        </View>

        <View className="mt-4">
          <GilroyBoldText className="text-center text-neutral-400">
            NutriFit360 Inc., 2025
          </GilroyBoldText>
        </View>
      </View>
    </ScrollView>
  );
};

export default Exercise;

interface ExerciseInfoProps {
  title: string;
  content: string;
}

const ExerciseInfo = ({ title, content }: ExerciseInfoProps) => {
  return (
    <View>
      <GilroySemiBoldText>{title}</GilroySemiBoldText>
      <GilroyRegularText>{content}</GilroyRegularText>
    </View>
  );
};
