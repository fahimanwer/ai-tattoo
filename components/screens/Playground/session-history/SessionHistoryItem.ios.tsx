import { Color } from "@/constants/TWPalette";
import { Button, ContextMenu, Host } from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Image as ExpoImage } from "expo-image";
import { SessionHistoryItemProps } from "./SessionHistoryItem.types";

export function SessionHistoryItem({
  uri,
  onSave,
  onShare,
  onDelete,
  onSelect,
  isActive,
  onPress,
}: SessionHistoryItemProps) {
  return (
    <Host matchContents>
      <ContextMenu
        modifiers={[frame({ width: 50, height: 50 }), padding({ all: 9 })]}
        activationMethod="longPress"
      >
        <ContextMenu.Items>
          <Button
            systemImage="eye"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSelect();
            }}
          >
            Preview
          </Button>
          <Button
            systemImage="square.and.arrow.down"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSave();
            }}
          >
            Save to Gallery
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
          <Button onPress={onPress}>
            <ExpoImage
              source={{ uri }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 3,
                borderColor: isActive ? Color.yellow[300] : "transparent",
              }}
            />
          </Button>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
}
