import { authClient } from "@/lib/auth-client";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

// Conditionally import NativeTabs only on native platforms
let NativeTabs: any;

if (Platform.OS !== "web") {
  const nativeTabs = require("expo-router/unstable-native-tabs");
  NativeTabs = nativeTabs.NativeTabs;
}

export default function TabLayout() {
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const isAuthenticated =
    session?.user !== undefined && !isPending && !isRefetching;

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
      tintColor={"yellow"}
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="globe" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tattoos">
        <NativeTabs.Trigger.Label>My Tattoos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="photo.fill.on.rectangle.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile" hidden={!isAuthenticated}>
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="camera-view" role="search">
        <NativeTabs.Trigger.Label>Try On Tattoo</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "camera.fill", selected: "camera.fill" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
