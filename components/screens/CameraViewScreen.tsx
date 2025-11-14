import { useIsFocused } from "@react-navigation/native";
import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

const AnimatedCameraView = Animated.createAnimatedComponent(CameraView);

export function CameraViewScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { bottom, top } = useSafeAreaInsets();
  const ref = useRef<CameraView>(null);
  const isFocused = useIsFocused();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission.status === PermissionStatus.UNDETERMINED) {
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

  if (permission.status === PermissionStatus.DENIED) {
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

      {/* Bottom tabs height */}
      <View style={{ height: 100 }} />
    </View>
  );
}

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
