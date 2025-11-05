import { Color } from "@/constants/TWPalette";
import React from "react";
import { Platform } from "react-native";

// Conditionally import NativeTabs only on native platforms
// undo this crap later haha
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
    return <></>;
  }

  // Use NativeTabs for iOS/Android
  return (
    <NativeTabs
      disableTransparentOnScrollEdge={true}
      tintColor={Color.slate[50]}
    >
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tattoos">
        <Label>My Tattoos</Label>
        <Icon sf="photo.fill.on.rectangle.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile" role="search">
        <Label>Profile</Label>
        <Icon sf="person.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
