import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const CameraComponent = () => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg mb-4">We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView
        className="flex-1"
        facing="back"
        active={true}
      />
      <Text>OP</Text>
    </SafeAreaView>
  );
};

export default CameraComponent;
