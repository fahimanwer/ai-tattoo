import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { Toaster } from "sonner-native";

// Native imports
import { AccentColorProvider } from "@/hooks/useAccentColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { authClient } from "@/lib/auth-client";
import "react-native-reanimated";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { TattooCreationProvider } from "@/context/TattooCreationContext";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Purchases from "react-native-purchases";
import { identifyDevice, vexo } from "vexo-analytics";

vexo(process.env.EXPO_PUBLIC_VEXO!);

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// SplashScreen.preventAutoHideAsync();

// Configure RevenueCat before anything else
const configureRevenueCat = async () => {
  try {
    await Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
    if (Platform.OS === "ios") {
      if (!process.env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY) {
        console.error("❌ RevenueCat Apple API key is not set");
        return;
      }

      await Purchases.configure({
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
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts(importedFonts);
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();

  const isAuthenticated = !!session;

  // Log in the user to RevenueCat when session is available
  useEffect(() => {
    if (session?.user?.id) {
      if (!__DEV__) {
        // Vexo log in the user
        identifyDevice(session.user.email);
      }

      // Log in the user to RevenueCat
      Purchases.logIn(session.user.id)
        .then(() => {
          console.log(`✅ RevenueCat user logged in: ${session.user.id}`);
        })
        .catch((error) => {
          console.error("❌ Error logging in to RevenueCat:", error);
        });
    }
  }, [session?.user?.id, session?.user?.email]);

  // const onLayoutRootView = useCallback(async () => {
  //   if (loaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (sessionError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text type="body">Error: {sessionError.error}</Text>
        <Text type="body">Error: {sessionError.message}</Text>
        <Text type="body">Error: {sessionError.statusText}</Text>
        <Text type="body">Error: {sessionError.status}</Text>
        <Button
          variant="subtle"
          onPress={() => authClient.signOut()}
          title="Sign Out"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
      // onLayout={onLayoutRootView}
    >
      <ThemeProvider
        value={{
          ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
          colors: {
            ...(colorScheme === "dark"
              ? DarkTheme.colors
              : DefaultTheme.colors),
            background: "#000000",
            card: "#000000",
          },
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{}} />
            <Stack.Screen name="(new)" />
            <Stack.Screen
              name="(paywall)"
              options={{ presentation: "modal" }}
            />
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
            name="privacy-policy"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="terms-of-service"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="profile"
            options={{ animation: "ios_from_left" }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </View>
  );
}

// Web-only layout component
function WebLayout() {
  return (
    <View style={webStyles.container}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#111111",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#ffffff",
          },
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "AI Tattoo Try On",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            title: "Privacy Policy",
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            title: "Terms of Service",
          }}
        />
      </Stack>
    </View>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isRevenueCatReady, setIsRevenueCatReady] = useState(false);

  // Configure RevenueCat on mount before rendering SubscriptionProvider
  useEffect(() => {
    if (Platform.OS !== "web") {
      configureRevenueCat().then(() => {
        setIsRevenueCatReady(true);
      });
    }
  }, []);

  if (Platform.OS === "web") {
    return <WebLayout />;
  }

  // Wait for RevenueCat to be configured before rendering SubscriptionProvider
  if (!isRevenueCatReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        <ActivityIndicator color="#ffffff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <AccentColorProvider>
        <QueryClientProvider client={queryClient}>
          <SubscriptionProvider>
            <TattooCreationProvider>
              <KeyboardProvider>
                <PressablesConfig
                  globalHandlers={{
                    onPress: () => {
                      Haptics.selectionAsync();
                    },
                  }}
                >
                  <AppContent />
                  <Toaster />
                </PressablesConfig>
              </KeyboardProvider>
            </TattooCreationProvider>
          </SubscriptionProvider>
        </QueryClientProvider>
      </AccentColorProvider>
    </GestureHandlerRootView>
  );
}

const webStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
