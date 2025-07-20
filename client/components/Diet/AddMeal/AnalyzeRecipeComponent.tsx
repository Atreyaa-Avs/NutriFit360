import { useOllamaVisionResponse } from "@/hooks/useOllamaVisionResponse";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Nutrition = {
  [key: string]: number;
};

const AnalyzeRecipeComponent = () => {
  const { imageBase64 } = useLocalSearchParams();

  const base64 = decodeURIComponent(
    Array.isArray(imageBase64) ? imageBase64[0] : imageBase64 || ""
  );

  const { data, isLoading, error, refetch } = useOllamaVisionResponse(base64, false);

  useEffect(() => {
    refetch();
  }, []);

  const nutrition = data?.nutrition as Nutrition;

  return (
    <ScrollView>
      <View className="p-2 pb-32">
        <View className="flex-row items-center mx-3">
          <Text className="text-2xl font-bold underline">Image</Text>
          <Text className="text-2xl font-bold">:</Text>
        </View>
        <View className="flex-row justify-center mt-6">
          {base64 && (
            <Image
              source={{ uri: `data:image/jpeg;base64,${base64}` }}
              style={styles.imagePreview}
              resizeMode="contain"
            />
          )}
        </View>

        {isLoading && (
          <View
            className="self-center px-6 py-2 mt-6 bg-white rounded-xl"
            style={{ elevation: 7 }}
          >
            <View className="flex-row items-center gap-3 px-4 py-2 space-x-2">
              <ActivityIndicator size="small" color="#4B5563" />
              <Text className="text-black">Analyzing image...</Text>
            </View>
          </View>
        )}

        {error && (
          <Text className="mt-4 text-center text-red-500">Error analyzing image.</Text>
        )}

        {/* {data && (
          <View className="mt-4 space-y-2">
            <Text className="text-lg font-semibold">Response:</Text>
            <Text className="text-sm">{JSON.stringify(data, null, 2)}</Text>
          </View>
        )} */}

        {data && (
          <View className="flex-row items-start gap-3 mx-4 mt-6 mb-3">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold underline">Name</Text>
              <Text className="text-2xl font-bold">:</Text>
            </View>
            <Text className="mr-20 text-xl">{data?.recipe}</Text>
          </View>
        )}

        {data && (
          <View className="flex-row items-center mx-4 mt-4">
            <Text className="text-xl font-bold underline">Nutrition Info</Text>
            <Text className="text-xl font-bold">:</Text>
          </View>
        )}

        {data && (
          <View className="m-4 bg-white rounded-lg" style={{ elevation: 4 }}>
            <View className="flex-row justify-center w-full gap-1 py-3 rounded-t-lg bg-primary">
              <Text className="text-xl font-bold text-center text-neutral-900">
                1.
              </Text>
              <Text className="text-xl font-bold text-center underline text-neutral-900">
                Ingredients
              </Text>
            </View>
            <View className="flex-row flex-wrap p-2 pb-4 mx-4 my-4">
              {data?.ingredients.map((ele: string, indx: number) => (
                <Card
                  key={indx}
                  val={ele.replace(/\s*\([^)]*\)/g, "").trim()}
                /> // Remove whatever is enclosed in () :-> Regex!
              ))}
            </View>
          </View>
        )}

        {data && (
          <View
            className="mx-4 my-4 bg-neutral-300 rounded-xl"
            style={{ elevation: 4 }}
          >
            <View className="flex-row items-center">
              <View className="flex-row justify-center w-full gap-1 py-3 rounded-t-lg bg-primary">
                <Text className="text-xl font-bold text-center text-neutral-900">
                  2.
                </Text>
                <Text className="text-xl font-bold text-center underline text-neutral-900">
                  Estimated Nutrition
                </Text>
              </View>
            </View>
            <View
              className="px-4 mx-4 my-6 bg-white rounded-lg"
              style={{ elevation: 7 }}
            >
              {Object.entries(nutrition || {}).map(([key, value]) => (
                <NutritionInfo key={key} title={key} amount={value} />
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AnalyzeRecipeComponent;

type NutritionInfoProps = {
  title: string;
  //   percentage: number;
  //   color: string;
  amount: number;
};

const NutritionInfo = ({ title, amount }: NutritionInfoProps) => {
  const units: Record<string, string> = {
    calories: "kcal",
    protein: "g",
    fat: "g",
    carbs: "g",
    fiber: "g",
    sugar: "g",
    sodium: "mg",
    cholesterol: "mg",
  };

  return (
    <View className="my-2">
      <View className="flex-row items-end justify-between w-full mb-1">
        <Text className="text-lg capitalize">{title}:</Text>
        <View className="flex-row items-center ">
          <Text className="text-2xl font-bold">{amount} </Text>
          <Text>{units[title] || ""}</Text>
        </View>
      </View>
      <View className="border-[#ccc] border-b mx-4" />
    </View>
  );
};

type CardProps = {
  val: string;
};

const Card = ({ val }: CardProps) => {
  return (
    <View
      className="flex-1 min-w-[32%] p-3 m-2 bg-[#ccc] rounded-md"
      style={{ elevation: 4 }}
    >
      <Text className="font-medium text-center capitalize"> {val} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
});
