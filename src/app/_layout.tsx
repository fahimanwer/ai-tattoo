import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import { Stack } from "expo-router";
import { ActivityIndicator, Platform, View } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Toaster } from "sonner-native";
import { HeroUINativeProvider } from "heroui-native";
import "../../global.css";

// i18n initialization (side-effect import — must be before any component renders)
import "@/src/lib/i18n";
import { initializeRTL, getCurrentLanguage } from "@/src/lib/i18n";

// Initialize RTL layout before React renders (I18nManager.forceRTL requires restart)
initializeRTL(getCurrentLanguage());

// Native imports
import { AccentColorProvider } from "@/src/hooks/useAccentColor";
import { ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppThemeProvider, useTheme } from "@/src/context/ThemeContext";
import { StatusBar } from "expo-status-bar";

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

// Disable Reanimated strict mode warnings
// These warnings are triggered by the pressto library's PressableScale component
// which uses patterns that are technically correct but trigger strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode to suppress false-positive warnings
});

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
      if (!process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY) {
        console.error("❌ RevenueCat Google API key is not set");
        return false;
      }

      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY,
      });
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
      setIsConfigured(success);
    }
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

function AppContent() {
  const {
    settings: { isOnboarded },
  } = use(AppSettingsContext);
  const { isDark } = useTheme();

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
          name="(playground)"
          options={{
            presentation: "card",
            animation: "slide_from_right",
            gestureEnabled: false,
          }}
        />
      </Stack.Protected>

      {/* Paywall accessible during onboarding and after (for anonymous purchases) */}
      <Stack.Screen
        name="(paywall)"
        options={{ presentation: "modal", gestureEnabled: false }}
      />
      <Stack.Screen
        name="auth-sheet"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.41, 0.61],
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : isDark
                ? "black"
                : "white",
          },
        }}
      />
      <Stack.Screen name="privacy-policy" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="terms-of-service"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}

const queryClient = new QueryClient();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  expectAuth: true,
  unsavedChangesWarning: false,
});

function ThemedApp() {
  const { navigationTheme, isDark } = useTheme();

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ConvexProvider client={convex}>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <AppSettingsProvider>
            <QueryClientProvider client={queryClient}>
              <RevenueCatProvider>
                <SubscriptionProvider>
                  <AccentColorProvider>
                    <KeyboardProvider>
                      <PressablesConfig
                        globalHandlers={{
                          onPress: () => {
                            Haptics.selectionAsync();
                          },
                        }}
                        config={{ minScale: 0.97 }}
                      >
                        <PlaygroundProvider>
                          <AppContent />
                        </PlaygroundProvider>
                        <Toaster
                          style={{
                            backgroundColor: isDark ? "black" : "white",
                            borderWidth: 1,
                            borderColor: isDark ? "#FFFFFF20" : "#00000010",
                          }}
                        />
                      </PressablesConfig>
                    </KeyboardProvider>
                  </AccentColorProvider>
                </SubscriptionProvider>
              </RevenueCatProvider>
            </QueryClientProvider>
          </AppSettingsProvider>
        </ConvexBetterAuthProvider>
      </ConvexProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider
        config={{ toast: false, devInfo: { stylingPrinciples: false } }}
      >
        <AppThemeProvider>
          <ThemedApp />
        </AppThemeProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
