import { Color } from "@/constants/TWPalette";
import { Ionicons } from "@expo/vector-icons";
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
  // if (Platform.OS === "web") {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.slate[50],
        tabBarInactiveTintColor: Color.slate[500],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tattoos"
        options={{
          title: "My Tattoos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// Use NativeTabs for iOS/Android
//   return (
//     <NativeTabs
//       disableTransparentOnScrollEdge={true}
//       tintColor={Color.slate[50]}
//     >
//       <NativeTabs.Trigger name="home">
//         <Label>Home</Label>
//         <Icon sf="house.fill" />
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="tattoos">
//         <Label>My Tattoos</Label>
//         <Icon sf="photo.fill.on.rectangle.fill" />
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="profile" role="search">
//         <Label>Profile</Label>
//         <Icon sf="person.fill" />
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }
