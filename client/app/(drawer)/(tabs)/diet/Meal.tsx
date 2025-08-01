import AnimatedBar from "@/components/Diet/AddMeal/AnimatedBar";
import CameraButton from "@/components/Diet/AddMeal/CameraButton";
import GalleryButton from "@/components/Diet/AddMeal/GalleryButton";
import CameraComponent from "@/components/Diet/CameraComponent";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import FlashlightOff from "@/assets/svgs/diet/flashlight-off.svg";
import FlashlightOn from "@/assets/svgs/diet/flashlight-on.svg";
import ZoomButton from "@/components/Diet/AddMeal/ZoomButton";
import { Camera } from "expo-camera";

const Meal = () => {
  const [flash, setFlash] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <React.Fragment>
      {hasPermission && (
        <View className="flex-1">
          <View className="absolute -top-36 bottom-0 left-0 right-0 z-0">
            <CameraComponent flash={flash} zoom={zoom} />
          </View>
          {/* Foreground content */}
          <View className="z-10 gap-12 mt-14">
            <View className="mt-2">
              <Text className="text-xl font-bold text-center text-white">
                Place the meal inside the box!
              </Text>
            </View>
            <View className="realtive z-0 flex-row mx-auto w-80 h-80 rounded-xl border-[5px] border-white bg-transparent" />
            <View className="flex-row items-center justify-between mx-4 mt-5">
              <GalleryButton />
              <CameraButton />
              <ZoomButton setZoom={setZoom} />
            </View>
            <View className="grid px-2 py-3 mx-auto -mt-8 bg-gray-400 rounded-2xl place-items-center">
              <Pressable
                className={flash ? "mt-0" : "-mt-2"}
                onPress={() => setFlash(!flash)}
              >
                {flash ? (
                  <FlashlightOn width={50} height={50} color={"#fff"} />
                ) : (
                  <FlashlightOff width={50} height={50} color={"#000"} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export default Meal;

interface NutritionInfoProps {
  title: string;
  percentage: number;
  color: string;
}

const NutritionInfo = ({ title, percentage, color }: NutritionInfoProps) => {
  return (
    <View className="w-full my-2">
      <View>
        <Text className="">{title}:</Text>
        <Text></Text>
      </View>
      <View className="-mt-3">
        <AnimatedBar percentage={percentage} color={color} />
      </View>
    </View>
  );
};
