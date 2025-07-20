import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageModalProps {
  imageUri: string | null;
  visible: boolean;
  onClose: () => void;
}

type NutritionInfoProps = {
  title: string;
  //   percentage: number;
  //   color: string;
  amount: number;
};

const ImageModal: React.FC<ImageModalProps> = ({
  imageUri,
  visible,
  onClose,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    setLoading(true);
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      onClose();
      router.push(
        `/(drawer)/(tabs)/diet/AnalyzeRecipe?imageBase64=${encodeURIComponent(base64)}`
      );
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent} className="">
          <View className="mb-10">
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePreview}
                resizeMode="contain"
              />
            )}
          </View>
          {/* <View className="p-3 px-5 bg-neutral-300 rounded-xl">
            <Text className="mb-2 text-xl font-bold">Estimated Nutrition:</Text>
            <Text className="">Carbs:</Text>
            <View className="w-full my-2">
              <AnimatedBar percentage={50} color="#8EFBFC" />
            </View>
            <Text className="">Protein:</Text>
            <View className="w-full my-2">
              <AnimatedBar percentage={70} color="#BFFA64" />
            </View>
            <NutritionInfo title={"Fats"} percentage={75} color={"#FA111E"} />
          </View> */}

          {/** Estimated Nutrition **/}
          {/* <View className="p-3 px-5 mb-4 bg-neutral-300 rounded-xl">
            <Text className="mb-2 text-xl font-bold underline">
              Estimated Nutrition:
            </Text>
            <NutritionInfo title={"Carbs"} amount={45} />
            <NutritionInfo title={"Protein"} amount={45} />
            <NutritionInfo title={"Fats"} amount={45} />
          </View> */}

          {/* Buttons */}
          <View className="flex-row justify-between w-full px-4">
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              className="bg-[#ddd]"
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleProceed}
              style={styles.closeButton}
              className="bg-[#333] flex-row items-center justify-center w-32 h-11"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white" style={styles.closeButtonText}>
                  Proceed
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// const NutritionInfo = ({ title, percentage, color }: NutritionInfoProps) => {
//   return (
//     <View className="w-full my-2">
//       <View>
//         <Text className="">{title}:</Text>
//         <Text></Text>
//       </View>
//       <View className="-mt-3">
//         <AnimatedBar percentage={percentage} color={color} />
//       </View>
//     </View>
//   );
// };

const NutritionInfo = ({ title, amount }: NutritionInfoProps) => {
  return (
    <View className="flex-row justify-between w-full my-2">
      <Text>{title}:</Text>
      <Text>{amount}g</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    width: "80%",
  },
  imagePreview: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});

export default ImageModal;
