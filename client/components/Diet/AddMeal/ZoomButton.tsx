import ZoomSvg from "@/assets/svgs/diet/zoom.svg";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ZoomButtonProps {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomVals = ["1x","2x","3x","5x"]

const ZoomButton = ({ setZoom }: ZoomButtonProps) => {
  const [clicked, setClicked] = useState(true);
  const [zoomValue,setZoomValue] = useState()
  return (
    <View
      className="flex-col items-center gap-1 p-3 px-6 bg-gray-400 rounded-xl"
      style={{ elevation: 6 }}
    >
      <Pressable
        onPress={() => {
          setZoom(clicked ? 1 : 0);
          setClicked(!clicked);
        }}
        className="flex-col items-center"
      >
        <ZoomSvg width={24} height={24} stroke={clicked ? "black" : "white"} />
        <Text className={`${clicked ? "text-black" : "text-neutral-300"}`}>
          Zoom
        </Text>
      </Pressable>
    </View>
  );
};

export default ZoomButton;
