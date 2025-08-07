import Banner from "@/components/Profile/Banner";
import Details from "@/components/Profile/Details";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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

import WeightSvg from "@/assets/svgs/profile/weight.svg";
import SaveButton from "@/components/Profile/SaveButton";
import {
  ProfileState,
  titleToKey,
  useProfileStore,
} from "@/store/useProfileStore";
import { SvgProps } from "react-native-svg";

const Profile = () => {
  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 bg-[#E5E5E5] px-4"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // <- important for tap handling
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View className="pt-2 min-h-screen -mb-5">
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
                  defaultVal={58}
                />

                <DropDownCard
                  Icon={GenderSvg}
                  title={"Gender"}
                  defaultVal={"male"}
                  arrVals={["male", "female"]}
                />
                <CheckboxCard
                  Icon={HypertensionSvg}
                  title={"Hypertension"}
                  arrVals={["Yes", "No"]}
                />
                <CheckboxCard
                  Icon={DiabetesSvg}
                  title={"Diabetes"}
                  arrVals={["Yes", "No"]}
                />
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

              <SaveButton />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

const DropDownCard = ({ title, Icon, arrVals }: CardProps) => {
  const key = titleToKey[title];
  const selectedValue = useProfileStore((state) => state[key]);
  const setField = useProfileStore((state) => state.setField);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (val: string) => {
    const formatted = val
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
    setField(key, formatted);
    setModalVisible(false);
  };

  return (
    <View className="w-[48%] px-2 py-2 bg-white/50 rounded-xl">
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      <View className="pl-2">
        <TouchableOpacity
          className="px-5 -ml-2 mt-2 border border-gray-300 rounded-md py-2"
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {typeof selectedValue === "string" ||
            typeof selectedValue === "number"
              ? selectedValue
              : "Select"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="bg-white mx-6 rounded-lg p-4">
            <Text className="text-lg font-bold mb-4">Select {title}</Text>
            <FlatList
              data={arrVals ?? []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-base">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 p-3 bg-gray-300 rounded-md"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CheckboxCard = ({ title, Icon, arrVals }: CardProps) => {
  const key = titleToKey[title] ?? title.toLowerCase();
  const selectedValue = useProfileStore((state) => state[key]);
  const setField = useProfileStore((state) => state.setField);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (val: string) => {
    setField(key, val.toLowerCase());
    setModalVisible(false);
  };

  return (
    <View className="w-[48%] px-2 py-2 bg-white/50 rounded-xl">
      {/* Label */}
      <View className="flex-row items-center gap-3 pt-1 pl-2">
        <Icon width={24} height={24} />
        <Text>{title}</Text>
      </View>

      {/* Selected Value Button */}
      <View className="pl-4">
        <TouchableOpacity
          className="px-2 -ml-2 mt-2 border border-gray-300 rounded-md py-2"
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {selectedValue
              ? selectedValue.toString().charAt(0).toUpperCase() +
                selectedValue.toString().slice(1)
              : "Select"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="bg-white mx-6 rounded-lg p-4">
            <Text className="text-lg font-bold mb-4">Select {title}</Text>

            <FlatList
              data={arrVals}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-base">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              className="mt-4 p-3 bg-gray-300 rounded-md"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
