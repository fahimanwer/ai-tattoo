import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Link } from "expo-router";
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
        <Link href="/home/new" asChild>
          <Button
            symbol="plus"
            variant="solid"
            haptic
            color="black"
            title="Generate"
            onPress={() => {}}
          />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
});
