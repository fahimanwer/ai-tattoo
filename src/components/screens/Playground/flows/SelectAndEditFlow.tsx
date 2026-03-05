/**
 * SelectAndEditFlow -- Android / default shell.
 *
 * 4-step inpainting workflow:
 *   1. Pick image
 *   2. Paint mask (BrushMaskCanvas)
 *   3. Describe edit
 *   4. View result (save / share / retry)
 */

import { BLURHASH } from "@/lib/image-cache";
import { Text } from "@/src/components/ui/Text";
import { PlaygroundCoreContext } from "@/src/context/playground";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { use, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, useThemeColor } from "heroui-native";
import { PressableScale } from "pressto";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  BrushMaskCanvas,
  type BrushMaskCanvasHandle,
} from "../canvas/BrushMaskCanvas";
import { BrushSizeSlider } from "./BrushSizeSlider";
import { StepIndicator } from "./StepIndicator";
import { useSelectAndEditFlow } from "./useSelectAndEditFlow";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BRUSH_MIN = 10;
const BRUSH_MAX = 80;
const BRUSH_DEFAULT = 30;
const CANVAS_PADDING = 32;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SelectAndEditFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { handleSave, handleShare } = use(PlaygroundCoreContext);
  const foreground = useThemeColor("foreground") as string;
  const { width: screenWidth } = useWindowDimensions();

  const canvasSize = screenWidth - CANVAS_PADDING;

  const {
    step,
    setStep,
    sourceUri,
    editPrompt,
    resultUri,
    isGenerating,
    error,
    pickImage,
    setMask,
    setEditPrompt,
    generate,
    reset,
  } = useSelectAndEditFlow();

  const [brushSize, setBrushSize] = useState(BRUSH_DEFAULT);
  const canvasRef = useRef<BrushMaskCanvasHandle>(null);

  // ------------------------------------------------------------------
  // Navigation helpers
  // ------------------------------------------------------------------

  function goBack() {
    if (step === 1) {
      if (router.canGoBack()) {
        router.back();
      }
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  }

  function handleNextFromPaint() {
    if (!canvasRef.current?.hasStrokes) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    canvasRef.current.captureMask();
    setStep(3);
  }

  function handleGenerate() {
    Keyboard.dismiss();
    generate();
  }

  // ------------------------------------------------------------------
  // Step indicator
  // ------------------------------------------------------------------

  const stepLabels = [
    t("flows.selectAndEdit.stepPick"),
    t("flows.selectAndEdit.stepPaint"),
    t("flows.selectAndEdit.stepPrompt"),
    t("flows.selectAndEdit.stepResult"),
  ];

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  const bg = isDark ? "#18181b" : "#ffffff";
  const borderColor = isDark ? "#27272a" : "#e4e4e7";
  const inputBg = isDark ? "#27272a" : "#f4f4f5";

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.selectAndEdit.title"),
          headerShadowVisible: false,
          gestureEnabled: step === 1,
          headerStyle: { backgroundColor: bg },
          headerTintColor: foreground,
          headerLeft: () => (
            <Pressable onPress={goBack} hitSlop={8} style={styles.headerBtn}>
              <Ionicons
                name={step === 1 ? "close" : "chevron-back"}
                size={22}
                color={foreground}
              />
            </Pressable>
          ),
          headerRight: () =>
            step === 4 && resultUri ? (
              <View style={styles.headerRight}>
                <Pressable
                  onPress={() => handleShare(resultUri)}
                  hitSlop={8}
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
                  onPress={() => handleSave(resultUri)}
                  style={styles.pillBtn}
                >
                  <Button.Label>{t("common.save")}</Button.Label>
                </Button>
              </View>
            ) : null,
        }}
      />

      <ScrollView
        style={[styles.container, { backgroundColor: bg }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Step indicator */}
        <StepIndicator
          current={step}
          labels={stepLabels}
          isDark={isDark}
        />

        {/* Step 1: Pick Image */}
        {step === 1 && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(150)}
            style={styles.stepContainer}
          >
            <Text type="lg" weight="semibold" style={styles.heading}>
              {t("flows.selectAndEdit.pickImage")}
            </Text>
            <Text type="sm" style={[styles.hint, { opacity: 0.6 }]}>
              {t("flows.selectAndEdit.pickImageHint")}
            </Text>

            <PressableScale
              onPress={pickImage}
              style={[
                styles.pickArea,
                { borderColor, backgroundColor: inputBg },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={48}
                color={foreground}
                style={{ opacity: 0.4 }}
              />
              <Text type="sm" style={{ opacity: 0.5, marginTop: 8 }}>
                {t("flows.selectAndEdit.pickImage")}
              </Text>
            </PressableScale>
          </Animated.View>
        )}

        {/* Step 2: Paint Mask */}
        {step === 2 && sourceUri && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(150)}
            style={styles.stepContainer}
          >
            <Text type="lg" weight="semibold" style={styles.heading}>
              {t("flows.selectAndEdit.paintSelection")}
            </Text>

            <View style={styles.canvasWrapper}>
              <BrushMaskCanvas
                ref={canvasRef}
                imageUri={sourceUri}
                brushSize={brushSize}
                onMaskReady={setMask}
                width={canvasSize}
                height={canvasSize}
              />
            </View>

            {/* Brush size slider */}
            <BrushSizeSlider
              value={brushSize}
              min={BRUSH_MIN}
              max={BRUSH_MAX}
              onValueChange={setBrushSize}
              isDark={isDark}
            />

            {/* Undo / Clear */}
            <View style={styles.actionRow}>
              <Button
                variant="secondary"
                size="sm"
                onPress={() => canvasRef.current?.undo()}
              >
                <Ionicons name="arrow-undo" size={16} color={foreground} />
                <Button.Label>{t("flows.selectAndEdit.undo")}</Button.Label>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onPress={() => canvasRef.current?.clear()}
              >
                <Ionicons name="trash-outline" size={16} color={foreground} />
                <Button.Label>{t("flows.selectAndEdit.clear")}</Button.Label>
              </Button>
            </View>

            {/* Next */}
            <Button
              variant="primary"
              onPress={handleNextFromPaint}
              style={styles.fullWidthBtn}
            >
              <Button.Label>
                {t("flows.selectAndEdit.nextStep")}
              </Button.Label>
            </Button>
          </Animated.View>
        )}

        {/* Step 3: Prompt */}
        {step === 3 && (
          <Animated.View
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(150)}
            style={styles.stepContainer}
          >
            <Text type="lg" weight="semibold" style={styles.heading}>
              {t("flows.selectAndEdit.describeEdit")}
            </Text>

            {/* Thumbnail of source */}
            {sourceUri && (
              <Image
                source={{ uri: sourceUri }}
                placeholder={{ blurhash: BLURHASH }}
                style={styles.thumbnail}
                contentFit="cover"
                transition={200}
              />
            )}

            <TextInput
              value={editPrompt}
              onChangeText={setEditPrompt}
              placeholder={t("flows.selectAndEdit.promptPlaceholder")}
              placeholderTextColor={isDark ? "#71717a" : "#a1a1aa"}
              multiline
              style={[
                styles.textInput,
                {
                  backgroundColor: inputBg,
                  color: foreground,
                  borderColor,
                },
              ]}
              returnKeyType="done"
              blurOnSubmit
            />

            {error && (
              <Text type="sm" style={styles.errorText}>
                {error}
              </Text>
            )}

            <Button
              variant="primary"
              onPress={handleGenerate}
              isDisabled={isGenerating || editPrompt.trim().length === 0}
              style={styles.fullWidthBtn}
            >
              {isGenerating ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Button.Label>
                  {t("flows.selectAndEdit.generate")}
                </Button.Label>
              )}
            </Button>

            {isGenerating && (
              <Text
                type="xs"
                style={[styles.generatingHint, { opacity: 0.5 }]}
              >
                {t("flows.selectAndEdit.generating")}
              </Text>
            )}
          </Animated.View>
        )}

        {/* Step 4: Result */}
        {step === 4 && resultUri && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(150)}
            style={styles.stepContainer}
          >
            <Text type="lg" weight="semibold" style={styles.heading}>
              {t("flows.selectAndEdit.resultTitle")}
            </Text>

            <Image
              source={{ uri: resultUri }}
              placeholder={{ blurhash: BLURHASH }}
              style={[styles.resultImage, { width: canvasSize }]}
              contentFit="cover"
              transition={300}
            />

            <View style={styles.actionRow}>
              <Button
                variant="secondary"
                onPress={() => {
                  setStep(3);
                }}
                style={{ flex: 1 }}
              >
                <Button.Label>
                  {t("flows.selectAndEdit.tryAgain")}
                </Button.Label>
              </Button>
              <Button
                variant="primary"
                onPress={reset}
                style={{ flex: 1 }}
              >
                <Button.Label>
                  {t("flows.selectAndEdit.newEdit")}
                </Button.Label>
              </Button>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  stepContainer: {
    gap: 16,
  },
  heading: {
    textAlign: "center",
  },
  hint: {
    textAlign: "center",
  },
  headerBtn: {
    padding: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pillBtn: {
    borderRadius: 20,
  },
  pickArea: {
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  canvasWrapper: {
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  fullWidthBtn: {
    width: "100%",
  },
  thumbnail: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    minHeight: 80,
    fontSize: 15,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
  },
  generatingHint: {
    textAlign: "center",
  },
  resultImage: {
    aspectRatio: 1,
    borderRadius: 16,
    alignSelf: "center",
  },
});
