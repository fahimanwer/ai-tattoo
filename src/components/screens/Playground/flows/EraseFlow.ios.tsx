/**
 * EraseFlow -- iOS shell with native header items.
 * Pick a photo with a tattoo, erase the tattoo via AI.
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
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import { FlowResultActions } from "./FlowResultActions";
import { useEraseFlow } from "./useEraseFlow";
import { extractConvexError } from "@/lib/convex-error";
import {
  getPlaygroundErrorType,
  PlaygroundError,
} from "../shared/PlaygroundError";

export function EraseFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const muted = useThemeColor("muted") as string;

  const {
    sourceUri,
    resultUri,
    isGenerating,
    error,
    pickImage,
    erase,
    reset,
    mutation,
  } = useEraseFlow();

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
            headerTitle: t("flows.erase.title"),
            headerShadowVisible: false,
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
          headerTitle: t("flows.erase.title"),
          headerShadowVisible: false,
          unstable_headerLeftItems: () => [
            {
              type: "button",
              variant: "plain",
              label: t("common.back"),
              icon: { name: "chevron.left", type: "sfSymbol" },
              onPress: dismissToHome,
            },
          ],
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Source image */}
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
                  {t("flows.erase.description")}
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
                  name="camera-outline"
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
                  {t("flows.erase.pickImage")}
                </Text>
              </PressableScale>
            )}

            {/* Erase button */}
            <Button
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                erase();
              }}
              isDisabled={!sourceUri || isGenerating}
              style={styles.actionButton}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Button.Label>{t("flows.erase.eraseButton")}</Button.Label>
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
              {t("playground.loadingMessages.sharpeningNeedles")}
            </Text>
          </View>
        )}

        {/* Result: before/after */}
        {resultUri && (
          <View style={styles.resultContainer}>
            {sourceUri && (
              <View style={styles.comparisonRow}>
                <View style={styles.comparisonCell}>
                  <Text
                    type="xs"
                    weight="semibold"
                    style={[styles.comparisonLabel, { color: muted }]}
                  >
                    {t("common.before")}
                  </Text>
                  <Image
                    source={{ uri: sourceUri }}
                    placeholder={{ blurhash: BLURHASH }}
                    cachePolicy="memory-disk"
                    style={styles.comparisonImage}
                    contentFit="cover"
                    transition={300}
                  />
                </View>
                <View style={styles.comparisonCell}>
                  <Text
                    type="xs"
                    weight="semibold"
                    style={[styles.comparisonLabel, { color: muted }]}
                  >
                    {t("common.after")}
                  </Text>
                  <Image
                    source={{ uri: resultUri }}
                    placeholder={{ blurhash: BLURHASH }}
                    cachePolicy="memory-disk"
                    style={styles.comparisonImage}
                    contentFit="cover"
                    transition={400}
                  />
                </View>
              </View>
            )}

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
  comparisonRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  comparisonCell: {
    flex: 1,
    gap: 4,
  },
  comparisonLabel: {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  comparisonImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});
