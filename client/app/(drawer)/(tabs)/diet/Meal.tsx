import AnimatedBar from "@/components/Diet/AddMeal/AnimatedBar";
import CameraButton from "@/components/Diet/AddMeal/CameraButton";
import GalleryButton from "@/components/Diet/AddMeal/GalleryButton";
import ProceedButton from "@/components/Diet/AddMeal/ProceedButton";
import CameraComponent from "@/components/Diet/CameraComponent";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Meal = () => {
  return (
    <SafeAreaView className="bg-gray-200 min-h-screen">
      <View className="p-4">
        <View>
          <Text className="text-xl text-center">
            Put the meal inside the box!
          </Text>
        </View>
        <View className="flex-row mx-auto mt-5 w-60 h-60 rounded-xl border-[5px] border-gray-400"></View>

        {/* <View className="flex-row justify-between my-5 items-center mx-4">
          <GalleryButton />
          <CameraButton />
          <ProceedButton />
        </View> */}

        <CameraComponent />

        {/* <View className="bg-neutral-300 p-3 px-5 rounded-xl">
          <Text className="mb-2 font-bold text-xl">Estimated Nutrition:</Text>
          <Text className="">Carbs:</Text>
          <View className="w-full my-2">
            <AnimatedBar percentage={50} color="#8EFBFC" />
          </View>
          <Text className="">Protein:</Text>
          <View className="w-full my-2">
            <AnimatedBar percentage={70} color="#BFFA64" />
          </View>
          <NutritionInfo title={"Fats"} percentage={75} color={"#FA111E"} />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Meal;

interface NutritionInfoProps {
  title: string;
  percentage: number;
  color: string;
}

const NutritionInfo = ({ title, percentage, color }: NutritionInfoProps) => {
  return (
    <View className="w-full my-2">
      <View>
        <Text className="">{title}:</Text>
        <Text></Text>
      </View>
      <View className="-mt-3">
        <AnimatedBar percentage={percentage} color={color} />
      </View>
    </View>
  );
};
