import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

interface CameraComponentProps {
  flash?: boolean;
  zoom: number;
  setCameraRef?: (ref: CameraType | null) => void;
}

const CameraComponent = ({
  flash,
  zoom,
  setCameraRef,
}: CameraComponentProps) => {
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
        zoom={zoom}
        responsiveOrientationWhenOrientationLocked
      />
    </SafeAreaView>
  );
};

export default CameraComponent;
