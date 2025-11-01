import { Color } from "@/constants/TWPalette";
import { Button, ContextMenu, Host } from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Image as ExpoImage } from "expo-image";
import { StyleSheet } from "react-native";
import { SessionHistoryItemProps } from "./SessionHistoryItem.types";

export function SessionHistoryItem({
  uri,
  onSave,
  onShare,
  onDelete,
  onSelect,
  isActive,
}: SessionHistoryItemProps) {
  return (
    <Host style={styles.container} matchContents>
      <ContextMenu modifiers={[frame({ width: 50, height: 50 })]}>
        <ContextMenu.Items>
          <Button
            systemImage="square.and.arrow.down"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSave();
            }}
          >
            Save to Library
          </Button>
          <Button
            systemImage="circle"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSelect();
            }}
          >
            Select as Current
          </Button>
          <Button
            systemImage="square.and.arrow.up"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onShare();
            }}
          >
            Share
          </Button>
          <Button
            systemImage="trash"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onDelete();
            }}
            role="destructive"
          >
            Delete
          </Button>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <ExpoImage
            source={{ uri }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 3,
              borderColor: isActive ? Color.yellow[500] : "transparent",
            }}
          />
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
