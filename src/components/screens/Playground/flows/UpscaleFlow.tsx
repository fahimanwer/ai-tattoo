/**
 * UpscaleFlow -- Android / default shell.
 * Pick an image, one-tap upscale, show result.
 */

import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import { FlowResultActions } from "./FlowResultActions";
import { useUpscaleFlow } from "./useUpscaleFlow";
import { extractConvexError } from "@/lib/convex-error";
import {
  getPlaygroundErrorType,
  PlaygroundError,
} from "../shared/PlaygroundError";

export function UpscaleFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const foreground = useThemeColor("foreground") as string;
  const muted = useThemeColor("muted") as string;

  const {
    sourceUri,
    resultUri,
    isGenerating,
    error,
    pickImage,
    upscale,
    reset,
    mutation,
  } = useUpscaleFlow();

  function dismissToHome() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/(home)");
    }
  }

  if (error) {
    const { code, message } = extractConvexError(error);
    const errorType = getPlaygroundErrorType(code, !hasActiveSubscription);
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: t("flows.upscale.title"),
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: isDark ? "#18181b" : "#ffffff",
            },
            headerTintColor: foreground,
          }}
        />
        <PlaygroundError
          errorType={errorType}
          errorMessage={message}
          onDismiss={() => mutation.reset()}
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.upscale.title"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDark ? "#18181b" : "#ffffff",
          },
          headerTintColor: foreground,
          headerLeft: () => (
            <Pressable
              onPress={dismissToHome}
              hitSlop={8}
              style={{ padding: 4 }}
            >
              <Ionicons name="arrow-back" size={22} color={foreground} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#18181b" : "#ffffff" },
        ]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Source image picker */}
        {!resultUri && (
          <>
            {sourceUri ? (
              <View style={styles.sourceContainer}>
                <PressableScale
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    pickImage();
                  }}
                >
                  <Image
                    source={{ uri: sourceUri }}
                    placeholder={{ blurhash: BLURHASH }}
                    cachePolicy="memory-disk"
                    style={styles.sourceImage}
                    contentFit="cover"
                    transition={300}
                  />
                </PressableScale>
                <Text type="xs" style={{ color: muted, textAlign: "center" }}>
                  {t("flows.upscale.description")}
                </Text>
              </View>
            ) : (
              <PressableScale
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  pickImage();
                }}
                style={[
                  styles.pickButton,
                  {
                    borderColor: isDark ? Color.zinc[700] : Color.zinc[300],
                    backgroundColor: isDark
                      ? Color.zinc[800] + "40"
                      : Color.zinc[100],
                  },
                ]}
              >
                <Ionicons
                  name="image-outline"
                  size={40}
                  color={isDark ? Color.zinc[400] : Color.zinc[500]}
                />
                <Text
                  type="sm"
                  weight="medium"
                  style={{
                    color: isDark ? Color.zinc[400] : Color.zinc[500],
                  }}
                >
                  {t("flows.upscale.pickImage")}
                </Text>
              </PressableScale>
            )}

            {/* Upscale button */}
            <Button
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                upscale();
              }}
              isDisabled={!sourceUri || isGenerating}
              style={styles.actionButton}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Button.Label>
                  {t("flows.upscale.upscaleButton")}
                </Button.Label>
              )}
            </Button>
          </>
        )}

        {/* Loading state */}
        {isGenerating && !resultUri && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={isDark ? Color.zinc[400] : Color.zinc[600]}
            />
            <Text type="sm" style={{ color: muted, textAlign: "center" }}>
              {t("playground.loadingMessages.perfectingPixels")}
            </Text>
          </View>
        )}

        {/* Result display */}
        {resultUri && (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: resultUri }}
              placeholder={{ blurhash: BLURHASH }}
              cachePolicy="memory-disk"
              style={styles.resultImage}
              contentFit="cover"
              transition={400}
            />
            <FlowResultActions resultUri={resultUri} />
            <Button
              variant="secondary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                reset();
              }}
              style={styles.actionButton}
            >
              <Button.Label>{t("common.tryAgain")}</Button.Label>
            </Button>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  sourceContainer: {
    gap: 8,
  },
  sourceImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  pickButton: {
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButton: {
    width: "100%",
    borderRadius: 14,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 16,
  },
  resultContainer: {
    gap: 16,
    alignItems: "center",
  },
  resultImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
});
