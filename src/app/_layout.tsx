import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator, Platform, View } from "react-native";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

// Native imports
import { AccentColorProvider } from "@/src/hooks/useAccentColor";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { authClient } from "@/lib/auth-client";
import {
  AppSettingsContext,
  AppSettingsProvider,
} from "@/src/context/AppSettings";
import { PlaygroundProvider } from "@/src/context/PlaygroundContext";
import { SubscriptionProvider } from "@/src/context/SubscriptionContext";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { use, useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Purchases from "react-native-purchases";
import { vexo } from "vexo-analytics";

if (!__DEV__) vexo(process.env.EXPO_PUBLIC_VEXO!);

// RevenueCat initialization state
let isRevenueCatConfigured = false;

// Configure RevenueCat synchronously
const configureRevenueCat = () => {
  if (isRevenueCatConfigured) {
    return true;
  }

  try {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
    if (Platform.OS === "ios") {
      if (!process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY) {
        console.error("❌ RevenueCat Apple API key is not set");
        return false;
      }

      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY,
      });
      console.log("✅ RevenueCat configured for iOS");
      isRevenueCatConfigured = true;
      return true;
    } else if (Platform.OS === "android") {
      // await Purchases.configure({
      //   apiKey: "android-api-key",
      // });
      console.log("✅ RevenueCat configured for Android");
      isRevenueCatConfigured = true;
      return true;
    }
  } catch (error) {
    console.error("❌ Error configuring RevenueCat:", error);
  }
  return false;
};

// Wrapper component to ensure RevenueCat is configured before rendering children
function RevenueCatProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(isRevenueCatConfigured);

  useEffect(() => {
    if (!isConfigured) {
      const success = configureRevenueCat();
      setIsConfigured(success || Platform.OS !== "ios"); // Allow render on Android or if config failed
    }
  }, [isConfigured]);

  if (!isConfigured && Platform.OS === "ios") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <>{children}</>;
}

// Component to sync authenticated user ID with RevenueCat
// This links the authenticated user to RevenueCat and transfers any anonymous purchases
function RevenueCatAuthSync({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  useEffect(() => {
    const syncUserWithRevenueCat = async () => {
      const userId = session?.user?.id;

      // Skip if no user or already synced this user
      if (!userId || syncedUserId === userId) {
        return;
      }

      // Skip if RevenueCat is not configured
      if (!isRevenueCatConfigured) {
        console.log("⏭️  RevenueCat not configured, skipping login");
        return;
      }

      try {
        console.log(
          `[RC AUTH SYNC] 🔗 Logging in to RevenueCat with user ID: ${userId}`
        );

        const { customerInfo, created } = await Purchases.logIn(userId);

        console.log(
          "[RC AUTH SYNC] ✅ Successfully linked user to RevenueCat:",
          {
            userId,
            originalAppUserId: customerInfo.originalAppUserId,
            created: created,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
          }
        );

        setSyncedUserId(userId);
      } catch (error) {
        console.error(
          "[RC AUTH SYNC] ❌ Error linking user to RevenueCat:",
          error
        );
        // Don't block the app if this fails - user can still use the app
      }
    };

    syncUserWithRevenueCat();
  }, [session?.user?.id, syncedUserId]);

  return <>{children}</>;
}

function AppContent() {
  const {
    settings: { isOnboarded },
  } = use(AppSettingsContext);

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
        <Stack.Screen
          name="(imagePreview)"
          options={{ presentation: "modal" }}
        />
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

      <Stack.Screen
        name="auth-sheet"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.45],
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable() ? "transparent" : "black",
          },
        }}
      />
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
          <QueryClientProvider client={queryClient}>
            <RevenueCatProvider>
              <RevenueCatAuthSync>
                <SubscriptionProvider>
                  <AccentColorProvider>
                    <KeyboardProvider>
                      <PressablesConfig
                        globalHandlers={{
                          onPress: () => {
                            Haptics.selectionAsync();
                          },
                        }}
                      >
                        <PlaygroundProvider>
                          <AppContent />
                        </PlaygroundProvider>
                        <Toaster />
                      </PressablesConfig>
                    </KeyboardProvider>
                  </AccentColorProvider>
                </SubscriptionProvider>
              </RevenueCatAuthSync>
            </RevenueCatProvider>
          </QueryClientProvider>
        </AppSettingsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
