import { Button, ContextMenu, Host } from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Image as ExpoImage } from "expo-image";
import { memo } from "react";
import { View } from "react-native";
import { SessionHistoryItemProps } from "./SessionHistoryItem.types";

// Memoized component to prevent unnecessary re-renders
// Only re-renders when props actually change
const SessionHistoryItemComponent = ({
  uri,
  onSave,
  onShare,
  onDelete,
  onSelect,
  isActive,
  onPress,
}: SessionHistoryItemProps) => {
  return (
    <Host matchContents>
      <ContextMenu
        modifiers={[frame({ width: 50, height: 50 }), padding({ vertical: 9 })]}
        activationMethod="longPress"
      >
        <ContextMenu.Items>
          <Button
            systemImage="eye"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSelect();
            }}
            label="Preview"
          />
          <Button
            systemImage="square.and.arrow.down"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSave();
            }}
            label="Save to Gallery"
          />
          <Button
            systemImage="square.and.arrow.up"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onShare();
            }}
            label="Share"
          />
          <Button
            systemImage="trash"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onDelete();
            }}
            role="destructive"
            label="Delete"
          />
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <Button onPress={onPress}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 99,
                overflow: "hidden",
                boxShadow: isActive ? `0 0 0 3px yellow` : "none",
              }}
            >
              <ExpoImage
                source={{ uri }}
                cachePolicy="memory-disk"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          </Button>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
};

// Memoize with custom comparison function
// Only re-render if uri or isActive changes
export const SessionHistoryItem = memo(
  SessionHistoryItemComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.uri === nextProps.uri &&
      prevProps.isActive === nextProps.isActive
    );
  }
);
