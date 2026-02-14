import { BLURHASH } from "@/lib/image-cache";
import { saveBase64ToAlbum } from "@/lib/save-to-library";
import Share from "@/patches/rn-share-re-export";
import { Color } from "@/src/constants/TWPalette";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { File } from "expo-file-system";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import { PressableScale } from "pressto";
import { BottomSheet, Button, PressableFeedback, useThemeColor } from "heroui-native";

export interface ResultImageProps {
  uri: string;
  onPress: () => void;
  isSingleImage: boolean;
  onRemove?: () => void;
}

export function ResultImage({
  uri,
  onPress,
  isSingleImage,
  onRemove,
}: ResultImageProps) {
  const { t } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const foreground = useThemeColor("foreground") as string;

  const handleCopy = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const file = new File(uri);
      const base64 = await file.base64();
      await Clipboard.setImageAsync(base64);
      toast.success(t("playground.imageCopied"), { dismissible: true });
    } catch (error) {
      console.error("Error copying image:", error);
      toast.error(t("playground.imageCopyFailed"), { dismissible: true });
    }
    setSheetOpen(false);
  };

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.open({ url: uri, message: "Check out my tattoo design!" });
    } catch (error) {
      console.error("Error sharing image:", error);
      if ((error as any)?.message !== "User did not share") {
        toast.error(t("playground.imageSaveFailed"), { dismissible: true });
      }
    }
    setSheetOpen(false);
  };

  const handleSave = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const permission = await MediaLibrary.getPermissionsAsync();
      if (!permission.granted) {
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        if (!requestResult.granted) {
          Alert.alert(
            t("permissions.photoAccessDeniedTitle"),
            t("permissions.photoAccessDeniedDescription"),
            [
              { text: t("common.cancel"), style: "cancel" },
              {
                text: t("common.openSettings"),
                style: "default",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
          setSheetOpen(false);
          return;
        }
      }
      const file = new File(uri);
      const base64 = await file.base64();
      await saveBase64ToAlbum(base64, "png");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toast.success(t("playground.imageSaved"), {
        dismissible: true,
        duration: 1_000,
      });
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error(t("playground.imageSaveFailed"), {
        dismissible: true,
        duration: 2_000,
      });
    }
    setSheetOpen(false);
  };

  return (
    <View style={styles.container}>
      <PressableScale
        onPress={onPress}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setSheetOpen(true);
        }}
        animationType="timing"
      >
        <Image
          source={{ uri }}
          placeholder={{ blurhash: BLURHASH }}
          cachePolicy="memory-disk"
          style={{
            width: "100%",
            height: isSingleImage ? 400 : 200,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Color.gray[500] + "30",
          }}
          contentFit="cover"
          contentPosition="center"
          transition={350}
        />
      </PressableScale>

      {onRemove && (
        <PressableFeedback onPress={onRemove} style={styles.removeBtn}>
          <PressableFeedback.Highlight />
          <Ionicons name="trash-outline" size={14} color="white" />
        </PressableFeedback>
      )}

      <BottomSheet isOpen={sheetOpen} onOpenChange={setSheetOpen}>
        <BottomSheet.Portal>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <BottomSheet.Title>{t("playground.imageActions")}</BottomSheet.Title>
            <View style={styles.sheetActions}>
              <Button variant="secondary" onPress={handleCopy} style={styles.actionBtn}>
                <Ionicons name="copy-outline" size={18} color={foreground} />
                <Button.Label>{t("playground.copyToClipboard")}</Button.Label>
              </Button>
              <Button variant="secondary" onPress={handleShare} style={styles.actionBtn}>
                <Ionicons name="share-outline" size={18} color={foreground} />
                <Button.Label>{t("common.share")}</Button.Label>
              </Button>
              <Button variant="secondary" onPress={handleSave} style={styles.actionBtn}>
                <Ionicons name="download-outline" size={18} color={foreground} />
                <Button.Label>{t("playground.saveToGallery")}</Button.Label>
              </Button>
            </View>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  removeBtn: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  sheetActions: {
    gap: 8,
    padding: 16,
  },
  actionBtn: {
    width: "100%",
  },
});
