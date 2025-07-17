import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const isToday = (dateString: string): boolean => {
  const today = new Date();
  const selected = new Date(dateString);
  return (
    today.getFullYear() === selected.getFullYear() &&
    today.getMonth() === selected.getMonth() &&
    today.getDate() === selected.getDate()
  );
};

const WorkoutCalendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = useSharedValue(0);

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpanded ? "90deg" : "0deg", {
          duration: 200,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],
  }));

  const calendarAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isExpanded ? 360 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    }),
    opacity: withTiming(isExpanded ? 1 : 0, {
      duration: 200,
    }),
    overflow: "hidden",
  }));

  const toggleCalendar = () => {
    setIsExpanded(!isExpanded);
    animationValue.value = isExpanded ? 0 : 1;
  };

  return (
    <View>
      <View className="flex-row items-center justify-between px-4 py-2 mb-2 rounded-lg bg-primary">
          <Text className="text-base font-bold text-white">Calendar</Text>
          <Text className="flex-1 text-sm text-center text-white">
            {isToday(selectedDate) ? "Today" : formatDate(selectedDate)}
          </Text>
        <TouchableOpacity
          onPress={toggleCalendar}
          className="px-4 py-1 bg-gray-200 rounded-xl"
        >

          <Animated.View style={arrowAnimatedStyle}>
            <Text className="text-lg text-black">{">"}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.View style={calendarAnimatedStyle}>
        <Calendar
          style={{
            borderRadius: 10,
            paddingBottom: 20,
            backgroundColor: "#fff",
          }}
          markingType="custom"
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setIsExpanded(false);
            animationValue.value = 0;
          }}
          markedDates={{
            [selectedDate]: {
              customStyles: {
                container: {
                  backgroundColor: "#F09E54",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                },
                text: {
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
          }}
        />
      </Animated.View>
    </View>
  );
};

export default WorkoutCalendar;
