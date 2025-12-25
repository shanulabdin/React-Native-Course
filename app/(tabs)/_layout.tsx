import { ImageBackground, Image, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const _Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 items-center justify-center rounded-full overflow-hidden"
              >
                <Image
                  source={icons.home}
                  tintColor="#151312"
                  className="size-5"
                />
                <Text
                  className="text-secondary text-base font-semibold ml-2"
                >Home</Text>
              </ImageBackground>
            </>
          ),
         }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{
          title: "Search",
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="saved" 
        options={{
          title: "Saved",
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          headerShown: false,
        }} 
      />
    </Tabs>
  );
}

export default _Layout;