import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";

interface MediaComponentProps {
  openGallery: boolean;
  onGalleryOpened?: () => void; // to notify parent after opening
}

const MediaComponent: React.FC<MediaComponentProps> = ({
  openGallery,
  onGalleryOpened,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  

  useEffect(() => {
    if (openGallery) {
      pickImage();
    }
  }, [openGallery]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "We need access to your media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 0,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImages((prev) => [...prev, ...uris]);
    }

    // Optionally notify parent that gallery was opened
    onGalleryOpened?.();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.gallery}>
        {selectedImages.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 12,
  //   backgroundColor: "#fff",
  // },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
});

export default MediaComponent;
