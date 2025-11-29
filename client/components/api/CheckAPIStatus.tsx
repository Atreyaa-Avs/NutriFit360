import AcceptSvg from "@/assets/svgs/diet/accept.svg";
import RejectSvg from "@/assets/svgs/diet/reject.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import Spinner from "../Loaders/Spinner";
import { useMMKVString } from "react-native-mmkv";

const CheckAPIStatus = () => {
  const [IP] = useMMKVString("IP");

  // Separate logs for each request
  const [ipLogs, setIPLogs] = useState<string[]>([]);
  const [dummyLogs, setDummyLogs] = useState<string[]>([]);

  // Query for IP backend
  const ipQuery = useQuery({
    queryKey: ["API Status", IP],
    queryFn: async () => {
      if (!IP) throw new Error("IP not set");
      const url = `http://${IP}:8080/`;
      setIPLogs((prev) => [...prev, `Request: GET ${url}`]);
      const res = await axios.get(url);
      setIPLogs((prev) => [...prev, `Response: ${JSON.stringify(res.data)}`]);
      return res.data;
    },
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Query for dummy hosted URL
  const dummyURL = "https://jsonplaceholder.typicode.com/todos/1";
  const dummyQuery = useQuery({
    queryKey: ["Dummy API Status", dummyURL],
    queryFn: async () => {
      setDummyLogs((prev) => [...prev, `Request: GET ${dummyURL}`]);
      const res = await axios.get(dummyURL);
      setDummyLogs((prev) => [...prev, `Response: ${JSON.stringify(res.data)}`]);
      return res.data;
    },
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Helper to render status icon
  const renderStatusIcon = (isLoading: boolean, isFetched: boolean, error: any) => {
    if (isLoading) return <Spinner size={30} />;
    if (isFetched && !error) return <AcceptSvg width={32} height={32} />;
    if (error) return <RejectSvg width={32} height={32} />;
    return null;
  };

  return (
    <View className="space-y-4">
      {/* IP API */}
      <View className="p-3 border-[3px] border-[#ccc] rounded-xl">
        <View className="flex-row items-center justify-between pl-1 pr-3">
          <Pressable
            onPress={() => {
              setIPLogs([]);
              ipQuery.refetch();
            }}
            disabled={ipQuery.isLoading || !IP}
            style={{
              backgroundColor: ipQuery.isLoading || !IP ? "#ccc" : "#007bff",
            }}
            className="flex-row items-center justify-center px-6 py-3 rounded-xl"
          >
            <Text className="text-base text-white">Check IP API Status</Text>
          </Pressable>

          {renderStatusIcon(ipQuery.isLoading, ipQuery.isFetched, ipQuery.error)}
        </View>

        {!IP && (
          <Text className="mt-2 text-sm text-red-500">
            No IP set. Please configure your backend IP first.
          </Text>
        )}

        {ipLogs.length > 0 && (
          <ScrollView className="p-2 mt-3 bg-gray-100 max-h-40 rounded-xl">
            {ipLogs.map((log, idx) => (
              <Text key={idx} className="text-xs text-gray-800">
                {log}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Dummy API */}
      <View className="p-3 border-[3px] border-[#ccc] rounded-xl">
        <View className="flex-row items-center justify-between pl-1 pr-3">
          <Pressable
            onPress={() => {
              setDummyLogs([]);
              dummyQuery.refetch();
            }}
            disabled={dummyQuery.isLoading}
            style={{
              backgroundColor: dummyQuery.isLoading ? "#ccc" : "#16a34a",
            }}
            className="flex-row items-center justify-center px-6 py-3 rounded-xl"
          >
            <Text className="text-base text-white">Check Dummy API</Text>
          </Pressable>

          {renderStatusIcon(dummyQuery.isLoading, dummyQuery.isFetched, dummyQuery.error)}
        </View>

        {dummyLogs.length > 0 && (
          <ScrollView className="p-2 mt-3 bg-gray-100 max-h-40 rounded-xl">
            {dummyLogs.map((log, idx) => (
              <Text key={idx} className="text-xs text-gray-800">
                {log}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CheckAPIStatus;
