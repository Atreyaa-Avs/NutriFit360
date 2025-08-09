import GallerySvg from "@/assets/svgs/diet/gallery.svg";
import ImageModal from "@/components/Diet/AddMeal/ImageModal";
import { GilroyMediumText } from "@/components/Fonts";
import { openImageGallery } from "@/utils/imagePicker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

const GalleryButton = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenGallery = async () => {
    const uris = await openImageGallery(1); // allow one image
    if (uris && uris.length > 0) {
      setSelectedImage(uris[0]);
      setModalVisible(true);
    }
  };

  return (
    <View
      className="flex-col p-3 bg-gray-400 rounded-xl"
      style={{ elevation: 6 }}
    >
      <Pressable onPress={handleOpenGallery} className="items-center gap-1">
        <GallerySvg width={24} height={24} color={"#000"} />
        <GilroyMediumText>Gallery</GilroyMediumText>
      </Pressable>

      <ImageModal
        imageUri={selectedImage}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default GalleryButton;
