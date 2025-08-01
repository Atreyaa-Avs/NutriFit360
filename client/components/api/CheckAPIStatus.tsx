import AcceptSvg from "@/assets/svgs/diet/accept.svg";
import RejectSvg from "@/assets/svgs/diet/reject.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Spinner from "../Loaders/Spinner";
import { IP } from "@/IP";

const CheckAPIStatus = () => {
  const { data, isLoading, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const res = await axios.get(`http://${IP}:8080/`);
      return res.data;
    },
    enabled: false,
  });

  const isLoadingNow = isLoading || isFetching;

  let StatusIcon = null;

  if (isLoadingNow) {
    StatusIcon = <Spinner size={30} />;
  } else if (isFetched && !error) {
    StatusIcon = <AcceptSvg width={32} height={32} />;
  } else if (error) {
    StatusIcon = <RejectSvg width={32} height={32} />;
  }

  const showStatusIcon = isFetched || isLoadingNow || error;

  return (
    <View className="p-3 border-[3px] border-[#ccc] rounded-xl">
      <View className="flex-row items-center justify-between pl-1 pr-3">
        <Pressable
          onPress={() => refetch()}
          disabled={isLoadingNow}
          style={{
            backgroundColor: isLoadingNow ? "#ccc" : "#007bff",
          }}
          className="flex-row items-center justify-center px-6 py-4 rounded-xl"
        >
          <Text className="text-base text-white">Check API Status</Text>
        </Pressable>

        {!!showStatusIcon && StatusIcon}
      </View>
    </View>
  );
};

export default CheckAPIStatus;
