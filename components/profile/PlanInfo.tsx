import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { DEFAULT_PLAN_LIMITS, DEFAULT_PLAN_PRICING } from "@/lib/pricing-utils";
import { View } from "react-native";
import { UsageDisplay } from "./UsageDisplay";

export function PlanInfo() {
  const {
    subscriptionTier,
    isLoading: subscriptionLoading,
    customerInfo,
    error: subscriptionError,
  } = useSubscription();

  // Calculate plan details based on subscription tier
  const planLimit =
    DEFAULT_PLAN_LIMITS[subscriptionTier] || DEFAULT_PLAN_LIMITS.free;
  const planPrice =
    DEFAULT_PLAN_PRICING[subscriptionTier] || DEFAULT_PLAN_PRICING.free;

  const planText = subscriptionLoading
    ? "LOADING..."
    : subscriptionTier.toUpperCase() + " PLAN";

  // Handle loading and error states
  if (subscriptionLoading) {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF10",
          padding: 20,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text type="body">Loading plan information...</Text>
      </View>
    );
  }

  if (subscriptionError) {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF10",
          padding: 20,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text type="body">Error loading plan information</Text>
      </View>
    );
  }

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
          • {planPrice.priceString}
        </Text>
        <Text type="xs" lightColor="#666">
          • {planLimit} generations per month
        </Text>
        {subscriptionTier === "free" && (
          <Text type="xs" lightColor="#666">
            • No credit card required
          </Text>
        )}
        {subscriptionTier !== "free" && customerInfo && (
          <Text type="xs" lightColor="#666">
            • Premium support included
          </Text>
        )}
      </View>
      <UsageDisplay />
    </View>
  );
}
