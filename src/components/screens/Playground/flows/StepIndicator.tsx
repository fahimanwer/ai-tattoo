/**
 * StepIndicator -- numbered progress dots for multi-step flows.
 */

import { Text } from "@/src/components/ui/Text";
import { StyleSheet, View } from "react-native";

interface StepIndicatorProps {
  current: number;
  labels: string[];
  isDark: boolean;
}

export function StepIndicator({ current, labels, isDark }: StepIndicatorProps) {
  const active = "#3563E9";
  const inactive = isDark ? "#3f3f46" : "#d4d4d8";
  const textActive = "#ffffff";
  const textInactive = isDark ? "#71717a" : "#a1a1aa";

  return (
    <View style={styles.row}>
      {labels.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= current;
        return (
          <View key={label} style={styles.item}>
            <View
              style={[
                styles.dot,
                { backgroundColor: isActive ? active : inactive },
              ]}
            >
              <Text
                type="xs"
                weight="bold"
                style={{ color: isActive ? textActive : textInactive }}
              >
                {stepNum}
              </Text>
            </View>
            <Text
              type="xs"
              style={{
                color: isActive
                  ? isDark
                    ? "#fff"
                    : "#18181b"
                  : textInactive,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
