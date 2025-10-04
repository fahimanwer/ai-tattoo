import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";

// Native imports
import { AccentColorProvider } from "@/hooks/useAccentColor";
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
} from "@expo-google-fonts/oswald";
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
import { TattooCreationProvider } from "@/context/TattooCreationContext";

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

// SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts(importedFonts);
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();

  const isAuthenticated = true; //!!session;

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
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(new)" />
            <Stack.Screen name="+not-found" />
          </Stack.Protected>
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
          name="create-tattoo"
          options={{
            title: "Creating Your Tattoo",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="generated-result"
          options={{
            title: "Generated Result",
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
          <TattooCreationProvider>
            <AppContent />
          </TattooCreationProvider>
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
