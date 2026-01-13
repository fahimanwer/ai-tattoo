import { BLURHASH } from "@/lib/image-cache";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import { spaceScale } from "@/src/theme/theme";
import {
  Button,
  ContextMenu,
  Host,
  HStack,
  Image as SwiftUIImage,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  frame,
  glassEffect,
  menuActionDismissBehavior,
  onTapGesture,
  padding,
} from "@expo/ui/swift-ui/modifiers";
import * as Clipboard from "expo-clipboard";
import { File } from "expo-file-system";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { PressableScale } from "pressto";
import { Alert, Dimensions, Linking, StyleSheet, View } from "react-native";
import { toast } from "sonner-native";
import { ResultImageProps } from "./ResultImage";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth - spaceScale(16);

export function ResultImage({
  uri,
  onPress,
  isSingleImage,
  onRemove,
}: ResultImageProps) {
  const handleCopyImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Read the image file as base64 using new File API
      const file = new File(uri);
      const base64 = await file.base64();

      // Set to clipboard - setImageAsync expects raw base64 without MIME prefix
      await Clipboard.setImageAsync(base64);

      toast.success("Image copied to clipboard", {
        dismissible: true,
      });
    } catch (error) {
      console.error("Error copying image:", error);
      toast.error("Failed to copy image", {
        dismissible: true,
      });
    }
  };

  const handleShareImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      await Share.open({
        url: uri,
        message: "Check out my tattoo design!",
      });
    } catch (error) {
      console.error("Error sharing image:", error);
      // User cancelled or error occurred
      if ((error as any)?.message !== "User did not share") {
        toast.error("Failed to share image", {
          dismissible: true,
        });
      }
    }
  };

  const handleSaveImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Check permissions first
      const permission = await MediaLibrary.getPermissionsAsync();

      if (!permission.granted) {
        // Request permission if not granted
        const requestResult = await MediaLibrary.requestPermissionsAsync();

        if (!requestResult.granted) {
          // Permission denied - show alert with option to open settings
          Alert.alert(
            "Photo Access Needed",
            "To save images to your gallery, we need access to your photos. You can enable this in Settings.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                style: "default",
                onPress: () => {
                  Linking.openURL("app-settings:");
                },
              },
            ]
          );
          return;
        }
      }

      // Read the image file as base64
      const file = new File(uri);
      const base64 = await file.base64();

      // Save to the custom album
      await saveBase64ToAlbum(base64, "png");

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toast.success("Image saved to gallery!", {
        dismissible: true,
        duration: 1_000,
      });
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save image. Please try again.", {
        dismissible: true,
        duration: 2_000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Host ignoreSafeAreaKeyboardInsets matchContents>
        <ContextMenu
          activationMethod="longPress"
          modifiers={[menuActionDismissBehavior("enabled")]}
        >
          <ContextMenu.Items>
            <Button
              label="Copy"
              onPress={handleCopyImage}
              modifiers={[buttonStyle("bordered")]}
              systemImage="doc.on.doc"
            />
            <Button
              label="Share"
              onPress={handleShareImage}
              modifiers={[buttonStyle("bordered")]}
              systemImage="square.and.arrow.up"
            />
            <Button
              label="Save Image"
              onPress={handleSaveImage}
              modifiers={[buttonStyle("bordered")]}
              systemImage="square.and.arrow.down"
            />
          </ContextMenu.Items>
          <ContextMenu.Trigger>
            <PressableScale onPress={onPress} animationType="timing">
              <Image
                source={{ uri }}
                placeholder={{ blurhash: BLURHASH }}
                cachePolicy="memory-disk"
                style={{
                  width: isSingleImage
                    ? screenWidth - spaceScale(32)
                    : imageWidth / 2 - spaceScale(16),
                  height: isSingleImage ? 400 : 200,
                  borderRadius: 16,
                }}
                contentFit="cover"
                contentPosition="center"
                transition={350}
              />
            </PressableScale>
          </ContextMenu.Trigger>
        </ContextMenu>
      </Host>
      {onRemove && (
        <Host
          style={styles.closeButtonWrapper}
          ignoreSafeAreaKeyboardInsets
          matchContents
        >
          <HStack
            modifiers={[
              onTapGesture(onRemove),
              padding({ vertical: 11, horizontal: 11 }),
              glassEffect({
                glass: { variant: "regular", interactive: true },
                shape: "circle",
              }),
            ]}
          >
            <SwiftUIImage
              systemName="trash"
              color="primary"
              size={12}
              modifiers={[frame({ height: 11, width: 11 })]}
            />
          </HStack>
        </Host>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  closeButtonWrapper: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    zIndex: 10,
  },
});
