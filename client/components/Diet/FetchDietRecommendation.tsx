import { useResponse } from "@/hooks/useResponse";
import { useProfileStore } from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Spinner from "../Loaders/Spinner";

const FetchDietRecommendation = () => {
  const profile = useProfileStore();
  const body = mapProfileToRequestBody(profile);

  const { data, isLoading, isFetching, error, refetch } = useResponse(
    body,
    "Diet",
    false
  );

  return (
    <View>
      <View className="p-3 my-3 bg-blue-500 rounded-xl">
        <Pressable onPress={() => refetch()}>
          <View className="flex-row items-center justify-center gap-2">
            {isFetching && <Spinner size={25} />}
            <Text className="text-xl text-center text-white">
              {!isFetching ? "Fetch Recommendation" : "Fetching..."}
            </Text>
          </View>
        </Pressable>
      </View>

      {isLoading && <Text className="mt-2 text-white">Loading...</Text>}
      {error && (
        <Text className="mt-2 text-red-200">
          Error: {JSON.stringify(error)}
        </Text>
      )}
      {data && (
        <View className="p-2 rounded">
          <Text className="mb-3 text-2xl font-bold">Diet:</Text>
          <View className="flex-col gap-4">
            {data?.recommendations[0]?.Diet?.split(";").map(
              (ele: string, indx: number) => (
                <CardWrapper key={indx} res={ele} indx={indx + 1} />
              )
            )}
          </View>
        </View>
      )}
    </View>
  );
};

type CardWrapperProps = {
  res: string;
  indx: number;
};

const formatItems = (ele: string): string => {
  let formattedItems = ele.slice(2, -1);
  const individualItems = formattedItems.split(",");

  const lastIndex = individualItems.length - 1;
  const lastItem = individualItems[lastIndex]?.trim();

  if (lastItem?.startsWith("and")) {
    individualItems[lastIndex] = lastItem.slice(3).trim();
  }

  formattedItems = individualItems.join(",");

  return formattedItems;
};

const CardWrapper = ({ res, indx }: CardWrapperProps) => {
  const formattedResponse = res.split(":");

  // Format the right-hand part
  formattedResponse[1] = formatItems(formattedResponse[1]);

  return (
    <View className="rounded-lg">
      <View className="flex-row justify-center gap-1 py-3 rounded-t-lg bg-primary">
        <Text className="text-xl font-bold text-center text-neutral-900">
          {indx}.
        </Text>
        <Text className="text-xl font-bold text-center underline text-neutral-900">
          {formattedResponse[0]}
        </Text>
      </View>

      <View className="flex-row flex-wrap p-3 bg-white rounded-b-lg">
        {formattedResponse[1].split(",").map((ele, index) => (
          <Card key={index} ele={ele.trim()} />
        ))}
      </View>
    </View>
  );
};

type CardProps = {
  ele: string;
};

const Card = ({ ele }: CardProps) => {
  return (
    <View
      className="flex-1 min-w-[32%] p-3 m-2 bg-[#ccc] rounded-md"
      style={{ elevation: 4 }}
    >
      <Text className="font-medium text-center"> {ele} </Text>
    </View>
  );
};

export default FetchDietRecommendation;
