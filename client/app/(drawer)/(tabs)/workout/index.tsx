import WorkoutCalendar from "@/components/Workout/WorkoutCalendar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDateToDMY = (isoDate: string) => {
  const [year,month,day] = isoDate.split("-");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
}

const getLocalISODate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2,"0");
  const day = `${today.getDate()}`.padStart(2,"0");
  return `${year}-${month}-${day}`
}

const Workout = () => {
  const todayISO = getLocalISODate();
  const [selectedDate, setSelectedDate] = useState(todayISO);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-[#E5E5E5] min-h-screen pb-24 -mt-7 px-4 pt-2">
        <Text className="text-4xl tracking-tighter pb-3 font-semibold">
          Workout Tracker
        </Text>
        <View>
          <WorkoutCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        <Text>Selected Date: {formatDateToDMY(selectedDate)}</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Workout;
