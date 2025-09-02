import { ScrollView } from "react-native";
import { Text } from "../ui/Text";

export function TattooResultScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <Text>Tattoo Result</Text>
    </ScrollView>
  );
}
