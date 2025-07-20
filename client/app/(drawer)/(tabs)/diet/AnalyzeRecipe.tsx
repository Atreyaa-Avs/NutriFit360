import AnalyzeRecipeComponent from "@/components/Diet/AddMeal/AnalyzeRecipeComponent";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AnalyzeRecipe = () => {
  return (
    <SafeAreaView className="mt-14">
      
      <AnalyzeRecipeComponent />
    </SafeAreaView>
  );
};

export default AnalyzeRecipe;
