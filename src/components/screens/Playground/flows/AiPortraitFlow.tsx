/**
 * AiPortraitFlow -- Android / default shell.
 * Converts a selfie/portrait into a tattoo-style artwork.
 *
 * Steps:
 *  1. Pick a portrait photo
 *  2. Select a style from the 3x2 grid
 *  3. Generate the tattoo portrait
 *  4. View result with save/share actions
 */

import { BLURHASH } from "@/lib/image-cache";
import { buildPortraitPrompt } from "@/lib/flowPrompts";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import type { PortraitStyle } from "@/src/context/playground/flow-types";
import { PlaygroundCoreContext } from "@/src/context/playground";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { use } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import {
  usePortraitFlow,
  PORTRAIT_STYLES,
} from "./usePortraitFlow";
import { extractConvexError } from "@/lib/convex-error";
import {
  getPlaygroundErrorType,
  PlaygroundError,
} from "../shared/PlaygroundError";
import { useSubscription } from "@/src/hooks/useSubscription";

export function AiPortraitFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground") as string;
  const { handleSave, handleShare } = use(PlaygroundCoreContext);
  const { hasActiveSubscription } = useSubscription();
  const isFreeTier = !hasActiveSubscription;

  const {
    sourceUri,
    selectedStyle,
    setSelectedStyle,
    resultUri,
    isGenerating,
    error,
    pickPhoto,
    generate,
    clearResult,
    reset,
  } = usePortraitFlow();

  function dismissBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(playground)");
    }
  }

  const canGenerate = sourceUri !== null && !isGenerating;
  const showResult = resultUri !== null;
  const isActionDisabled = !resultUri || isGenerating;

  // Error state
  if (error) {
    const { code, message } = extractConvexError(error);
    const errorType = getPlaygroundErrorType(code, isFreeTier);
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: t("flows.aiPortrait.title"),
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: isDark ? "#18181b" : "#ffffff",
            },
            headerTintColor: foreground,
            headerLeft: () => (
              <Pressable onPress={dismissBack} hitSlop={8} style={{ padding: 4 }}>
                <Ionicons name="arrow-back" size={22} color={foreground} />
              </Pressable>
            ),
          }}
        />
        <PlaygroundError
          errorType={errorType}
          errorMessage={message}
          onDismiss={clearResult}
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.aiPortrait.title"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDark ? "#18181b" : "#ffffff",
          },
          headerTintColor: foreground,
          headerLeft: () => (
            <Pressable onPress={dismissBack} hitSlop={8} style={{ padding: 4 }}>
              <Ionicons name="arrow-back" size={22} color={foreground} />
            </Pressable>
          ),
          headerRight: () =>
            showResult ? (
              <View style={styles.headerRight}>
                <Pressable
                  onPress={() => resultUri && handleShare(resultUri)}
                  disabled={isActionDisabled}
                  hitSlop={8}
                  style={{ opacity: isActionDisabled ? 0.3 : 1 }}
                >
                  <Ionicons
                    name="share-outline"
                    size={22}
                    color={foreground}
                  />
                </Pressable>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => resultUri && handleSave(resultUri)}
                  isDisabled={isActionDisabled}
                  style={styles.pillButton}
                >
                  <Button.Label>{t("common.save")}</Button.Label>
                </Button>
              </View>
            ) : null,
        }}
      />
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#18181b" : "#ffffff" },
        ]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 1: Pick photo */}
        <PortraitSourceSection
          sourceUri={sourceUri}
          onPick={pickPhoto}
          isGenerating={isGenerating}
          isDark={isDark}
          foreground={foreground}
        />

        {/* Step 2: Style grid */}
        {sourceUri && !showResult && (
          <StyleGrid
            selectedStyle={selectedStyle}
            onSelect={setSelectedStyle}
            isDark={isDark}
          />
        )}

        {/* Step 3: Generate button */}
        {sourceUri && !showResult && (
          <View style={styles.generateSection}>
            <Button
              variant="primary"
              onPress={() => generate(buildPortraitPrompt)}
              isDisabled={!canGenerate}
              style={styles.generateButton}
            >
              {isGenerating ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Button.Label>{t("common.createTattoo")}</Button.Label>
              )}
            </Button>
          </View>
        )}

        {/* Result */}
        {showResult && (
          <PortraitResultSection
            resultUri={resultUri}
            isDark={isDark}
            onRegenerate={clearResult}
          />
        )}
      </ScrollView>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function PortraitSourceSection({
  sourceUri,
  onPick,
  isGenerating,
  isDark,
  foreground,
}: {
  sourceUri: string | null;
  onPick: () => void;
  isGenerating: boolean;
  isDark: boolean;
  foreground: string;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text type="sm" weight="semibold" style={{ color: foreground }}>
        {t("flows.aiPortrait.pickPhoto")}
      </Text>
      <PressableScale onPress={onPick} enabled={!isGenerating}>
        {sourceUri ? (
          <Image
            source={{ uri: sourceUri }}
            placeholder={{ blurhash: BLURHASH }}
            cachePolicy="memory-disk"
            style={[
              styles.sourceImage,
              {
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
              },
            ]}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View
            style={[
              styles.pickPlaceholder,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={40}
              color={isDark ? Color.zinc[500] : Color.zinc[400]}
            />
            <Text
              type="sm"
              style={{
                color: isDark ? Color.zinc[500] : Color.zinc[400],
              }}
            >
              {t("flows.aiPortrait.pickPhoto")}
            </Text>
          </View>
        )}
      </PressableScale>
    </View>
  );
}

function StyleGrid({
  selectedStyle,
  onSelect,
  isDark,
}: {
  selectedStyle: PortraitStyle;
  onSelect: (style: PortraitStyle) => void;
  isDark: boolean;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text
        type="sm"
        weight="semibold"
        style={{
          color: isDark ? Color.zinc[100] : Color.zinc[900],
        }}
      >
        {t("flows.aiPortrait.chooseStyle")}
      </Text>
      <View style={styles.styleGrid}>
        {PORTRAIT_STYLES.map((style) => {
          const isSelected = style === selectedStyle;
          return (
            <PressableScale
              key={style}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelect(style);
              }}
              style={[
                styles.styleCard,
                {
                  backgroundColor: isSelected
                    ? "#3563E9"
                    : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  borderColor: isSelected
                    ? "#3563E9"
                    : isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                },
              ]}
            >
              <Text
                type="sm"
                weight={isSelected ? "bold" : "medium"}
                style={{
                  color: isSelected
                    ? "white"
                    : isDark
                      ? Color.zinc[300]
                      : Color.zinc[700],
                  textAlign: "center",
                }}
              >
                {t(`flows.styles.${style}`)}
              </Text>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

function PortraitResultSection({
  resultUri,
  isDark,
  onRegenerate,
}: {
  resultUri: string;
  isDark: boolean;
  onRegenerate: () => void;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <PressableScale
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push({
            pathname: "/(playground)/playground-preview",
            params: { imageUri: resultUri },
          });
        }}
      >
        <Image
          source={{ uri: resultUri }}
          placeholder={{ blurhash: BLURHASH }}
          cachePolicy="memory-disk"
          style={[
            styles.resultImage,
            {
              borderColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.08)",
            },
          ]}
          contentFit="cover"
          transition={400}
        />
      </PressableScale>
      <Button
        variant="secondary"
        onPress={onRegenerate}
        style={styles.regenerateButton}
      >
        <Button.Label>{t("common.tryAgain")}</Button.Label>
      </Button>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 24,
  },
  section: { gap: 12 },
  sourceImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    borderWidth: 1,
  },
  pickPlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  styleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  styleCard: {
    width: "31%",
    flexGrow: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  generateSection: { paddingTop: 4 },
  generateButton: { width: "100%", borderRadius: 14 },
  resultImage: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    borderWidth: 1,
  },
  regenerateButton: { width: "100%", borderRadius: 14 },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pillButton: { borderRadius: 20 },
});
