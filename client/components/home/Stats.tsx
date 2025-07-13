import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Calories from "./Calories";
import Exercise from "./Exercise";
import HeartRate from "./HeartRate";
import Sleep from "./Sleep";
import Steps from "./Steps";
import Activity from "./Activity";

const Stats = () => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="bg-[#e5e5e5] py-2 px-4">
      <View className="mb-4">
        <Text className="text-4xl font-bold tracking-tighter">Statistics</Text>
      </View>

      {/* Masonry Columns */}
      <View className="flex-row justify-between">
        {/* Column 1 */}
        <View className="w-[48%]">
          <View className="mb-4 rounded-xl">
            <Steps startAnimation={startAnimation} />
          </View>
          <View className="mb-4 rounded-xl">
            <Sleep startAnimation={startAnimation} />
          </View>
          <View className="mb-4 rounded-xl">
            <HeartRate startAnimation={startAnimation} />
          </View>
        </View>

        {/* Column 2 */}
        <View className="w-[48%]">
          <View className="mb-6 bg-white rounded-xl">
            <Calories startAnimation={startAnimation} />
          </View>
          <View className="mb-4 bg-white rounded-xl mt-2">
            <Exercise startAnimation={startAnimation} />
          </View>
          <View className="mb-4 bg-white rounded-xl mt-2">
            <Activity startAnimation={startAnimation} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stats;
