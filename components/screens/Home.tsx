import { BodyPartsInspiration } from "@/components/home/BodyPartsInspiration";
import { GetInspiration } from "@/components/home/GetInspiration";
import { Banner } from "@/components/pro/Banner";
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
        <BodyPartsInspiration />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 52,
    gap: 24,
  },
});
