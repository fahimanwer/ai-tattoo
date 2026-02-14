import { failureHaptic, successHaptic } from "@/lib/haptics-patterns.ios";
import { cacheBase64Image } from "@/lib/image-cache";
import CoreHaptics from "@/modules/native-core-haptics";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useIsFocused } from "@react-navigation/native";
import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { useThemeColor } from "heroui-native";
import { PressableWithoutFeedback } from "pressto";
import { use, useEffect, useRef, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

const AnimatedCameraView = Animated.createAnimatedComponent(CameraView);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export function CameraViewScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { top } = useSafeAreaInsets();
  const ref = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const isFocused = useIsFocused();
  const [shouldRenderCamera, setShouldRenderCamera] = useState(isFocused);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark } = useTheme();
  const foreground = useThemeColor("foreground");
  const muted = useThemeColor("muted");
  const {
    pickImageFromGallery,
    setSessionGenerations,
    setActiveGenerationIndex,
    sessionGenerations,
    activeGenerationIndex,
  } = use(PlaygroundContext);

  // Handle delayed unmounting of camera to prevent flickering when switching screens quickly
  useEffect(() => {
    if (isFocused) {
      // Immediately show camera when focused
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = null;
      }
      setShouldRenderCamera(true);
    } else {
      // Delay hiding camera by 2 seconds when unfocused
      unmountTimerRef.current = setTimeout(() => {
        setShouldRenderCamera(false);
      }, 2000);
    }

    return () => {
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current);
      }
    };
  }, [isFocused]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission?.status === PermissionStatus.UNDETERMINED) {
    return (
      <View style={styles.emptyContainer}>
        <SymbolView name="camera.fill" size={60} tintColor={foreground} />
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          Let&apos;s Get Started
        </Text>
        <Text style={[styles.emptyDescription, { color: muted }]}>
          We need access to your camera to take photos.
        </Text>
        <Button
          onPress={requestPermission}
          title="Continue"
          variant="link"
          color="blue"
        />
      </View>
    );
  }

  if (permission?.status === PermissionStatus.DENIED) {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          },
        ]}
      >
        <SymbolView
          name="exclamationmark.triangle.fill"
          size={60}
          tintColor={foreground}
        />
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          Camera Access Needed
        </Text>
        <Text style={[styles.emptyDescription, { color: muted }]}>
          This feature requires access to your camera. You can manage camera
          access in your device settings.
        </Text>
        <Button
          onPress={() => Linking.openURL("app-settings:")}
          title="Open Settings"
          variant="link"
          color="blue"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (!ref.current?._onCameraReady) {
      return;
    }
    const photo = await ref.current?.takePictureAsync({
      base64: true,
      quality: 0.3,
    });

    if (photo.base64) {
      CoreHaptics.playPattern(successHaptic);
      setPhotoBase64(photo.base64);
    }
  }

  async function handleConfirmPhoto() {
    if (!photoBase64) return;

    // Cache the image to disk and store only the file URI
    const fileUri = await cacheBase64Image(photoBase64, "jpg");

    // Check if we can add to the active group (max 2 images per group)
    const canAddToActiveGroup =
      activeGenerationIndex !== undefined &&
      sessionGenerations[activeGenerationIndex].length < 2;

    if (canAddToActiveGroup) {
      // Add to existing group (max 2 images)
      setSessionGenerations((prev) => {
        const newGenerations = [...prev];
        newGenerations[activeGenerationIndex] = [
          ...newGenerations[activeGenerationIndex],
          fileUri,
        ];
        return newGenerations;
      });
    } else {
      // Create a new group with this single image
      setSessionGenerations((prev) => [...prev, [fileUri]]);
      setActiveGenerationIndex(sessionGenerations.length);
    }

    setPhotoBase64(null);
    router.dismissTo("/(playground)");
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Grid toggle button - top left */}
      {!photoBase64 && (
        <View style={[styles.gridButtonContainer, { top: top + 16 }]}>
          <CameraControlButton
            onPress={() => setShowGrid((prev) => !prev)}
            icon="grid"
            color={showGrid ? "#3563E9" : "white"}
          />
        </View>
      )}

      {/* Only render camera when screen is focused */}
      {photoBase64 && (
        <View style={{ flex: 1 }}>
          <AnimatedImage
            source={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
            style={{ width: "100%", height: "100%" }}
            // entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
          />
        </View>
      )}

      {shouldRenderCamera && !photoBase64 && (
        <View style={{ flex: 1 }}>
          <AnimatedCameraView
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            mirror={facing === "front"}
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
            style={{ flex: 1 }}
            facing={facing}
            ref={ref}
          />
          {showGrid && <GridOverlay />}
        </View>
      )}

      {!isCameraReady || (!shouldRenderCamera && <View style={{ flex: 1 }} />)}

      {/* Camera controls */}
      <Animated.View
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
      >
        <CameraControlButton
          onPress={async () => {
            const result = await pickImageFromGallery();
            if (result) {
              router.dismissTo("/(playground)");
            }
          }}
          icon="photo.on.rectangle"
        />

        {photoBase64 ? (
          <CameraControlButton
            onPress={handleConfirmPhoto}
            icon="checkmark"
            color={Color.green[500]}
            glassSize={70}
            symbolSize={50}
          />
        ) : (
          <CameraControlButton
            onPress={takePhoto}
            icon="circle"
            glassSize={70}
            symbolSize={50}
          />
        )}

        {photoBase64 ? (
          <CameraControlButton
            onPress={() => {
              setPhotoBase64(null);
              CoreHaptics.playPattern(failureHaptic);
            }}
            icon="trash"
            color={Color.red[500]}
          />
        ) : (
          <CameraControlButton
            onPress={toggleCameraFacing}
            icon="arrow.trianglehead.2.clockwise.rotate.90.camera"
          />
        )}
      </Animated.View>

      {/* Bottom tabs height */}
      <View style={{ height: 100 }} />
    </View>
  );
}

