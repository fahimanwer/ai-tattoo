import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  PressableFeedback,
  Separator,
  useThemeColor,
} from "heroui-native";
import { SessionHistoryItemProps } from "./SessionHistoryItem.types";

const SessionHistoryItemComponent = ({
  uri,
  secondUri,
  onSave,
  onShare,
  onDelete,
  isActive,
  onPress,
}: SessionHistoryItemProps) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const foreground = useThemeColor("foreground") as string;

  return (
    <>
      <PressableFeedback
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setMenuOpen(true);
        }}
      >
        <PressableFeedback.Highlight />
        <View style={styles.thumbnailRow}>
          <Image
            source={{ uri }}
            style={[
              styles.thumbnail,
              { borderColor: isActive ? "#3563E9" : "transparent" },
            ]}
          />
          {secondUri && (
            <Image
              source={{ uri: secondUri }}
              style={[
                styles.thumbnail,
                styles.secondThumbnail,
                { borderColor: isActive ? "#3563E9" : "transparent" },
              ]}
            />
          )}
        </View>
      </PressableFeedback>

      <Dialog isOpen={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="gap-3 p-4">
            <Dialog.Title>{t("playground.actions")}</Dialog.Title>
            <Button
              variant="secondary"
              onPress={() => {
                onSave();
                setMenuOpen(false);
              }}
              style={styles.actionBtn}
            >
              <Ionicons name="download-outline" size={18} color={foreground} />
              <Button.Label>{t("playground.saveToGallery")}</Button.Label>
            </Button>
            <Button
              variant="secondary"
              onPress={() => {
                onShare();
                setMenuOpen(false);
              }}
              style={styles.actionBtn}
            >
              <Ionicons name="share-outline" size={18} color={foreground} />
              <Button.Label>{t("common.share")}</Button.Label>
            </Button>
            <Separator />
            <Button
              variant="danger-soft"
              onPress={() => {
                onDelete();
                setMenuOpen(false);
              }}
              style={styles.actionBtn}
            >
              <Ionicons name="trash-outline" size={18} />
              <Button.Label>{t("common.delete")}</Button.Label>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};

export const SessionHistoryItem = memo(
  SessionHistoryItemComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.uri === nextProps.uri &&
      prevProps.secondUri === nextProps.secondUri &&
      prevProps.imageCount === nextProps.imageCount &&
      prevProps.isActive === nextProps.isActive
    );
  }
);

const styles = StyleSheet.create({
  thumbnailRow: {
    flexDirection: "row",
    paddingVertical: 9,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  },
  secondThumbnail: {
    marginLeft: -20,
  },
  actionBtn: {
    width: "100%",
  },
});
