import { Color } from "@/constants/TWPalette";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { failureHaptic, successHaptic } from "@/lib/haptics-patterns.ios";
import { cacheBase64Image } from "@/lib/image-cache";
import CoreHaptics from "@/modules/native-core-haptics";
import { useIsFocused } from "@react-navigation/native";
import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { PressableWithoutFeedback } from "pressto";
import { use, useRef, useState } from "react";
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
  const isFocused = useIsFocused();
  const {
    pickImageFromGallery,
    setSessionGenerations,
    setActiveGenerationIndex,
    sessionGenerations,
    activeGenerationIndex,
  } = use(PlaygroundContext);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission?.status === PermissionStatus.UNDETERMINED) {
    return (
      <View style={styles.emptyContainer}>
        <SymbolView name="camera.fill" size={60} />
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          Let&apos;s Get Started!
        </Text>
        <Text style={styles.emptyDescription}>
          To open the camera for the first time, we just need your permission.
        </Text>
        <Button
          onPress={requestPermission}
          title="Enable Camera"
          variant="link"
          color="yellow"
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
        <SymbolView name="exclamationmark.triangle.fill" size={60} />
        <Text type="lg" weight="semibold" style={styles.emptyTitle}>
          Camera Access Needed
        </Text>
        <Text style={styles.emptyDescription}>
          Camera permission was denied. To continue, please enable it in your
          device settings.
        </Text>
        <Button
          onPress={() => Linking.openURL("app-settings:")}
          title="Open Settings"
          variant="link"
          color="yellow"
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
    router.push("/(playground)");
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Only render camera when screen is focused */}
      {photoBase64 && (
        <View style={{ flex: 1 }}>
          <AnimatedImage
            source={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
            style={{ width: "100%", height: "100%" }}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
          />
        </View>
      )}

      {isFocused && !photoBase64 && (
        <AnimatedCameraView
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
          mirror={facing === "front"}
          onCameraReady={() => {
            setIsCameraReady(true);
          }}
          style={{ flex: 1 }}
          facing={facing}
          ref={ref}
        />
      )}

      {!isCameraReady || (!isFocused && <View style={{ flex: 1 }} />)}

      {/* Camera controls */}
      <Animated.View
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      >
        <CameraControlButton
          onPress={async () => {
            const result = await pickImageFromGallery();
            if (result) {
              router.push("/(playground)");
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
  return (
    <GlassView
      style={{
        height: glassSize,
        width: glassSize,
        borderRadius: glassSize / 2,
        alignItems: "center",
        justifyContent: "center",
      }}
      isInteractive={true}
    >
      <PressableWithoutFeedback onPress={onPress}>
        <SymbolView name={icon} size={symbolSize} tintColor={color} />
      </PressableWithoutFeedback>
    </GlassView>
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
    padding: 40,
    minHeight: 300,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});
