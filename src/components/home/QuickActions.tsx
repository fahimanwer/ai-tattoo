/**
 * QuickActions -- horizontal scroll of image-based flow cards on the Home screen.
 * Each card navigates to the corresponding playground flow.
 */

import { FLOW_DEFINITIONS } from "@/src/constants/flow-definitions";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { customEvent } from "vexo-analytics";
import { FlowCard } from "./FlowCard";

export function QuickActions() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {FLOW_DEFINITIONS.map((flow) => (
        <FlowCard
          key={flow.type}
          flow={flow}
          variant="scroll"
          onPress={() => {
            customEvent("quick_action_pressed", { action: flow.type });
            router.push(flow.route as any);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
});
