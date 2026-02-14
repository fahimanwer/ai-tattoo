import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from "react-i18next";
import { CustomTabBar } from "@/src/components/tab-bar/CustomTabBar";

export default function TabLayout() {
  const { t } = useTranslation();

  if (isLiquidGlassAvailable()) {
    return (
      <NativeTabs
        disableTransparentOnScrollEdge={true}
        tintColor={"#3563E9"}
        minimizeBehavior="onScrollDown"
      >
        <NativeTabs.Trigger name="(home)">
          <NativeTabs.Trigger.Label>{t('tabs.home')}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="explore">
          <NativeTabs.Trigger.Label>{t('tabs.explore')}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="globe" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="tattoos">
          <NativeTabs.Trigger.Label>{t('tabs.myTattoos')}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="photo.fill.on.rectangle.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Label>{t('tabs.profile')}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="person.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="camera-view" role="search">
          <NativeTabs.Trigger.Label>{t('tabs.tryOnTattoo')}</NativeTabs.Trigger.Label>
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
      <Tabs.Screen name="(home)" options={{ title: t('tabs.home') }} />
      <Tabs.Screen name="explore" options={{ title: t('tabs.explore') }} />
      <Tabs.Screen name="tattoos" options={{ title: t('tabs.myTattoos') }} />
      <Tabs.Screen name="profile" options={{ title: t('tabs.profile') }} />
      <Tabs.Screen name="camera-view" options={{ title: t('tabs.tryOnTattoo') }} />
    </Tabs>
  );
}
