import {
  GilroyBoldText,
  GilroyRegularText,
  GilroySemiBoldText,
  InterFontText,
} from "@/components/Fonts";
import { fetchResponse } from "@/hooks/useCloudVisionResponse";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Nutrition = { [key: string]: number };

const AnalyzeRecipeComponent = () => {
  const { imageBase64 } = useLocalSearchParams();

  const base64 = decodeURIComponent(
    Array.isArray(imageBase64) ? imageBase64[0] : imageBase64 || ""
  );

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchResponse(base64);
      setData(result);
    } catch (err: any) {
      setError("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeImage();
  }, []);

  const nutrition = data?.nutrition as Nutrition;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View className="p-2 pb-32">
        <View className="flex-row items-center mx-3">
          <GilroyBoldText className="text-2xl underline">Image:</GilroyBoldText>
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
              <InterFontText className="text-black">
                Analyzing image...
              </InterFontText>
            </View>
          </View>
        )}

        {error && (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        )}

        {data && (
          <>
            {/* Recipe Name */}
            <View className="flex-row items-start gap-3 mx-4 mt-6 mb-3">
              <GilroySemiBoldText className="text-xl underline">
                Name:
              </GilroySemiBoldText>
              <GilroyRegularText className="mr-20 text-xl">
                {data.recipe}
              </GilroyRegularText>
            </View>

            {/* Ingredients */}
            <View className="m-4 bg-white rounded-lg" style={{ elevation: 4 }}>
              <View className="flex-row justify-center w-full gap-1 py-3 rounded-t-lg bg-primary">
                <GilroySemiBoldText className="text-xl underline text-neutral-900">
                  Ingredients
                </GilroySemiBoldText>
              </View>

              <View className="flex-row flex-wrap p-2 pb-4 mx-4 my-4">
                {data.ingredients.map((ele: string, indx: number) => (
                  <Card key={indx} val={ele} />
                ))}
              </View>
            </View>

            {/* Nutrition Info */}
            <View
              className="mx-4 my-4 bg-neutral-300 rounded-xl"
              style={{ elevation: 4 }}
            >
              <View className="flex-row justify-center w-full gap-1 py-3 rounded-t-lg bg-primary">
                <GilroySemiBoldText className="text-xl underline text-neutral-900">
                  Estimated Nutrition
                </GilroySemiBoldText>
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
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default AnalyzeRecipeComponent;


  type NutritionInfoProps = {
    title: string;
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
          <InterFontText className="text-lg capitalize">{title}:</InterFontText>
          <View className="flex-row items-center ">
            <GilroyBoldText className="text-2xl">{amount} </GilroyBoldText>
            <InterFontText>{units[title] || ""}</InterFontText>
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
        <InterFontText className="font-medium text-center capitalize">
          {val}
        </InterFontText>
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
