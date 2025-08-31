import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon sf="house" />
      </NativeTabs.Trigger>
      {/* <NativeTabs.Trigger name="buttons">
        <Label>Buttons</Label>
        <Icon sf="button.programmable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inputs">
        <Label>Inputs</Label>
        <Icon sf="ellipsis.rectangle" />
      </NativeTabs.Trigger> */}
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
