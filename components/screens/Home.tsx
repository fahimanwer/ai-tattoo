import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { ScrollView, StyleSheet, View } from "react-native";

export function Home() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View style={styles.section}>
        <Text type="subtitle" weight="bold">
          Generate a tattoo
        </Text>
        <Button
          symbol="plus"
          variant="solid"
          haptic
          color="black"
          title="Generate"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
});
