import { useTheme } from "@/src/context/ThemeContext";
import { isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function PlaygroundLayout() {
  const { t } = useTranslation();
  const isIOS = Platform.OS === "ios";
  const isGlass = isGlassEffectAPIAvailable();
  const { isDark } = useTheme();

  const sheetBg = isGlass ? "transparent" : isDark ? "black" : "white";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isIOS
            ? "transparent"
            : isDark
              ? "#000000"
              : "#F5F5F7",
        },
        headerBlurEffect:
          isIOS && !isGlass ? (isDark ? "dark" : "light") : undefined,
        headerTintColor: isDark ? "white" : "black",
      }}
    >
      <Stack.Screen name="index" options={{ presentation: "card" }} />
      <Stack.Screen name="generate" options={{ presentation: "card" }} />
      <Stack.Screen name="try-on" options={{ presentation: "card" }} />
      <Stack.Screen name="ai-portrait" options={{ presentation: "card" }} />
      <Stack.Screen name="pet-portrait" options={{ presentation: "card" }} />
      <Stack.Screen name="combine" options={{ presentation: "card" }} />
      <Stack.Screen name="select-and-edit" options={{ presentation: "card" }} />
      <Stack.Screen name="upscale" options={{ presentation: "card" }} />
      <Stack.Screen name="erase" options={{ presentation: "card" }} />
      <Stack.Screen
        name="camera-view"
        options={{
          presentation: "card",
          title: "",
        }}
      />
      <Stack.Screen
        name="sheet"
        options={{
          headerTitle: t("playground.title"),
          presentation: "formSheet",
          headerTransparent: isGlass ? true : false,
          contentStyle: { backgroundColor: sheetBg },
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.7],
        }}
      />
      <Stack.Screen
        name="playground-preview"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="feature-request"
        options={{
          presentation: "formSheet",
          headerTransparent: isGlass ? true : false,
          contentStyle: { backgroundColor: sheetBg },
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.7],
        }}
      />
      <Stack.Screen
        name="prompt-history"
        options={{
          presentation: "formSheet",
          headerTransparent: isGlass ? true : false,
          contentStyle: { backgroundColor: sheetBg },
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.7],
        }}
      />
    </Stack>
  );
}
