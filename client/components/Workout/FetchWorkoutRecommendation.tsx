import { useResponse } from "@/hooks/useResponse";
import { useProfileStore } from "@/store/useProfileStore";
import { mapProfileToRequestBody } from "@/utils/mapProfileToRequestBody";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Spinner from "../Loaders/Spinner";

const FetchWorkoutRecommendation = () => {
  const profile = useProfileStore();
  const body = mapProfileToRequestBody(profile);

  const { data, isLoading, isFetching, error, refetch } = useResponse(
    body,
    "Workout",
    false
  );

  return (
    <View>
      <View className="p-3 my-3 bg-blue-500 rounded-xl">
        <Pressable onPress={() => refetch()}>
          <View className="flex-row items-center justify-center gap-12">
            <Text className="text-xl text-center text-white">
              Fetch Recommendation
            </Text>
            {isFetching && <Spinner size={30} />}
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
          <Text className="mb-3 text-2xl font-bold">Workout:</Text>
          <View className="flex-col gap-4">
            <View>
              <CardWrapper
                title="Exercises"
                res={data?.recommendations[0]?.Exercises}
                indx={1}
              />
            </View>
            <View>
              <CardWrapper
                title="Equipment"
                res={data?.recommendations[0]?.Equipment}
                indx={2}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

type CardWrapperProps = {
  title: string;
  res: string;
  indx: number;
};

const formatItems = (ele: string): string => {
  let formattedItems = ele;

  if (formattedItems.endsWith(".")) {
    formattedItems = formattedItems.slice(0, -1);
  }

  let individualItems = formattedItems.split(",");

  const lastIndex = individualItems.length - 1;
  const lastItem = individualItems[lastIndex]?.trim();

  if (lastItem.startsWith("and")) {
    individualItems[lastIndex] = lastItem.slice(3).trim();
  } else if (lastItem.startsWith("or")) {
    individualItems[lastIndex] = lastItem.slice(2).trim();
  }

  formattedItems = individualItems.join(",");

  return formattedItems;
};

const CardWrapper = ({ title, res, indx }: CardWrapperProps) => {
  return (
    <View className="rounded-lg">
      <View className="flex-row justify-center gap-1 py-3 rounded-t-lg bg-primary">
        <Text className="text-xl font-bold text-center text-neutral-900">
          {indx}.
        </Text>
        <Text className="text-xl font-bold text-center underline text-neutral-900">
          {title}
        </Text>
      </View>
      <View className="flex-row flex-wrap p-2 pb-4 bg-white rounded-b-lg">
        {formatItems(res)
          .split(",")
          .map((ele, indx) => (
            <Card key={indx} val={ele} />
          ))}
      </View>
    </View>
  );
};

type CardProps = {
  val: string;
};

const Card = ({ val }: CardProps) => {
  return (
    <View
      className="flex-1 min-w-[32%] p-3 m-2 bg-[#ccc] rounded-md"
      style={{ elevation: 4 }}
    >
      <Text className="font-medium text-center capitalize"> {val} </Text>
    </View>
  );
};

export default FetchWorkoutRecommendation;
