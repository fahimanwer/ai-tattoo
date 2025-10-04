import { Text } from "@/components/ui/Text";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { View } from "react-native";

interface UsageDisplayProps {
  className?: string; // Optional className for styling
}

export function UsageDisplay({ className }: UsageDisplayProps) {
  const {
    used,
    limit,
    isLimitReached,
    subscriptionTier,
    isLoading,
    error,
    limitMessage,
  } = useUsageLimit();

  if (isLoading) {
    return <Text type="body">Loading usage data...</Text>;
  }

  if (error) {
    return <Text type="body">Error loading usage data: {error.message}</Text>;
  }

  return (
    <View style={{ marginBottom: 16 }} className={className}>
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
        {`${used}/${limit} used`}
      </Text>
      <Text
        type="xs"
        style={{
          color: isLimitReached ? "#ef4444" : "#666",
        }}
      >
        {limitMessage}
      </Text>
    </View>
  );
}
