import { authClient } from "@/lib/auth-client";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Activity, use, useEffect, useRef } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, runOnJS } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Button, useThemeColor } from "heroui-native";
import { InputControls } from "./input-controls/InputControls";
import { SessionHistoryList } from "./session-history/SessionHistoryList";
import { TextToImageResult } from "./shared/TextToImageResult";

export function PlaygroundScreen() {
  const { t } = useTranslation();
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const isAuthenticated = session?.user !== undefined;
  const isLoading = isPending || isRefetching;
  const params = useLocalSearchParams<{ mode?: string }>();
  const hasHandledMode = useRef(false);
  const { hasActiveSubscription } = useSubscription();
  const {
    prompt,
    setPrompt,
    sessionGenerations,
    setSessionGenerations,
    activeGenerationIndex,
    setActiveGenerationIndex,
    pickImageFromGallery,
    handleShare,
    handleSave,
    activeGenerationUris,
    activeMutation,
    handleTattooGeneration,
    focusInput,
    blurInput,
    cancelGeneration,
  } = use(PlaygroundContext);

  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground") as string;

  // Entrance haptic
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 200);
  }, []);

  // Handle mode parameter for quick actions
  useEffect(() => {
    if (hasHandledMode.current || !isAuthenticated || isLoading) return;
    const mode = params.mode;
    if (mode === "preview") {
      hasHandledMode.current = true;
      setTimeout(() => router.push("/(playground)/camera-view"), 300);
    } else if (mode === "edit") {
      hasHandledMode.current = true;
      setTimeout(() => pickImageFromGallery(), 300);
    } else if (mode === "remove") {
      hasHandledMode.current = true;
      setTimeout(() => {
        setPrompt(
          "Remove the tattoo from this photo and restore the area as natural skin. Keep the rest of the image unchanged and do not add any new design."
        );
        pickImageFromGallery();
      }, 300);
    }
  }, [params.mode, isAuthenticated, isLoading, pickImageFromGallery, setPrompt]);

  function dismissToHome() {
    if (router.canGoBack()) {
      router.dismissAll();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }

  function clearAndDismiss() {
    cancelGeneration();
    setSessionGenerations([]);
    setActiveGenerationIndex(undefined);
    setPrompt("");
    dismissToHome();
  }

  function handleClose() {
    if (activeMutation.isPending) {
      Alert.alert(
        t("playground.cancelGenerationTitle"),
        t("playground.cancelGenerationMessage"),
        [
          { text: t("common.cancel"), style: "cancel" },
          {
            text: t("playground.cancelGeneration"),
            style: "destructive",
            isPreferred: true,
            onPress: clearAndDismiss,
          },
        ]
      );
      return;
    }
    if (sessionGenerations.length > 0) {
      Alert.alert(
        t("playground.clearEverythingTitle"),
        t("playground.clearEverythingMessage"),
        [
          { text: t("common.cancel"), style: "cancel" },
          {
            text: t("playground.clearEverything"),
            style: "destructive",
            isPreferred: true,
            onPress: clearAndDismiss,
          },
        ]
      );
    } else {
      dismissToHome();
    }
  }

  const handleHaptic = () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

  const panGesture = Gesture.Pan().onEnd((e) => {
    "worklet";
    if (e.translationY > 0) {
      runOnJS(blurInput)();
      runOnJS(handleHaptic)();
    } else {
      runOnJS(focusInput)();
      runOnJS(handleHaptic)();
    }
  });

  const composedGesture = Gesture.Race(panGesture);

  const isActionDisabled =
    activeGenerationUris.length !== 1 || activeMutation.isPending;

  const renderHeaderRight = () => {
    if (!isAuthenticated) return null;

    if (!hasActiveSubscription) {
      return (
        <Button
          variant="primary"
          size="sm"
          onPress={() => {
            blurInput();
            router.push("/(paywall)?variant=discount");
          }}
          style={styles.pillButton}
        >
          <Button.Label>{t("common.upgrade")}</Button.Label>
        </Button>
      );
    }

    return (
      <View style={styles.headerRightRow}>
        <Pressable
          onPress={async () => {
            if (activeGenerationUris.length > 0) {
              await handleShare(activeGenerationUris[0]);
            }
          }}
          disabled={isActionDisabled}
          hitSlop={8}
          style={{ opacity: isActionDisabled ? 0.3 : 1 }}
        >
          <Ionicons name="share-outline" size={22} color={foreground} />
        </Pressable>
        <Button
          variant="primary"
          size="sm"
          onPress={async () => {
            if (activeGenerationUris.length > 0) {
              await handleSave(activeGenerationUris[0]);
            }
          }}
          isDisabled={isActionDisabled}
          style={styles.pillButton}
        >
          <Button.Label>{t("common.save")}</Button.Label>
        </Button>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("playground.title"),
          headerShadowVisible: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: isDark ? "#18181b" : "#ffffff",
          },
          headerTintColor: foreground,
          headerLeft: () => (
            <Pressable
              onPress={handleClose}
              hitSlop={8}
              style={styles.headerBtn}
            >
              <Ionicons name="close" size={22} color={foreground} />
            </Pressable>
          ),
          headerRight: renderHeaderRight,
        }}
      />
      <GestureDetector gesture={composedGesture}>
        <View style={styles.container}>
          <SessionHistoryList
            sessionGenerations={sessionGenerations}
            activeGenerationIndex={activeGenerationIndex}
            setActiveGenerationIndex={setActiveGenerationIndex}
            setSessionGenerations={setSessionGenerations}
            handleSave={handleSave}
            handleShare={handleShare}
          />

          <TextToImageResult
            key={activeGenerationUris.join(",")}
            mutation={activeMutation}
            lastGenerationUris={activeGenerationUris}
          />

          {/* Sign-in overlay for unauthenticated users */}
          <Activity mode={!isAuthenticated ? "visible" : "hidden"}>
            <Animated.View
              entering={FadeIn.duration(1000)}
              exiting={FadeOut.duration(1000)}
              style={[
                styles.signInOverlay,
                {
                  borderColor: isDark ? Color.zinc[900] : Color.zinc[200],
                  backgroundColor: isDark ? "#18181b" : "#ffffff",
                },
              ]}
            >
              <Text
                type="xl"
                weight="bold"
                style={styles.signInTitle}
              >
                {t("auth.signInToContinue")}
              </Text>
              <Text type="sm" style={styles.signInDescription}>
                {t("auth.signInBenefit")}
              </Text>
              <Button
                variant="primary"
                onPress={() =>
                  router.push({
                    pathname: "/auth-sheet",
                    params: { dismissImmediately: "true" },
                  })
                }
                isDisabled={isPending}
                style={{ width: "100%", marginTop: 8 }}
              >
                <Button.Label>{t("auth.signIn")}</Button.Label>
              </Button>
            </Animated.View>
          </Activity>

          {/* Input controls for authenticated users */}
          <Activity mode={isAuthenticated ? "visible" : "hidden"}>
            <InputControls
              onChangeText={setPrompt}
              prompt={prompt}
              autoFocus={!params.mode || params.mode === ""}
              onSubmit={handleTattooGeneration}
              isSubmitDisabled={activeMutation.isPending}
              isSheetDisabled={activeMutation.isPending}
            />
          </Activity>
        </View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBtn: {
    padding: 4,
  },
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pillButton: {
    borderRadius: 20,
  },
  signInOverlay: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
  },
  signInTitle: {
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0,
  },
  signInDescription: {
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 8,
    opacity: 0.8,
  },
});
