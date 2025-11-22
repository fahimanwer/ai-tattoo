import { Text } from "@/src/app/components/ui/Text";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { View } from "react-native";

interface UsageDisplayProps {
  className?: string; // Optional className for styling
}

export function UsageDisplay({ className }: UsageDisplayProps) {
  const {
    used,
    limit,
    remaining,
    isLimitReached,
    planColor,
    planDisplayName,
    usagePercentage,
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
        Current Usage ({planDisplayName})
      </Text>

      <Text
        type="body"
        weight="bold"
        style={{
          color: isLimitReached ? "#ef4444" : planColor,
          marginBottom: 4,
        }}
      >
        {`${used}/${limit} used (${usagePercentage}%)`}
      </Text>

      <Text
        type="xs"
        style={{
          color: remaining <= 5 ? "#f59e0b" : "#666",
          marginBottom: 2,
        }}
      >
        {`${remaining} remaining`}
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
