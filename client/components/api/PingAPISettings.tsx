import { View, Text, ActivityIndicator } from "react-native";
import AcceptSvg from "@/assets/svgs/diet/accept.svg";
import RejectSvg from "@/assets/svgs/diet/reject.svg";
import React from "react";
import { useDeveloperStore } from "@/store/useDeveloperStore";
import { useCheckAPI } from "@/hooks/useCheckAPI";

interface PingAPISettingsProps {
  enabled: boolean;
}

const PingAPISettings = ({ enabled }: PingAPISettingsProps) => {
  const { IP } = useDeveloperStore();

  const { data, isLoading, isError } = useCheckAPI();

  if (!enabled) return null; // Don't render anything until user presses Save

  return (
    <View className="flex-col justify-between pt-5">
      {isLoading && (
        <View className="flex-row items-center justify-between">
          <Text>Pinging {IP}...</Text>
          <ActivityIndicator />
        </View>
      )}

      {!isLoading && !isError && data && (
        <View className="flex-row items-center gap-3">
          <AcceptSvg width={20} height={20} />
          <View className="flex-row flex-wrap items-center gap-2">
            <Text>Successfully Connected to:</Text>
            <Text className="p-1 px-2 text-sm text-white bg-primary rounded-xl">
              {IP}
            </Text>
          </View>
        </View>
      )}

      {!isLoading && (isError || !data) && (
        <View className="flex-row items-center gap-3">
          <RejectSvg width={20} height={20} />
          <Text>Error occurred, try again.</Text>
        </View>
      )}
    </View>
  );
};

export default PingAPISettings;