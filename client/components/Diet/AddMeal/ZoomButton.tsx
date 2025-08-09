import ZoomSvg from "@/assets/svgs/diet/zoom.svg";
import { GilroyMediumText } from "@/components/Fonts";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  View,
  findNodeHandle,
  UIManager,
} from "react-native";
import Slider from "@react-native-community/slider";

interface ZoomButtonProps {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomButton = ({ setZoom }: ZoomButtonProps) => {
  const [clicked, setClicked] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomValue, setZoomValue] = useState(1);
  const [buttonPos, setButtonPos] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const buttonRef = useRef<View>(null);

  const measureButton = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        setButtonPos({ x, y, width, height });
      });
    }
  };

  useEffect(() => {
    if (modalVisible) {
      measureButton();
    }
  }, [modalVisible]);

  return (
    <>
      {/* Main Button */}
      <View
        ref={buttonRef}
        className="flex-col items-center gap-1 p-3 px-6 bg-gray-400 rounded-xl"
        style={{ elevation: 6 }}
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          className="flex-col items-center"
        >
          <ZoomSvg
            width={24}
            height={24}
            stroke={clicked ? "black" : "white"}
          />
          <GilroyMediumText
            className={`${clicked ? "text-black" : "text-neutral-300"}`}
          >
            Zoom
          </GilroyMediumText>
        </Pressable>
      </View>

      {/* Popover Zoom Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <View
            style={{
              position: "absolute",
              left: buttonPos.x - 100,
              top: buttonPos.y - 80, // 80px above button
            }}
          >
            {/* Triangle pointer */}
            <View
              style={{
                position: "absolute",
                top: "100%",
                right: (buttonPos.width + 100) / 5 - 8,
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderLeftWidth: 11,
                borderRightWidth: 11,
                borderBottomWidth: 11,
                transform: [{ rotate: "180deg" }],
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "white",
              }}
            />

            {/* Slider container */}
            <View
              style={{
                width: buttonPos.width + 100,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 12,
                bottom: -1,
              }}
            >
              <View className="mt-2">
                <Slider
                  minimumValue={0}
                  maximumValue={1}
                  step={0.1}
                  value={zoomValue}
                  onValueChange={(val) => {
                    // Update only local state for smooth dragging
                    const rounded = Math.round(val * 10) / 10;
                    setZoomValue(rounded);
                  }}
                  onSlidingComplete={(val) => {
                    // Commit final value to parent after release
                    const rounded = Math.round(val * 10) / 10;
                    setZoomValue(rounded);
                    setZoom(rounded);
                  }}
                  minimumTrackTintColor="#FFA445"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#FFA445"
                />
              </View>
              <GilroyMediumText className="mt-1 text-center">
                {Number(zoomValue.toFixed(1)) * 10}x
              </GilroyMediumText>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default ZoomButton;
