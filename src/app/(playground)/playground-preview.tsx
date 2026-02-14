import { InteractiveImage } from "@/src/components/ui/InteractiveImage";
import { PlaygroundContext } from "@/src/context/PlaygroundContext";
import { useTheme } from "@/src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { use } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function PlaygroundPreview() {
  const params = useLocalSearchParams<{ imageUri: string }>();
  const { handleShare, handleSave } = use(PlaygroundContext);
  const router = useRouter();
  const { isDark } = useTheme();
  const { t } = useTranslation();

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
          title: t('playground.preview.title'),
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: t('common.close'),
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
              label: t('common.share'),
              icon: {
                name: "square.and.arrow.up",
                type: "sfSymbol",
              },
              onPress: onShare,
            },
            {
              type: "button",
              label: t('common.save'),
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
