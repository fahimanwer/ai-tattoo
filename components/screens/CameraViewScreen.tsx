import { useIsFocused } from "@react-navigation/native";
import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { GlassView } from "expo-glass-effect";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { PressableWithoutFeedback } from "pressto";
import { useRef, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

const AnimatedCameraView = Animated.createAnimatedComponent(CameraView);

export function CameraViewScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { bottom, top } = useSafeAreaInsets();
  const ref = useRef<CameraView>(null);
  const isFocused = useIsFocused();

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

  function takePhoto() {
    // ref.current?.takePictureAsync();
    console.log("takePhoto");
  }

  async function pickImageFromGallery() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [3, 2],
        quality: 0.3,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          // This makes navigating slow, we need to lift sessions state, set it here and navigate to the playground screen
          // router.push({
          //   pathname: "/(playground)",
          //   params: {
          //     imageBase64: `data:image/png;base64,${selectedImage.base64}`,
          //   },
          // });
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Only render camera when screen is focused */}
      {isFocused && (
        <AnimatedCameraView
          entering={FadeIn.duration(1000)}
          style={{ flex: 1 }}
          facing={facing}
          ref={ref}
        />
      )}

      {/* Camera controls */}
      <View
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <CameraControlButton
          onPress={pickImageFromGallery}
          icon="photo.on.rectangle"
        />
        <CameraControlButton
          onPress={takePhoto}
          icon="circle"
          glassSize={70}
          symbolSize={50}
        />
        <CameraControlButton
          onPress={toggleCameraFacing}
          icon="arrow.trianglehead.2.clockwise.rotate.90.camera"
        />
      </View>

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
}: {
  onPress: () => void;
  icon: SFSymbol;
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
        <SymbolView name={icon} size={symbolSize} />
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
