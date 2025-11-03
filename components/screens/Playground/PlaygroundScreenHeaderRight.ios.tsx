import { theme } from "@/theme/theme";
import {
  Button,
  Host,
  HStack,
  Image,
  Text as SwiftUIText,
} from "@expo/ui/swift-ui";
import { fixedSize, padding } from "@expo/ui/swift-ui/modifiers";
import { GlassContainer, GlassView } from "expo-glass-effect";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";

interface PlaygroundScreenHeaderRightProps {
  onSave: () => void;
  onShare: () => void;
  isSaveDisabled: boolean;
  onReset: () => void;
  onSelectImageFromGallery: (image: string) => void;
}
export function PlaygroundScreenHeaderRight({
  onSave,
  onShare,
  isSaveDisabled,
  onReset,
  onSelectImageFromGallery,
}: PlaygroundScreenHeaderRightProps) {
  const pickImageFromGallery = useCallback(async () => {
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
          onSelectImageFromGallery(selectedImage.base64);
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }, [onSelectImageFromGallery]);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <GlassContainer spacing={65} style={styles.containerStyle}>
        <GlassView style={styles.glass} isInteractive>
          <Host matchContents>
            <Button controlSize="small" onPress={onReset}>
              <Image
                systemName="arrow.counterclockwise"
                size={theme.fontSize20}
                color="white"
              />
            </Button>
          </Host>
          <Host matchContents>
            <Button controlSize="small" onPress={pickImageFromGallery}>
              <Image
                systemName="photo.on.rectangle"
                size={theme.fontSize18}
                color="white"
              />
            </Button>
          </Host>
          <Host matchContents>
            <Button controlSize="small" onPress={onShare}>
              <Image
                systemName="square.and.arrow.up"
                size={theme.fontSize20}
                color="white"
              />
            </Button>
          </Host>
        </GlassView>
      </GlassContainer>
      <Host matchContents>
        <Button
          variant="glassProminent"
          controlSize="mini"
          onPress={onSave}
          disabled={isSaveDisabled}
          modifiers={[fixedSize()]}
        >
          <HStack modifiers={[padding({ vertical: 4 })]}>
            <SwiftUIText color="white">Save</SwiftUIText>
          </HStack>
        </Button>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  glass: {
    width: "auto",
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    gap: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
