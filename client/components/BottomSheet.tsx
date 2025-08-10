import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import Wheel from "./Wheel";

const AccessibleHandle = ({ close }: { close: () => void }) => (
  <Pressable
    onPress={close}
    accessibilityRole="button"
    accessibilityLabel="Drag or tap to close"
    style={{
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    }}
  >
    <View
      style={{
        width: 40,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#888",
      }}
    />
    <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
      Drag or Tap to Close
    </Text>
  </Pressable>
);

const BottomSheetComponent = forwardRef((_, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { width } = Dimensions.get("window");

  const snapPoints = useMemo(() => ["40%", "80%"], []);

  const open = () => sheetRef.current?.snapToIndex(1);
  const close = () => sheetRef.current?.close();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1} // start closed
      snapPoints={snapPoints}
      enablePanDownToClose
      enableContentPanningGesture={false}
      handleComponent={() => <AccessibleHandle close={close} />}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Wheel />
          <Wheel />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetComponent;
