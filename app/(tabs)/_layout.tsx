import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>General</Label>
        <Icon sf="house" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="buttons">
        <Label>Buttons</Label>
        <Icon sf="button.programmable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inputs">
        <Label>Inputs</Label>
        <Icon sf="ellipsis.rectangle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="typography">
        <Label>Typography</Label>
        <Icon sf="character.cursor.ibeam" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
