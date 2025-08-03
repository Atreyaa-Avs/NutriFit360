import { useRouter } from "expo-router";
import { useState } from "react";
import {
  BackHandler,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  Alert,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  danger?: boolean;
}

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  danger = false,
}: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center justify-between p-4 bg-white rounded-xl mb-2 ${
      danger ? "border-l-4 border-red-500" : ""
    }`}
    disabled={showSwitch}
  >
    <View className="flex-row items-center flex-1">
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
        danger ? "bg-red-100" : "bg-primary/10"
      }`}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#ef4444" : "#F09E54"}
        />
      </View>
      <View className="flex-1">
        <Text className={`text-base font-semibold ${
          danger ? "text-red-600" : "text-gray-900"
        }`}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
    </View>
    {showSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: "#e5e7eb", true: "#F09E54" }}
        thumbColor={switchValue ? "#ffffff" : "#f3f4f6"}
      />
    ) : showArrow ? (
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    ) : null}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useColorScheme();
  
  // State for toggles
  const [notifications, setNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [hydrationReminders, setHydrationReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(drawer)/(tabs)/home");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
          // Handle logout logic here
          router.replace("/(auth)/login");
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          // Handle account deletion logic here
        }},
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E5E5E5]">
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme === "dark" ? "#1a1a1a" : "#E5E5E5"}
      />
      
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Settings</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Profile</Text>
          <SettingItem
            icon="person"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => {/* Navigate to edit profile */}}
          />
          <SettingItem
            icon="fitness"
            title="Fitness Goals"
            subtitle="Set your workout and weight goals"
            onPress={() => {/* Navigate to fitness goals */}}
          />
          <SettingItem
            icon="restaurant"
            title="Dietary Preferences"
            subtitle="Manage your food preferences and restrictions"
            onPress={() => {/* Navigate to dietary preferences */}}
          />
        </View>

        {/* App Preferences */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">App Preferences</Text>
          <SettingItem
            icon="moon"
            title="Dark Mode"
            subtitle="Switch between light and dark themes"
            showSwitch={true}
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
            showArrow={false}
          />
          <SettingItem
            icon="language"
            title="Language"
            subtitle="English"
            onPress={() => {/* Navigate to language settings */}}
          />
          <SettingItem
            icon="speedometer"
            title="Units"
            subtitle="Metric (kg, km)"
            onPress={() => {/* Navigate to units settings */}}
          />
        </View>

        {/* Notifications */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Notifications</Text>
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Receive app notifications"
            showSwitch={true}
            switchValue={notifications}
            onSwitchChange={setNotifications}
            showArrow={false}
          />
          <SettingItem
            icon="fitness"
            title="Workout Reminders"
            subtitle="Get reminded about your workouts"
            showSwitch={true}
            switchValue={workoutReminders}
            onSwitchChange={setWorkoutReminders}
            showArrow={false}
          />
          <SettingItem
            icon="restaurant"
            title="Meal Reminders"
            subtitle="Get reminded about your meals"
            showSwitch={true}
            switchValue={mealReminders}
            onSwitchChange={setMealReminders}
            showArrow={false}
          />
          <SettingItem
            icon="water"
            title="Hydration Reminders"
            subtitle="Get reminded to drink water"
            showSwitch={true}
            switchValue={hydrationReminders}
            onSwitchChange={setHydrationReminders}
            showArrow={false}
          />
        </View>

        {/* Privacy & Security */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Privacy & Security</Text>
          <SettingItem
            icon="finger-print"
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID to unlock"
            showSwitch={true}
            switchValue={biometricAuth}
            onSwitchChange={setBiometricAuth}
            showArrow={false}
          />
          <SettingItem
            icon="lock-closed"
            title="Change Password"
            subtitle="Update your account password"
            onPress={() => {/* Navigate to change password */}}
          />
          <SettingItem
            icon="shield-checkmark"
            title="Privacy Settings"
            subtitle="Manage your data and privacy"
            onPress={() => {/* Navigate to privacy settings */}}
          />
        </View>

        {/* Data & Storage */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Data & Storage</Text>
          <SettingItem
            icon="cloud-upload"
            title="Backup Data"
            subtitle="Backup your progress to cloud"
            onPress={() => {/* Navigate to backup */}}
          />
          <SettingItem
            icon="download"
            title="Export Data"
            subtitle="Download your data as CSV"
            onPress={() => {/* Navigate to export */}}
          />
          <SettingItem
            icon="trash"
            title="Clear Cache"
            subtitle="Free up storage space"
            onPress={() => {
              Alert.alert("Clear Cache", "Cache cleared successfully!");
            }}
          />
        </View>

        {/* Support */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Support</Text>
          <SettingItem
            icon="help-circle"
            title="Help & FAQ"
            subtitle="Find answers to common questions"
            onPress={() => {/* Navigate to help */}}
          />
          <SettingItem
            icon="chatbubble"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {/* Navigate to contact support */}}
          />
          <SettingItem
            icon="star"
            title="Rate App"
            subtitle="Rate us on the App Store"
            onPress={() => {/* Open app store rating */}}
          />
          <SettingItem
            icon="share"
            title="Share App"
            subtitle="Share with friends and family"
            onPress={() => {/* Share app */}}
          />
        </View>

        {/* About */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">About</Text>
          <SettingItem
            icon="information-circle"
            title="App Version"
            subtitle="1.0.0"
            showArrow={false}
          />
          <SettingItem
            icon="document-text"
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => {/* Navigate to terms */}}
          />
          <SettingItem
            icon="shield"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => {/* Navigate to privacy policy */}}
          />
        </View>

        {/* Account Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Account</Text>
          <SettingItem
            icon="log-out"
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            danger={true}
          />
          <SettingItem
            icon="trash"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={handleDeleteAccount}
            danger={true}
          />
        </View>

        {/* App Info */}
        <View className="items-center py-6">
          <Text className="text-sm text-gray-500">NutriFit360</Text>
          <Text className="text-xs text-gray-400 mt-1">Your complete fitness companion</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
