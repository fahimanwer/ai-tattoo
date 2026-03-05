/**
 * TattooOverlayCanvas -- Skia canvas compositing a body photo (base layer)
 * with a tattoo overlay using multiply blend mode.
 *
 * All tattoos now have transparent backgrounds (either API-extracted or
 * pre-processed gallery PNGs), so we use a single multiply blend path
 * with ink diffusion blur and edge softening.
 *
 * Supports Coons Patch warp mode for perspective deformation.
 */

import { useTheme } from "@/src/context/ThemeContext";
import { Text } from "@/src/components/ui/Text";
import {
  Canvas,
  Image as SkiaImage,
  ImageFormat,
  Group,
  Blur,
  BlurMask,
  Patch,
  ImageShader,
  Circle,
  useCanvasRef,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import {
  useGestureTransform,
  type GestureTransformValues,
} from "./useGestureTransform";
import { usePatchWarp } from "./usePatchWarp";
import { OpacitySlider } from "./OpacitySlider";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TattooOverlayCanvasRef {
  capture: () => string | null;
}

interface TattooOverlayCanvasProps {
  tattooUri: string;
  bodyUri: string;
  opacity: number;
  onOpacityChange: (value: number) => void;
  onGestureValues?: (values: GestureTransformValues) => void;
  isWarpMode?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TattooOverlayCanvas({
  ref,
  tattooUri,
  bodyUri,
  opacity,
  onOpacityChange,
  onGestureValues,
  isWarpMode = false,
}: TattooOverlayCanvasProps & { ref?: React.Ref<TattooOverlayCanvasRef> }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const canvasRef = useCanvasRef();
  const { width: screenWidth } = useWindowDimensions();
  const canvasSize = screenWidth - 32;
  const { gesture: moveGesture, values, skiaTransform } = useGestureTransform();

  const tattooImage = useImage(tattooUri);
  const bodyImage = useImage(bodyUri);

  // Tattoo dimensions
  const tattooNativeW = tattooImage?.width() ?? 1;
  const tattooNativeH = tattooImage?.height() ?? 1;
  const tattooScaleFactor =
    (canvasSize * 0.4) / Math.max(tattooNativeW, tattooNativeH);
  const tattooW = tattooNativeW * tattooScaleFactor;
  const tattooH = tattooNativeH * tattooScaleFactor;
  const tattooX = (canvasSize - tattooW) / 2;
  const tattooY = (canvasSize - tattooH) / 2;
  const tattooCenterX = tattooW / 2;
  const tattooCenterY = tattooH / 2;

  // Patch warp state
  const patchWarp = usePatchWarp(
    tattooX + skiaTransform.translateX,
    tattooY + skiaTransform.translateY,
    tattooW * skiaTransform.scale,
    tattooH * skiaTransform.scale,
  );

  useEffect(() => {
    onGestureValues?.(values);
  }, [onGestureValues, values]);

  const capture = (): string | null => {
    if (!canvasRef.current) return null;
    try {
      const snapshot = canvasRef.current.makeImageSnapshot();
      return snapshot.encodeToBase64(ImageFormat.JPEG, 85);
    } catch (e) {
      console.error("TattooOverlayCanvas: snapshot failed", e);
      return null;
    }
  };

  useImperativeHandle(ref, () => ({ capture }), [capture]);

  const bodyFit = getFitRect(
    bodyImage?.width() ?? canvasSize,
    bodyImage?.height() ?? canvasSize,
    canvasSize,
    canvasSize
  );

  const activeGesture = isWarpMode ? patchWarp.gesture : moveGesture;

  // Shared transform for the tattoo overlay
  const tattooTransform = [
    { translateX: tattooX + tattooCenterX + skiaTransform.translateX },
    { translateY: tattooY + tattooCenterY + skiaTransform.translateY },
    { rotate: skiaTransform.rotation },
    { scale: skiaTransform.scale },
    { translateX: -tattooCenterX },
    { translateY: -tattooCenterY },
  ];

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={activeGesture}>
        <View
          style={[
            styles.canvasContainer,
            {
              width: canvasSize,
              height: canvasSize,
              backgroundColor: isDark ? "#1c1c1e" : "#f2f2f7",
              borderColor: isDark ? "#2c2c2e" : "#d1d1d6",
            },
          ]}
        >
          <Canvas ref={canvasRef} style={[styles.canvas, { width: canvasSize, height: canvasSize }]}>
            {/* Base: body photo */}
            {bodyImage && (
              <SkiaImage
                image={bodyImage}
                x={bodyFit.x}
                y={bodyFit.y}
                width={bodyFit.width}
                height={bodyFit.height}
                fit="cover"
              />
            )}

            {/* Normal mode overlay — multiply blend */}
            {tattooImage && !isWarpMode && (
              <Group
                blendMode="multiply"
                opacity={opacity}
                transform={tattooTransform}
              >
                <SkiaImage
                  image={tattooImage}
                  x={0}
                  y={0}
                  width={tattooW}
                  height={tattooH}
                  fit="contain"
                >
                  {/* Subtle ink diffusion */}
                  <Blur blur={0.3} mode="clamp" />
                </SkiaImage>
                {/* Subtle edge softening */}
                <BlurMask blur={0.5} style="normal" respectCTM />
              </Group>
            )}

            {/* Warp mode: Coons Patch rendering */}
            {tattooImage && isWarpMode && (
              <>
                <Patch
                  patch={patchWarp.corners}
                  texture={[
                    vec(0, 0),
                    vec(tattooNativeW, 0),
                    vec(tattooNativeW, tattooNativeH),
                    vec(0, tattooNativeH),
                  ]}
                  blendMode="multiply"
                  opacity={opacity}
                >
                  <ImageShader
                    image={tattooImage}
                    tx="clamp"
                    ty="clamp"
                    fit="fill"
                    rect={{ x: 0, y: 0, width: tattooNativeW, height: tattooNativeH }}
                  />
                </Patch>

                {patchWarp.corners.map((corner, i) => (
                  <Circle
                    key={i}
                    cx={corner.pos.x}
                    cy={corner.pos.y}
                    r={8}
                    color="rgba(139, 92, 246, 0.8)"
                  />
                ))}
              </>
            )}

          </Canvas>
        </View>
      </GestureDetector>

      <View style={styles.sliderRow}>
        <Text type="sm" weight="medium" style={{ opacity: 0.7 }}>
          {t("flows.tryOn.opacity")}
        </Text>
        <OpacitySlider value={opacity} onValueChange={onOpacityChange} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getFitRect(
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number
): { x: number; y: number; width: number; height: number } {
  const ratio = Math.min(dstW / srcW, dstH / srcH);
  const w = srcW * ratio;
  const h = srcH * ratio;
  return { x: (dstW - w) / 2, y: (dstH - h) / 2, width: w, height: h };
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: { gap: 12, alignItems: "center" },
  canvasContainer: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  canvas: {},
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
});
