import { Text } from "@/components/ui/Text";
import { View } from "react-native";

interface PlanInfoProps {
  subscriptionTier: string;
  subscriptionLoading: boolean;
  planPrice: string;
  planLimit: number;
}

export function PlanInfo({
  subscriptionTier,
  subscriptionLoading,
  planPrice,
  planLimit,
}: PlanInfoProps) {
  const planText = subscriptionLoading
    ? "LOADING..."
    : subscriptionTier.toUpperCase() + " PLAN";

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF10",
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Text type="xl" weight="bold" style={{ marginBottom: 16 }}>
        {planText}
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text type="sm" lightColor="#666" style={{ marginBottom: 4 }}>
          Current Plan:
        </Text>
        <Text
          type="body"
          weight="bold"
          style={{
            color:
              subscriptionTier === "plus"
                ? "#10b981"
                : subscriptionTier === "pro"
                ? "#3b82f6"
                : subscriptionTier === "starter"
                ? "#f59e0b"
                : "#6b7280",
          }}
        >
          {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}
        </Text>
      </View>

      {/* Plan Details */}
      <View style={{ marginBottom: 16 }}>
        <Text type="xs" lightColor="#666" style={{ marginBottom: 4 }}>
          Plan Details:
        </Text>
        <Text type="xs" lightColor="#666">
          • {planPrice}
        </Text>
        <Text type="xs" lightColor="#666">
          • {planLimit} generations per{" "}
          {subscriptionTier === "free" ? "month" : "month"}
        </Text>
        {subscriptionTier === "free" && (
          <Text type="xs" lightColor="#666">
            • No credit card required
          </Text>
        )}
      </View>
    </View>
  );
}
