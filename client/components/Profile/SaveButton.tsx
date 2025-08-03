import SaveSvg from "@/assets/svgs/profile/save.svg";
import { useProfileStore } from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import * as LocalAuthentication from "expo-local-authentication";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const SaveButton = () => {
  const handleSave = async () => {
    // 1. Check if device supports biometrics
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    // 2. Check if any biometrics are enrolled
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      saveProfile();
      return;
    }

    // Authenticate
    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to save profile",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
    });

    if (!authResult.success) {
      Alert.alert("Authentication Failed", "Could not verify your identity.");
      return;
    }

    saveProfile();
  };

  const saveProfile = () => {
    const profile = useProfileStore.getState();
    const body = mapProfileToRequestBody(profile);
    Alert.alert("Success", "Profile saved!");
    console.log("Final Request Body: ", body);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSave}>
        <View className="flex-row items-center justify-center gap-3 p-3 mt-6 bg-blue-500 rounded-xl">
          <SaveSvg width={20} height={20} fill={"#fff"} />
          <Text className="text-xl font-semibold text-white">Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SaveButton;
