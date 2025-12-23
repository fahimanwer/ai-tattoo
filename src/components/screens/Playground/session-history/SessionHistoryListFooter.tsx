import { Pressable, Text } from "react-native";
import { SessionHistoryListFooterProps } from "./SessionHistoryListFooter.types";

export function SessionHistoryListFooter({
  isVisible,
  onPress,
}: SessionHistoryListFooterProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Pressable onPress={onPress}>
      <Text>New</Text>
    </Pressable>
  );
}
