import { ExploreContainer } from "@/src/components/explore/Container";
import { ScrollView, StyleSheet } from "react-native";

export function ExploreScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ExploreContainer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 52,
  },
});
