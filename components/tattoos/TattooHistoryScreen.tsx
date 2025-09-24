import { ScrollView } from "react-native";
import { TattooHistory } from "./TattooHistory";

export function TattooHistoryScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <TattooHistory />
    </ScrollView>
  );
}
