import { Button, ContextMenu, Host, HStack } from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { Image as ExpoImage } from "expo-image";
import { Activity, memo } from "react";
import { SessionHistoryItemProps } from "./SessionHistoryItem.types";

// Memoized component to prevent unnecessary re-renders
// Only re-renders when props actually change
const SessionHistoryItemComponent = ({
  uri,
  secondUri,
  imageCount,
  onSave,
  onShare,
  onDelete,
  isActive,
  onPress,
}: SessionHistoryItemProps) => {
  return (
    <Host matchContents>
      <ContextMenu
        modifiers={[
          frame({ width: imageCount === 1 ? 40 : 60, height: 40 }),
          padding({ vertical: 9 }),
        ]}
        activationMethod="longPress"
      >
        <ContextMenu.Items>
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
            <HStack spacing={-20}>
              <ExpoImage
                source={{ uri }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: isActive ? "#3563E9" : "transparent",
                }}
              />
              <Activity mode={secondUri ? "visible" : "hidden"}>
                <ExpoImage
                  source={{ uri: secondUri }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: isActive ? "#3563E9" : "transparent",
                  }}
                />
              </Activity>
            </HStack>
          </Button>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  );
};

// Memoize with custom comparison function
// Only re-render if uri, secondUri, imageCount, or isActive changes
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
