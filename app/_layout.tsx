import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, usePathname } from "expo-router";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";

// Native imports
import { AccentColorProvider, useAccentColor } from "@/hooks/useAccentColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  BodoniModa_400Regular,
  BodoniModa_400Regular_Italic,
  BodoniModa_500Medium,
  BodoniModa_500Medium_Italic,
  BodoniModa_600SemiBold,
  BodoniModa_600SemiBold_Italic,
  BodoniModa_700Bold,
  BodoniModa_700Bold_Italic,
  BodoniModa_800ExtraBold,
  BodoniModa_800ExtraBold_Italic,
  BodoniModa_900Black,
  BodoniModa_900Black_Italic,
} from "@expo-google-fonts/bodoni-moda";
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
  useFonts,
} from "@expo-google-fonts/oswald";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { authClient } from "@/lib/auth-client";
import "react-native-reanimated";

import Purchases from "react-native-purchases";

const importedFonts = {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
  BodoniModa_400Regular,
  BodoniModa_500Medium,
  BodoniModa_600SemiBold,
  BodoniModa_700Bold,
  BodoniModa_800ExtraBold,
  BodoniModa_900Black,
  BodoniModa_400Regular_Italic,
  BodoniModa_500Medium_Italic,
  BodoniModa_600SemiBold_Italic,
  BodoniModa_700Bold_Italic,
  BodoniModa_800ExtraBold_Italic,
  BodoniModa_900Black_Italic,
};

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(importedFonts);
  const { getBackgroundColor } = useAccentColor();
  const [backgroundColor, setBackgroundColor] = useState<string>(() =>
    getBackgroundColor()
  );
  const { data: session, isPending } = authClient.useSession();

  const isAuthenticated = !!session;
  const pathname = usePathname();

  const getDynamicTitle = () => {
    if (pathname.includes("/buttons")) return "Buttons";
    if (pathname.includes("/inputs")) return "Inputs";
    if (pathname.includes("/typography")) return "Typography";
    return "General";
  };

  useEffect(() => {
    loadRevenueCat();
  }, []);

  const loadRevenueCat = async () => {
    if (Platform.OS === "ios") {
      await Purchases.configure({ apiKey: "appl_TglDpVSpcsiykcYmEbXbHvlMwMG" });
    } else if (Platform.OS === "android") {
      // await Purchases.configure({ apiKey: "" });
    }
  };

  useEffect(() => {
    const newColor = getBackgroundColor();
    setBackgroundColor(newColor);
  }, [getBackgroundColor, colorScheme]);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
      onLayout={onLayoutRootView}
    >
      <ThemeProvider
        value={{
          ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
          colors: {
            ...(colorScheme === "dark"
              ? DarkTheme.colors
              : DefaultTheme.colors),
            background: backgroundColor,
            card: backgroundColor,
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
            <Stack.Screen
              name="(tabs)"
              options={{
                title: getDynamicTitle(),
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack.Protected>
        </Stack>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={backgroundColor}
        />
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
  if (Platform.OS === "web") {
    return <WebLayout />;
  }

  return (
    <GestureHandlerRootView>
      <AccentColorProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
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
