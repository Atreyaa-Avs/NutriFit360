import { View, Text, ActivityIndicator } from "react-native";
import AcceptSvg from "@/assets/svgs/diet/accept.svg";
import RejectSvg from "@/assets/svgs/diet/reject.svg";
import React from "react";

interface PingAPISettingsProps {
    ipAddress: string
}

const PingAPISettings = ({ipAddress}: PingAPISettingsProps) => {
  return (
    <View className="flex-col justify-between pt-5">
      <View className="flex-row justify-between">
        <Text>Pinging {ipAddress}...</Text>
        <ActivityIndicator />
      </View>
      <View className="flex-row items-center gap-3">
        <AcceptSvg width={20} height={20} />
        <View className="flex-row flex-wrap items-center gap-2">
            <Text>Successfully Connected to:</Text>
            <Text className="bg-primary p-1 px-2 text-white rounded-xl text-sm">{ipAddress}</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <RejectSvg width={20} height={20} />
        <Text>Error occured, try again.</Text>
      </View>
    </View>
  );
};

export default PingAPISettings;
