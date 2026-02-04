import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
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
