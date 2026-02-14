import { InteractiveImage } from "@/src/components/ui/InteractiveImage";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { use } from "react";
import { StyleSheet, View } from "react-native";

export default function PlaygroundPreview() {
  const params = useLocalSearchParams<{ imageUri: string }>();
  const { handleShare, handleSave } = use(PlaygroundContext);
  const router = useRouter();
  const { isDark } = useTheme();

  const imageUri = params.imageUri;

  const onClose = () => {
    router.dismiss();
  };

  const onShare = async () => {
    if (!imageUri) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await handleShare(imageUri);
  };

  const onSave = async () => {
    if (!imageUri) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await handleSave(imageUri);
  };

  if (!imageUri) {
    router.back();
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Inkigo AI",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: "Close",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: onClose,
            },
          ],
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: "Share",
              icon: {
                name: "square.and.arrow.up",
                type: "sfSymbol",
              },
              onPress: onShare,
            },
            {
              type: "button",
              label: "Save",
              variant: "prominent",
              tintColor: "#3563E9",
              onPress: onSave,
              labelStyle: {
                fontWeight: "bold",
              },
            },
          ],
        }}
      />
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#F5F5F7' }]}>
        <InteractiveImage uri={imageUri} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
