import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

/**
 * Opens the image gallery and returns selected image URIs.
 * @param selectionLimit Number of images to allow (1 = single, 0 = unlimited)
 * @returns A list of selected image URIs, or null if cancelled or denied
 */

export const openImageGallery = async (
  selectionLimit: number = 1
): Promise<string[] | null> => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert("Permission required", "We need access to your media library.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: selectionLimit !== 1,
    selectionLimit,
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets.map((asset) => asset.uri);
};
