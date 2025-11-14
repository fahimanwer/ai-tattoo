import { Home } from "@/components/screens/Home";
import { useTattooCreation } from "@/context/TattooCreationContext";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Linking } from "react-native";

export default function HomeScreen() {
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
    <>
      <Stack.Screen
        options={{
          // headerRight: () => <HomeContextMenu />,
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              label: "Profile",
              icon: {
                name: "person.fill",
                type: "sfSymbol",
              },
              onPress: () => {
                router.push("/profile");
              },
            },
          ],
          unstable_headerRightItems: (props) => [
            {
              type: "button",
              label: "New Tattoo",
              variant: "prominent",
              tintColor: "yellow",
              labelStyle: {
                fontWeight: "bold",
              },
              onPress: () => {
                router.push("/(playground)");
              },

              // type: "menu",
              // variant: "prominent",
              // label: "New Tattoo",
              // tintColor: "yellow",
              // labelStyle: {
              //   // color: "yellow",
              //   fontWeight: "bold",
              // },
              // menu: {
              //   // title: "New Tattoo",
              //   items: [
              //     {
              //       type: "action",
              //       label: "Try On Tattoo",
              //       onPress: () => {
              //         handleTryOnTattoo();
              //       },
              //       icon: {
              //         name: "person.crop.square",
              //         type: "sfSymbol",
              //       },
              //     },
              //     {
              //       type: "action",
              //       label: "Tattoo Playground",
              //       onPress: () => {
              //         router.push("/(playground)");
              //       },
              //       icon: {
              //         name: "apple.image.playground",
              //         type: "sfSymbol",
              //       },
              //     },
              //   ],
              // },
            },
          ],
        }}
      />
      <Home />
    </>
  );
}
