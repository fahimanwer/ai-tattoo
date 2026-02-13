import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { CustomTabBar } from "@/src/components/tab-bar/CustomTabBar";

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return (
      <NativeTabs
        disableTransparentOnScrollEdge={true}
        tintColor={"#3563E9"}
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
        <NativeTabs.Trigger name="profile">
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

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="tattoos" options={{ title: "Tattoos" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="camera-view" options={{ title: "Try On Tattoo" }} />
    </Tabs>
  );
}
