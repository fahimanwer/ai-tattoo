/**
 * FlowResultActions -- shared save/share buttons for flow results.
 * Used by CombineFlow, UpscaleFlow, and EraseFlow.
 */

import { getCachedImageAsBase64 } from "@/lib/image-cache";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import { Button, useThemeColor } from "heroui-native";

interface FlowResultActionsProps {
  resultUri: string;
}

export function FlowResultActions({ resultUri }: FlowResultActionsProps) {
  const { t } = useTranslation();
  const foreground = useThemeColor("foreground") as string;

  const handleSave = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const permission = await MediaLibrary.getPermissionsAsync();
      if (!permission.granted) {
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        if (!requestResult.granted) {
          Alert.alert(
            t("playground.photoAccessTitle"),
            t("playground.photoAccessMessage"),
            [
              { text: t("common.cancel"), style: "cancel" },
              {
                text: t("common.openSettings"),
                style: "default",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
          return;
        }
      }
      const base64 = await getCachedImageAsBase64(resultUri);
      await saveBase64ToAlbum(base64, "png");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toast.success(t("playground.imageSaved"), {
        dismissible: true,
        duration: 1_000,
      });
    } catch {
      toast.error(t("playground.imageSaveFailed"), {
        dismissible: true,
        duration: 2_000,
      });
    }
  };

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.open({
        url: resultUri,
        message: "https://fahimanwer.com/tattooai",
      });
    } catch (error) {
      const isUserCancelledShare =
        error instanceof Error && error.message === "User did not share";
      if (!isUserCancelledShare) {
        toast.error(t("playground.shareError"), { dismissible: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button
        variant="secondary"
        onPress={handleShare}
        style={styles.button}
      >
        <Ionicons name="share-outline" size={18} color={foreground} />
        <Button.Label>{t("common.share")}</Button.Label>
      </Button>
      <Button
        variant="primary"
        onPress={handleSave}
        style={styles.button}
      >
        <Ionicons name="download-outline" size={18} color="white" />
        <Button.Label>{t("common.save")}</Button.Label>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
  },
});