const GridOverlay = () => {
  const { isDark } = useTheme();
  const gridColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)";
  return (
    <View style={styles.gridOverlay}>
      {/* Vertical lines */}
      <View style={[styles.gridLine, styles.gridLineVertical, { left: "33.33%", backgroundColor: gridColor }]} />
      <View style={[styles.gridLine, styles.gridLineVertical, { left: "66.66%", backgroundColor: gridColor }]} />
      {/* Horizontal lines */}
      <View style={[styles.gridLine, styles.gridLineHorizontal, { top: "33.33%", backgroundColor: gridColor }]} />
      <View style={[styles.gridLine, styles.gridLineHorizontal, { top: "66.66%", backgroundColor: gridColor }]} />
    </View>
  );
};

const CameraControlButton = ({
  onPress,
  icon,
  glassSize = 50,
  symbolSize = 30,
  color = "white",
}: {
  onPress: () => void;
  icon: SFSymbol;
  color?: string;
  glassSize?: number;
  symbolSize?: number;
}) => {
  const { isDark } = useTheme();
  const containerStyle = {
    height: glassSize,
    width: glassSize,
    borderRadius: glassSize / 2,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  const content = (
    <PressableWithoutFeedback onPress={onPress}>
      <SymbolView name={icon} size={symbolSize} tintColor={color} />
    </PressableWithoutFeedback>
  );

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView style={containerStyle} isInteractive={true}>
        {content}
      </GlassView>
    );
  }

  return (
    <View
      style={[
        containerStyle,
        {
          backgroundColor: isDark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.08)",
        },
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    minHeight: 300,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    textAlign: "center",
    marginTop: 8,
  },
  gridButtonContainer: {
    position: "absolute",
    left: 16,
    zIndex: 10,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  gridLine: {
    position: "absolute",
  },
  gridLineVertical: {
    width: 1,
    height: "100%",
  },
  gridLineHorizontal: {
    height: 1,
    width: "100%",
  },
});
