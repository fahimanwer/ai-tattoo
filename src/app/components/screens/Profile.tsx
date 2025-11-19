import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { Button } from "../ui/Button";

export function Profile() {
  const router = useRouter();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
    >
      <Button title="Paywall" onPress={() => router.push("/(paywall)")} />
    </ScrollView>
  );
}
