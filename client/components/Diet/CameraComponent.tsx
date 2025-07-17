import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

interface CameraComponentProps {
  flash?: boolean;
}

const CameraComponent = ({ flash }: CameraComponentProps) => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          We need camera permission
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        enableTorch={flash}
        active={true}
        zoom={0.3}
      />
    </SafeAreaView>
  );
};

export default CameraComponent;
