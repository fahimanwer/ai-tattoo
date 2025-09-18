import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { bodyParts } from "@/constants/BodyParts";
import { Color } from "@/constants/TWPalette";
import { useTattooCreation } from "@/context/TattooCreationContext";
import { ContextMenu, Button as ExpoUIButton, Host } from "@expo/ui/swift-ui";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { useCallback } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "../ui/Icon";

export function BodyPartSelection() {
  const {
    selectedBodyPartCategory,
    selectedBodyPartVariant,
    customUserImage,
    isUsingCustomImage,
    setSelectedBodyPartCategory,
    setSelectedBodyPartVariant,
    setCustomUserImage,
    setIsUsingCustomImage,
  } = useTattooCreation();

  // Function to select image from gallery
  const pickImageFromGallery = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        allowsMultipleSelection: false,
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
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  }, [setCustomUserImage, setIsUsingCustomImage]);

  // Function to take photo with camera
  const takePhotoWithCamera = useCallback(async () => {
    try {
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
        allowsEditing: true,
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
        } else {
          Alert.alert("Error", "Failed to get image data");
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  }, [setCustomUserImage, setIsUsingCustomImage]);

  // Function to remove custom image and return to default
  const removeCustomImage = useCallback(() => {
    setCustomUserImage(undefined);
    setIsUsingCustomImage(false);
  }, [setCustomUserImage, setIsUsingCustomImage]);

  function nextStep() {
    router.push("/home/new/select-tattoo");
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Select body part or upload photo
        </Text>
        {/* Context menu for image selection */}
        <Host useViewportSizeMeasurement matchContents>
          <ContextMenu>
            <ContextMenu.Items>
              <ExpoUIButton
                systemImage="photo.on.rectangle"
                onPress={pickImageFromGallery}
              >
                Select from Library
              </ExpoUIButton>
              <ExpoUIButton
                systemImage="camera.fill"
                onPress={takePhotoWithCamera}
              >
                Take Photo
              </ExpoUIButton>
            </ContextMenu.Items>
            <ContextMenu.Trigger>
              <ExpoUIButton
                systemImage="photo.badge.plus.fill"
                variant="glass"
                color="white"
              />
            </ContextMenu.Trigger>
          </ContextMenu>
        </Host>
      </View>

      {/* Custom User Image Preview */}
      {isUsingCustomImage && customUserImage && (
        <View style={styles.customImageSection}>
          <View style={styles.customImageContainer}>
            <Image
              cachePolicy="memory-disk"
              source={{ uri: customUserImage.uri }}
              style={styles.customImagePreview}
              contentFit="cover"
            />
            <View style={styles.customImageActions}>
              <GlassContainer
                spacing={10}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <GlassView
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  isInteractive
                >
                  <Pressable onPress={removeCustomImage}>
                    <Icon
                      symbol="trash"
                      style={{ width: 20, height: 20 }}
                      color="white"
                    />
                  </Pressable>
                </GlassView>
                <GlassView
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  isInteractive
                >
                  <Pressable onPress={pickImageFromGallery}>
                    <Icon
                      symbol="photo"
                      style={{ width: 20, height: 20 }}
                      color="white"
                    />
                  </Pressable>
                </GlassView>
              </GlassContainer>
              {/* <BlurView intensity={20} style={styles.customImageActionsBlur}>
                <Button
                  symbol="trash"
                  onPress={removeCustomImage}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
                <Button
                  symbol="photo"
                  onPress={pickImageFromGallery}
                  radius="full"
                  variant="outline"
                  color="white"
                  style={{ width: 36, height: 36 }}
                />
              </BlurView> */}
            </View>
          </View>
        </View>
      )}

      {!isUsingCustomImage && (
        <View
          style={{
            position: "relative",
            height: 110,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              paddingHorizontal: 16,
              paddingTop: 4,
            }}
          >
            <Pressable
              onPress={(pressed) => {
                setSelectedBodyPartCategory("back");
              }}
              style={({ pressed }) => [
                {
                  transform: [
                    {
                      scale:
                        selectedBodyPartCategory === "back"
                          ? 1
                          : pressed
                          ? 0.89
                          : 0.9,
                    },
                  ],
                  position: "relative",
                  width: 110,
                  height: "100%",
                  marginTop: 8,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  transform: [{ rotate: "-4deg" }],
                  left: 14,
                  top: 0,
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-3.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: -10,
                  top: 18,
                  transform: [{ rotate: "12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-2.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 32,
                  top: 14,
                  transform: [{ rotate: "-12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 14px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-1.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={(pressed) => {
                setSelectedBodyPartCategory("arm");
              }}
              style={({ pressed }) => [
                {
                  transform: [
                    {
                      scale:
                        selectedBodyPartCategory === "arm"
                          ? 1
                          : pressed
                          ? 0.89
                          : 0.9,
                    },
                  ],
                  position: "relative",
                  width: 110,
                  height: "100%",
                  marginLeft: 44,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  transform: [{ rotate: "-4deg" }],
                  left: 14,
                  top: 0,
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-3.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: -10,
                  top: 18,
                  transform: [{ rotate: "12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-2.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 32,
                  top: 14,
                  transform: [{ rotate: "-12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={(pressed) => {
                setSelectedBodyPartCategory("neck");
              }}
              style={({ pressed }) => [
                {
                  transform: [
                    {
                      scale:
                        selectedBodyPartCategory === "neck"
                          ? 1
                          : pressed
                          ? 0.89
                          : 0.9,
                    },
                  ],
                  position: "relative",
                  width: 110,
                  height: "100%",
                  marginLeft: 44,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  transform: [{ rotate: "-4deg" }],
                  left: 14,
                  top: 0,
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-1.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: -10,
                  top: 18,
                  transform: [{ rotate: "12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  cachePolicy="memory-disk"
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-2.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 32,
                  top: 14,
                  transform: [{ rotate: "-12deg" }],
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: Color.grayscale[950],
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  source={{
                    uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/neck-female-1.png",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </Pressable>
          </ScrollView>
        </View>
      )}

      {/* Body Part Variant Selection - Only show when not using custom image */}
      {!isUsingCustomImage && selectedBodyPartCategory && (
        <>
          <ScrollView
            horizontal
            style={{
              flex: 1,
              paddingHorizontal: 16,
              marginTop: 34,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {(() => {
              const categoryData =
                bodyParts[selectedBodyPartCategory as keyof typeof bodyParts];
              const allImages = [
                ...categoryData.map((url, index) => ({
                  url,
                  gender: "male",
                  index: index + 1,
                })),
              ];

              return allImages.map((imageData, globalIndex) => (
                <Pressable
                  key={`${selectedBodyPartCategory}-${imageData.gender}-${imageData.index}`}
                  onPress={() => setSelectedBodyPartVariant(imageData.url)}
                >
                  <Image
                    cachePolicy="memory-disk"
                    source={{ uri: imageData.url }}
                    style={{
                      width: 80,
                      height: 80,
                      marginLeft: 12,
                      borderRadius: 16,
                      borderWidth: 4,
                      borderColor:
                        selectedBodyPartVariant === imageData.url
                          ? Color.orange[400]
                          : "transparent",
                    }}
                    contentFit="cover"
                  />
                </Pressable>
              ));
            })()}
          </ScrollView>
        </>
      )}

      {/* Navigation Button */}
      <View style={styles.navigationContainer}>
        <Button
          title="Select Tattoo Style"
          variant="solid"
          radius="full"
          color="orange"
          onPress={nextStep}
          style={styles.nextButton}
          disabled={
            !isUsingCustomImage &&
            (!selectedBodyPartCategory || !selectedBodyPartVariant)
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  customImageSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  customImageContainer: {
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: 300,
  },
  customImagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Color.orange[400],
  },
  customImageActions: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  customImageActionsBlur: {
    position: "relative",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    gap: 12,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    marginVertical: 44,
  },
  nextButton: {
    width: "100%",
  },
});
