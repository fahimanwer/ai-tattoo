import { Color } from "@/src/constants/TWPalette";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

// Conditionally import NativeTabs only on native platforms
let NativeTabs: any;
let Icon: any;
let Label: any;

if (Platform.OS !== "web") {
  const nativeTabs = require("expo-router/unstable-native-tabs");
  NativeTabs = nativeTabs.NativeTabs;
  Icon = nativeTabs.Icon;
  Label = nativeTabs.Label;
}

export default function TabLayout() {
  // Use standard Tabs for web
  if (Platform.OS === "web") {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="tattoos"
          options={{
            title: "My Tattoos",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    );
  }

  // Use NativeTabs for iOS/Android
  return (
    <NativeTabs
      disableTransparentOnScrollEdge={true}
      tintColor={Color.slate[50]}
    >
      <NativeTabs.Trigger name="(home)">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="camera-view">
        <Label>Try On Tattoo</Label>
        <Icon sf="camera.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tattoos">
        <Label>My Tattoos</Label>
        <Icon sf="photo.fill.on.rectangle.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
