import Banner from "@/components/Profile/Banner";
import Details from "@/components/Profile/Details";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View className="flex-1 bg-[#E5E5E5] pb-36 -mt-10 px-4 pt-2 min-h-screen -mb-5">
              {/* <Text className="text-3xl font-bold text-center">Profile</Text> */}
              <Banner />
              <Text className="mt-6 text-3xl font-bold text-center underline">
                Details
              </Text>
              <Details />
              <View className="flex-row flex-wrap w-full gap-4 mt-4">
                <Card
                  Icon={AgeSvg}
                  title={"Age"}
                  unit={"years"}
                  defaultVal={19}
                />
                <Card
                  Icon={BMISvg}
                  title={"BMI"}
                  unit={"kg/m²"}
                  defaultVal={26}
                />
                <Card
                  Icon={HeightSvg}
                  title={"Height"}
                  unit={"m"}
                  defaultVal={1.6}
                />
                <Card
                  Icon={WeightSvg}
                  title={"Weight"}
                  unit={"kg"}
                  defaultVal={68}
                />
                <DropDownCard
                  Icon={GenderSvg}
                  title={"Gender"}
                  defaultVal={"male"}
                  arrVals={["male", "female"]}
                />
                <CheckboxCard Icon={HypertensionSvg} title={"Hypertension"} />
                <CheckboxCard Icon={DiabetesSvg} title={"Diabetes"} />
                <DropDownCard
                  Icon={FitnessLevelSvg}
                  title={"Fitness Level"}
                  defaultVal="normal"
                  arrVals={["underweight", "normal", "overweight", "obese"]}
                />
                <DropDownCard
                  Icon={FitnessGoalSvg}
                  title={"Fitness Goal"}
                  defaultVal="Weight Loss"
                  arrVals={["Weight Loss", "Weight Gain"]}
                />
                <DropDownCard
                  Icon={FitnessTypeSvg}
                  title={"Fitness Type"}
                  defaultVal="Muscular Fitness"
                  arrVals={["Muscular Fitness", "Cardio Fitness"]}
                />
              </View>
              <TouchableOpacity onPress={handleSave}>
                <View className="flex-row items-center justify-center gap-3 p-3 mt-6 bg-blue-500 rounded-xl">
                  <SaveSvg width={20} height={20} fill={"#fff"} />
                  <Text className="text-xl font-semibold text-white">Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
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
    <View className="w-[48%] px-2 py-2 bg-white/50 rounded-xl">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>
      <View className="flex-row items-end justify-between px-5 mt-2 ml-4">
        <TextInput
          value={(value ?? "").toString()}
          onChangeText={(text) =>
            setField(key, text === "" ? 0 : parseFloat(text))
          }
          keyboardType="numeric"
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

  return (
    <View className="w-[48%] px-2 py-2 bg-white/50 rounded-xl">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      <View className="px-5 -ml-2">
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            setField(
              key,
              itemValue
                .toString()
                .split(" ")
                .map(
                  (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                )
                .join(" ")
            );
          }}
          style={{
            height: 50,
            width: 160,
            fontSize: 16,
          }}
          dropdownIconColor="transparent"
        >
          {(arrVals ?? []).map((val, idx) => (
            <Picker.Item
              key={idx}
              label={val.charAt(0).toUpperCase() + val.slice(1)}
              value={val.toLowerCase()}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const CheckboxCard = ({ title, Icon }: CardProps) => {
  const value = useProfileStore(
    (state) => state[title.toLowerCase() as keyof typeof state]
  );
  const setField = useProfileStore((state) => state.setField);
  const key = title.toLowerCase() as ProfileKey;

  return (
    <View className="w-[48%] px-2 py-2 bg-white/50 rounded-xl">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      <View className="px-5 ml-4">
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => setField(key, itemValue)}
          style={{
            height: 50,
            width: 120,
            fontSize: 18,
          }}
          dropdownIconColor="#333"
        >
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>
    </View>
  );
};

export default Profile;
