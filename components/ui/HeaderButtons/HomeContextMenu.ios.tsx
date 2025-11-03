import { theme } from "@/theme/theme";
import {
  Button,
  ContextMenu,
  Host,
  HStack,
  Image,
  Text,
} from "@expo/ui/swift-ui";
import { buttonStyle, fixedSize } from "@expo/ui/swift-ui/modifiers";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet, Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { useCallback } from "react";

export function HomeContextMenu() {
  const router = useRouter();
  const { setCustomUserImage, setIsUsingCustomImage } = useTattooCreation();

  // Function to take photo with camera and navigate directly to tattoo selection
  const handleTryOnTattoo = useCallback(async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "We need camera permissions to take photos. Please enable camera access in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Settings",
              onPress: () => Linking.openURL("app-settings:"),
            },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          setCustomUserImage({
            uri: selectedImage.uri,
            base64: selectedImage.base64,
          });
          setIsUsingCustomImage(true);
          // Navigate directly to tattoo selection, skipping body part selection
          router.push("/(new)/select-tattoo");
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  }, [setCustomUserImage, setIsUsingCustomImage, router]);

  return (
    <Host style={styles.container}>
      <ContextMenu
        modifiers={[
          buttonStyle(isLiquidGlassAvailable() ? "glass" : "bordered"),
        ]}
      >
        <ContextMenu.Items>
          <Button
            systemImage="person.crop.square"
            onPress={handleTryOnTattoo}
          >
            Try On Tattoo
          </Button>
          <Button
            systemImage="apple.image.playground"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/(playground)");
            }}
          >
            Tattoo Playground
          </Button>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <HStack modifiers={[fixedSize()]} spacing={theme.space8}>
            <Image systemName="plus" size={theme.fontSize16} color="white" />
            <Text weight="semibold" size={theme.fontSize16} color={"white"}>
              Tattoo
            </Text>
          </HStack>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 34,
    width: 94,
  },
});
