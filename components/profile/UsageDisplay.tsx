import { Text } from "@/components/ui/Text";
import { View } from "react-native";

interface UsageDisplayProps {
  subscriptionTier: string;
  currentUsed: number;
  currentLimit: number;
  currentRemaining: number;
  isLimitReached: boolean;
}

export function UsageDisplay({
  subscriptionTier,
  currentUsed,
  currentLimit,
  currentRemaining,
  isLimitReached,
}: UsageDisplayProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text type="sm" lightColor="#666" style={{ marginBottom: 4 }}>
        Current Usage
      </Text>
      <Text
        type="body"
        weight="bold"
        style={{
          color: isLimitReached
            ? "#ef4444"
            : subscriptionTier === "plus"
            ? "#10b981"
            : subscriptionTier === "pro"
            ? "#3b82f6"
            : subscriptionTier === "starter"
            ? "#f59e0b"
            : "#6b7280",
          marginBottom: 4,
        }}
      >
        {`${currentUsed}/${currentLimit} used`}
      </Text>
      <Text
        type="xs"
        style={{
          color: isLimitReached ? "#ef4444" : "#666",
        }}
      >
        {isLimitReached
          ? subscriptionTier === "free"
            ? "Monthly limit reached. Upgrade to get more generations."
            : "Monthly limit reached. Your plan resets next month."
          : `${currentRemaining} generations remaining this period`}
      </Text>
    </View>
  );
}
