import { Pressable, Text } from "react-native";
import { SessionHistoryListFooterProps } from "./SessionHistoryListFooter.types";

export function SessionHistoryListFooter({
  onPress,
}: SessionHistoryListFooterProps) {
  return (
    <Pressable onPress={onPress}>
      <Text>New</Text>
    </Pressable>
  );
}
