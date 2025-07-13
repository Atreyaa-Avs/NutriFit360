import { useRouter } from "expo-router";
import { BackHandler, Platform, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();

  const handleBack = () => {
    // Try going back, or fallback
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(drawer)/(tabs)"); // or a specific screen
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleBack}>
        <Text>{"← Back"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
