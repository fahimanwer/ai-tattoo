import { Icon } from "@/components/ui/Icon";
import { useLargeHeaderOptions } from "@/constants/navigation-options";
import { TattooCreationProvider } from "@/context/TattooCreationContext";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { authClient } from "@/lib/auth-client";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Purchases from "react-native-purchases";

function ButtonToCreateTattoo() {
  const router = useRouter();
  const { isLimitReached } = useUsageLimit();

  const goToCreateTattoo = () => {
    router.push("/(new)/select-body-part");
  };

  console.log("isLimitReached", isLimitReached);
  // Don't show button if limit is reached
  if (isLimitReached) {
    return (
      <Text style={{ color: "white", marginHorizontal: 8 }}>Limit Reached</Text>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable style={{ paddingLeft: 8 }} onPress={goToCreateTattoo}>
        <Icon symbol="plus" color={"#007AFF"} />
      </Pressable>
    </View>
  );
}

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
        Purchases.configure({
          apiKey: "appl_TglDpVSpcsiykcYmEbXbHvlMwMG",
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
    <TattooCreationProvider>
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
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => <ButtonToCreateTattoo />,
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
              backgroundColor: isLiquidGlassAvailable()
                ? "transparent"
                : "black",
            },
          }}
        />
        <Stack.Screen
          name="about/photo"
          options={{
            headerLargeTitle: true,
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.3, 0.5, 1],
            sheetInitialDetentIndex: 0,
            contentStyle: {
              backgroundColor: isLiquidGlassAvailable()
                ? "transparent"
                : "black",
            },
          }}
        />
      </Stack>
    </TattooCreationProvider>
  );
}
