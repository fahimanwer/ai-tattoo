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
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { use, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthContext, AuthProvider } from "@/context/AuthContext";
import "react-native-reanimated";

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
  duration: 4000,
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
  const { isAuthenticated } = use(AuthContext);
  const pathname = usePathname();

  const getDynamicTitle = () => {
    if (pathname.includes("/buttons")) return "Buttons";
    if (pathname.includes("/inputs")) return "Inputs";
    if (pathname.includes("/typography")) return "Typography";
    return "General";
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

  if (!loaded) {
    return null;
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

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <AccentColorProvider>
          <AppContent />
        </AccentColorProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
