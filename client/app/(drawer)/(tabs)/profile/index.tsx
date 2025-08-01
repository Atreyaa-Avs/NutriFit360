import Banner from "@/components/Profile/Banner";
import Details from "@/components/Profile/Details";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import AgeSvg from "@/assets/svgs/profile/age.svg";
import BMISvg from "@/assets/svgs/profile/bmi.svg";
import DiabetesSvg from "@/assets/svgs/profile/diabetes.svg";
import FitnessGoalSvg from "@/assets/svgs/profile/fitnessGoal.svg";
import FitnessLevelSvg from "@/assets/svgs/profile/fitnessLevel.svg";
import FitnessTypeSvg from "@/assets/svgs/profile/fitnessType.svg";
import GenderSvg from "@/assets/svgs/profile/gender.svg";
import HeightSvg from "@/assets/svgs/profile/height.svg";
import HypertensionSvg from "@/assets/svgs/profile/hypertension.svg";
import SaveSvg from "@/assets/svgs/profile/save.svg";
import WeightSvg from "@/assets/svgs/profile/weight.svg";
import {
  ProfileState,
  titleToKey,
  useProfileStore,
} from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import { SvgProps } from "react-native-svg";

const Profile = () => {
  const formFields = [
    { type: "Card", Icon: AgeSvg, title: "Age", unit: "years", defaultVal: 19 },
    { type: "Card", Icon: BMISvg, title: "BMI", unit: "kg/m²", defaultVal: 26 },
    {
      type: "Card",
      Icon: HeightSvg,
      title: "Height",
      unit: "m",
      defaultVal: 1.6,
    },
    {
      type: "Card",
      Icon: WeightSvg,
      title: "Weight",
      unit: "kg",
      defaultVal: 68,
    },
    { type: "CheckboxCard", Icon: HypertensionSvg, title: "Hypertension" },
    { type: "CheckboxCard", Icon: DiabetesSvg, title: "Diabetes" },
    {
      type: "DropDownCard",
      Icon: GenderSvg,
      title: "Gender",
      defaultVal: "male",
      arrVals: ["male", "female"],
    },
    {
      type: "DropDownCard",
      Icon: FitnessLevelSvg,
      title: "Fitness Level",
      defaultVal: "normal",
      arrVals: ["underweight", "normal", "overweight", "obese"],
    },
    {
      type: "DropDownCard",
      Icon: FitnessGoalSvg,
      title: "Fitness Goal",
      defaultVal: "Weight Loss",
      arrVals: ["Weight Loss", "Weight Gain"],
    },
    {
      type: "DropDownCard",
      Icon: FitnessTypeSvg,
      title: "Fitness Type",
      defaultVal: "Muscular Fitness",
      arrVals: ["Muscular Fitness", "Cardio Fitness"],
    },
  ];

  const handleSave = () => {
    const profile = useProfileStore.getState();
    const body = mapProfileToRequestBody(profile);
    alert("Saved!");
    console.log("Final Request Body: ", body);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={formFields}
          keyExtractor={(item) => item.title}
          numColumns={2}
          renderItem={({ item, index }) => {
            const isDropdown = item.type === "DropDownCard";
            const isCheckBox = item.type === "CheckboxCard"; 
            return (
              <View
                style={{
                  flex: 1,
                  padding: 8,
                  // Only apply zIndex if it’s a dropdown
                  zIndex: isDropdown || isCheckBox ? formFields.length - index : 0,
                }}
              >
                {item.type === "Card" && (
                  <Card
                    Icon={item.Icon}
                    title={item.title}
                    unit={item.unit}
                    defaultVal={item.defaultVal}
                  />
                )}
                {item.type === "CheckboxCard" && (
                  <CheckboxCard Icon={item.Icon} title={item.title} />
                )}
                {item.type === "DropDownCard" && (
                  <DropDownCard
                    Icon={item.Icon}
                    title={item.title}
                    defaultVal={item.defaultVal}
                    arrVals={item.arrVals}
                  />
                )}
              </View>
            );
          }}
          ListHeaderComponent={
            <SafeAreaView>
              <View
                className={`bg-[#E5E5E5] ${Platform.OS === "android" ? "-mt-8" : "-mt-14"} px-4 pt-2`}
              >
                <Banner />
                <Text className="mt-6 text-3xl font-bold text-center underline">
                  Details
                </Text>
                <Details />
              </View>
            </SafeAreaView>
          }
          ListFooterComponent={
            <TouchableOpacity onPress={handleSave} className="mt-6 px-4">
              <View className="flex-row w-full items-center justify-center gap-3 p-3 bg-blue-500 rounded-xl">
                <SaveSvg width={20} height={20} fill={"#fff"} />
                <Text className="text-xl font-semibold text-white">Save</Text>
              </View>
            </TouchableOpacity>
          }
          contentContainerStyle={{
            paddingBottom: 150,
            backgroundColor: "#E5E5E5",
            paddingHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

type CardProps = {
  title: string;
  Icon: React.FC<SvgProps>;
  unit?: string;
  defaultVal?: string | number;
  arrVals?: string[];
};

type ProfileKey = keyof ProfileState;

const Card = ({ title, Icon, unit, defaultVal }: CardProps) => {
  const setField = useProfileStore((state) => state.setField);
  const value = useProfileStore(
    (state) => state[title.toLowerCase() as keyof typeof state]
  );
  const [isFocused, setIsFocused] = useState(false);
  const key = title.toLowerCase() as ProfileKey;
  return (
    <View className="flex-1 px-2 py-2 bg-white/50 rounded-xl">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>
      <View className="flex-row items-end justify-between px-5 mt-2 ml-4">
        <TextInput
          value={(value ?? "").toString()}
          onChangeText={(text) => {
            if (/^\d*\.?\d*$/.test(text)) {
              setField(key, text);
            }
          }}
          keyboardType="decimal-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`text-2xl border-b-2 ${
            isFocused ? "border-primary" : "border-gray-300"
          } w-16 text-center p-0 h-8`}
        />
        <Text className="text-xl">{unit}</Text>
      </View>
    </View>
  );
};

const DropDownCard = ({ title, Icon, defaultVal, arrVals }: CardProps) => {
  const key = titleToKey[title];
  const selectedValue = useProfileStore((state) => state[key]);
  const setField = useProfileStore((state) => state.setField);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | number | null>(
    typeof selectedValue === "string"
      ? selectedValue?.toLowerCase()
      : typeof selectedValue === "number"
        ? selectedValue
        : null
  );
  const [items, setItems] = useState(
    (arrVals ?? []).map((val) => ({
      label: val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
      value: val.toLowerCase(),
    }))
  );

  // Update global state when value changes
  useEffect(() => {
    if (value !== null) {
      setField(
        key,
        value
          .toString()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      );
    }
  }, [value]);

  return (
    <View className="flex-1 px-2 pt-4 pb-6 bg-white/50 rounded-xl z-50">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      <View className="px-5 -ml-2 mt-2 z-100">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select..."
          style={{
            borderColor: "#ccc",
            height: 40,
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
          }}
          labelStyle={{
            color: "#222",
          }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>
    </View>
  );
};

const CheckboxCard = ({ title, Icon }: CardProps) => {
  const key = title.toLowerCase() as ProfileKey;
  const value = useProfileStore((state) => state[key]);
  const setField = useProfileStore((state) => state.setField);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    typeof value === "string" ? value : "no"
  );

  const [items, setItems] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]);

  useEffect(() => {
    if (selectedValue) {
      setField(key, selectedValue);
    }
  }, [selectedValue]);

  return (
    <View className="flex-1 px-2 pt-4 pb-6 bg-white/50 rounded-xl z-50">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      <View className="px-5 -ml-2 mt-2 z-100">
        <DropDownPicker
          open={open}
          value={selectedValue}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => {
            const newValue =
              typeof callback === "function"
                ? callback(selectedValue)
                : callback;
            setSelectedValue(newValue);
            return newValue;
          }}
          setItems={setItems}
          placeholder="Select..."
          style={{
            borderColor: "#ccc",
            height: 40,
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
            backgroundColor: "#fff",
          }}
          labelStyle={{
            color: "#222",
          }}
          textStyle={{
            color: "#222",
          }}
          placeholderStyle={{
            color: "#999",
          }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>
    </View>
  );
};

export default Profile;
