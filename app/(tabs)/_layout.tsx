import { Color } from "@/constants/TWPalette";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
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
