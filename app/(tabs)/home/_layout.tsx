import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { authClient } from "@/lib/auth-client";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import Purchases from "react-native-purchases";

export default function ProfileLayout() {
  const largeHeaderOptions = useLargeHeaderOptions();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.id) {
      loadRevenueCat(session.user.id);
    }
  }, [session]);

  const loadRevenueCat = (userId?: string) => {
    try {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
      if (Platform.OS === "ios") {
        if (!process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY) {
          Alert.alert(
            "❌ RevenueCat Apple API key is not set",
            "Please set the RevenueCat Apple API key in the .env.local file"
          );
          return;
        }

        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY,
          appUserID: userId || undefined,
        });
        console.log(`✅ RevenueCat configured for iOS with userId: ${userId}`);
      } else if (Platform.OS === "android") {
        // await Purchases.configure({
        //   apiKey: "android-api-key",
        //   appUserID: userId
        // });
        console.log(
          `✅ RevenueCat configured for Android with userId: ${userId}`
        );
      }
    } catch (error) {
      console.error("❌ Error configuring RevenueCat:", error);
    }
  };

  return (
    <Stack
      screenOptions={{
        ...largeHeaderOptions,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Get Inspired",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="about/style"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="body-part"
        options={{
          title: "Body Part",
          headerBackButtonDisplayMode: "minimal",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="about/learn-more"
        options={{
          headerLargeTitle: true,
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.3, 0.5, 1],
          sheetInitialDetentIndex: 0,
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable() ? "transparent" : "black",
          },
        }}
      />
      <Stack.Screen
        name="about/photo"
        options={{
          headerLargeTitle: false,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}
