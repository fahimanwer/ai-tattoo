/**
 * TryOnFlow -- iOS shell with SwiftUI header items.
 *
 * Two-step flow:
 *   1. Pick tattoo + body photo (two card buttons)
 *   2. Interactive overlay canvas with save / refine actions
 */

import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { PressableScale } from "pressto";
import { toast } from "sonner-native";
import {
  TattooOverlayCanvas,
  type TattooOverlayCanvasRef,
} from "../canvas/TattooOverlayCanvas";
import { AppTattooGallery } from "./AppTattooGallery";
import { ImagePickerCard, ModeToggle } from "./TryOnFlowComponents";
import { useTryOnFlow } from "./useTryOnFlow";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TryOnFlow() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const canvasRef = useRef<TattooOverlayCanvasRef>(null);

  const {
    step,
    tattooUri,
    bodyUri,
    opacity,
    isRefining,
    refinedUri,
    isProcessingTattoo,
    isWarpMode,
    pickTattoo,
    pickBody,
    takeBodyPhoto,
    setOpacity,
    captureComposite,
    refineWithAi,
    savePreview,
    selectTattooFromUrl,
    setIsWarpMode,
    reset,
  } = useTryOnFlow();

  const [galleryOpen, setGalleryOpen] = useState(false);

  // -----------------------------------------------------------------------
  // Header helpers
  // -----------------------------------------------------------------------

  function handleBack() {
    if (step === "overlay") {
      Alert.alert(
        t("playground.clearEverythingTitle"),
        t("playground.clearEverythingMessage"),
        [
          { text: t("common.cancel"), style: "cancel" },
          {
            text: t("playground.clearEverything"),
            style: "destructive",
            onPress: () => {
              reset();
              router.back();
            },
          },
        ]
      );
      return;
    }
    router.back();
  }

  function handleBodyPickerAlert() {
    Alert.alert(t("flows.tryOn.pickBody"), undefined, [
      { text: t("common.cancel"), style: "cancel" },
      { text: t("flows.tryOn.takePhoto"), onPress: takeBodyPhoto },
      { text: t("flows.tryOn.chooseFromLibrary"), onPress: pickBody },
    ]);
  }

  function handleTattooPickerAlert() {
    Alert.alert(t("flows.tryOn.pickTattoo"), undefined, [
      { text: t("common.cancel"), style: "cancel" },
      { text: t("flows.tryOn.browseDesigns"), onPress: () => setGalleryOpen(true) },
      { text: t("flows.tryOn.chooseFromLibrary"), onPress: pickTattoo },
    ]);
  }

  // -----------------------------------------------------------------------
  // Capture + save / refine handlers
  // -----------------------------------------------------------------------

  async function handleSavePreview() {
    const base64 = canvasRef.current?.capture();
    if (!base64) {
      toast.error(t("common.error"));
      return;
    }
    captureComposite(base64);
    await savePreview(base64);
  }

  async function handleRefine() {
    const base64 = canvasRef.current?.capture();
    if (base64) {
      captureComposite(base64);
      await refineWithAi(base64);
    }
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("flows.tryOn.title"),
          headerShadowVisible: false,
          gestureEnabled: step === "pickImages",
          unstable_headerLeftItems: () => [
            {
              type: "button",
              variant: "plain",
              label: t("common.back"),
              icon: { name: "chevron.left", type: "sfSymbol" },
              onPress: handleBack,
            },
          ],
          unstable_headerRightItems: () => {
            if (step !== "overlay") return [];
            const items: any[] = [];
            if (!hasActiveSubscription) {
              items.push({
                type: "button",
                label: t("common.upgrade"),
                variant: "prominent",
                tintColor: "#3563E9",
                labelStyle: { fontWeight: "bold" },
                onPress: () => router.push("/(paywall)?variant=discount"),
              });
            }
            items.push({
              type: "button",
              label: t("common.save"),
              variant: "prominent",
              tintColor: "#8B5CF6",
              labelStyle: { fontWeight: "bold" },
              onPress: handleSavePreview,
              disabled: isRefining,
            });
            return items;
          },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ---- Step 1: pick images ---- */}
        {step === "pickImages" && (
          <View style={styles.pickSection}>
            <Text type="sm" style={{ opacity: 0.6, textAlign: "center" }}>
              {t("flows.tryOn.description")}
            </Text>

            <View style={styles.pickRow}>
              <ImagePickerCard
                uri={tattooUri}
                label={t("flows.tryOn.pickTattoo")}
                icon="image-outline"
                onPress={handleTattooPickerAlert}
                isDark={isDark}
                isLoading={isProcessingTattoo}
              />
              <ImagePickerCard
                uri={bodyUri}
                label={t("flows.tryOn.pickBody")}
                icon="body-outline"
                onPress={handleBodyPickerAlert}
                isDark={isDark}
              />
            </View>

            <Text type="xs" style={{ opacity: 0.4, textAlign: "center" }}>
              {t("flows.tryOn.adjustPosition")}
            </Text>
          </View>
        )}

        {/* ---- Step 2: overlay canvas ---- */}
        {step === "overlay" && tattooUri && bodyUri && (
          <View style={styles.overlaySection}>
            <TattooOverlayCanvas
              ref={canvasRef}
              tattooUri={tattooUri}
              bodyUri={bodyUri}
              opacity={opacity}
              onOpacityChange={setOpacity}
              isWarpMode={isWarpMode}
            />

            <View style={styles.modeRow}>
              <ModeToggle
                label={t("flows.tryOn.moveMode")}
                isActive={!isWarpMode}
                onPress={() => setIsWarpMode(false)}
                isDark={isDark}
              />
              <ModeToggle
                label={t("flows.tryOn.warpMode")}
                isActive={isWarpMode}
                onPress={() => setIsWarpMode(true)}
                isDark={isDark}
              />
            </View>

            {isWarpMode && (
              <Text type="xs" style={{ opacity: 0.4, textAlign: "center" }}>
                {t("flows.tryOn.warpHint")}
              </Text>
            )}

            {refinedUri && (
              <View style={styles.refinedSection}>
                <Text type="sm" weight="semibold" style={{ textAlign: "center" }}>
                  {t("common.success")}
                </Text>
                <Image
                  source={{ uri: refinedUri }}
                  style={styles.refinedImage}
                  resizeMode="contain"
                />
              </View>
            )}

            <View style={styles.actionRow}>
              <PressableScale
                onPress={handleSavePreview}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: isDark ? Color.zinc[800] : Color.zinc[100],
                    borderColor: isDark ? Color.zinc[700] : Color.zinc[200],
                  },
                ]}
              >
                <Ionicons name="download-outline" size={20} color={isDark ? "#fff" : "#000"} />
                <Text type="sm" weight="semibold">
                  {t("flows.tryOn.savePreview")}
                </Text>
              </PressableScale>

              <PressableScale
                onPress={handleRefine}
                style={[
                  styles.actionButton,
                  styles.refineButton,
                  isRefining && styles.disabledButton,
                ]}
                enabled={!isRefining}
              >
                {isRefining ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons name="sparkles" size={20} color="#fff" />
                )}
                <Text type="sm" weight="semibold" style={{ color: "#fff" }}>
                  {t("flows.tryOn.refineWithAi")}
                </Text>
              </PressableScale>
            </View>

            <Text
              type="xs"
              style={{ opacity: 0.4, textAlign: "center", marginTop: -4 }}
            >
              {t("flows.tryOn.refineDescription")}
            </Text>

            <View style={styles.repickRow}>
              <PressableScale onPress={handleTattooPickerAlert} style={styles.repickButton}>
                <Ionicons name="swap-horizontal" size={16} color={isDark ? "#fff" : "#000"} />
                <Text type="xs" weight="medium">
                  {t("flows.tryOn.pickTattoo")}
                </Text>
              </PressableScale>
              <PressableScale onPress={handleBodyPickerAlert} style={styles.repickButton}>
                <Ionicons name="swap-horizontal" size={16} color={isDark ? "#fff" : "#000"} />
                <Text type="xs" weight="medium">
                  {t("flows.tryOn.pickBody")}
                </Text>
              </PressableScale>
            </View>
          </View>
        )}
      </ScrollView>

      <AppTattooGallery
        isOpen={galleryOpen}
        onOpenChange={setGalleryOpen}
        onSelectDesign={selectTattooFromUrl}
        isDark={isDark}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48, gap: 20 },
  pickSection: { gap: 20, paddingTop: 24 },
  pickRow: { flexDirection: "row", gap: 16, justifyContent: "center" },
  overlaySection: { gap: 16, alignItems: "center" },
  modeRow: { flexDirection: "row", gap: 8 },
  actionRow: { flexDirection: "row", gap: 12, width: "100%" },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  refineButton: { backgroundColor: "#8B5CF6", borderColor: "#7C3AED" },
  disabledButton: { opacity: 0.6 },
  refinedSection: { gap: 8, width: "100%" },
  refinedImage: { width: "100%", aspectRatio: 1, borderRadius: 16 },
  repickRow: { flexDirection: "row", gap: 12, justifyContent: "center" },
  repickButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
