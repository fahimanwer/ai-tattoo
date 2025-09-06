import { GetInspiration } from "@/components/home/GetInspiration";
import { Banner } from "@/components/pro/Banner";
import { Button } from "@/components/ui/Button";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export function Home() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View style={styles.section}>
        <Banner />
        <GetInspiration />
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
    marginTop: 24,
    gap: 24,
  },
});
