import GallerySvg from "@/assets/svgs/diet/gallery.svg";
import React from "react";
import { Text, View } from "react-native";

const GalleryButton = () => {
  return (
    <View
      className="flex-col items-center bg-gray-400 p-3 rounded-xl"
      style={{ elevation: 6 }}
    >
      <GallerySvg width={24} height={24} color={"#000"}/>
      <Text>Gallery</Text>
    </View>
  );
};

export default GalleryButton;
