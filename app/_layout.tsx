import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

// Native imports
import { AccentColorProvider } from "@/hooks/useAccentColor";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppSettingsContext, AppSettingsProvider } from "@/context/AppSettings";
import { PlaygroundProvider } from "@/context/PlaygroundContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { use, useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Purchases from "react-native-purchases";
import { vexo } from "vexo-analytics";

vexo(process.env.EXPO_PUBLIC_VEXO!);

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

// Configure RevenueCat before anything else
const configureRevenueCat = async () => {
  try {
    await Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
    if (Platform.OS === "ios") {
      if (!process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY) {
        console.error("❌ RevenueCat Apple API key is not set");
        return;
      }

      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY,
      });
      console.log("✅ RevenueCat configured for iOS");
    } else if (Platform.OS === "android") {
      // await Purchases.configure({
      //   apiKey: "android-api-key",
      // });
      console.log("✅ RevenueCat configured for Android");
    }
  } catch (error) {
    console.error("❌ Error configuring RevenueCat:", error);
  }
};

function AppContent() {
  const {
    settings: { isOnboarded },
  } = use(AppSettingsContext);

  useEffect(() => {
    configureRevenueCat();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="(tabs)" options={{}} />
        <Stack.Screen name="(paywall)" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="(playground)"
          options={{
            presentation: "card",
            animation: "slide_from_right",
            gestureEnabled: false,
          }}
        />
      </Stack.Protected>

      <Stack.Screen name="privacy-policy" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="terms-of-service"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="profile" options={{ presentation: "modal" }} />
    </Stack>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: "#000000",
            card: "#000000",
          },
        }}
      >
        <AppSettingsProvider>
          <AccentColorProvider>
            <QueryClientProvider client={queryClient}>
              <KeyboardProvider>
                <PressablesConfig
                  globalHandlers={{
                    onPress: () => {
                      Haptics.selectionAsync();
                    },
                  }}
                >
                  <SubscriptionProvider>
                    <PlaygroundProvider>
                      <AppContent />
                    </PlaygroundProvider>
                  </SubscriptionProvider>
                  <Toaster />
                </PressablesConfig>
              </KeyboardProvider>
            </QueryClientProvider>
          </AccentColorProvider>
        </AppSettingsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
