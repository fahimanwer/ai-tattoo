import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { presentUpgradePaywall } from "@/lib/paywall-utils";
import { DEFAULT_PLAN_LIMITS, DEFAULT_PLAN_PRICING } from "@/lib/pricing-utils";
import { getAvailableUpgrades } from "@/lib/subscription-utils";
import { Alert, View } from "react-native";

interface UpgradeOptionsProps {
  // Optional props for external control if needed
  onUpgradeSuccess?: () => void;
  showTitle?: boolean;
}

export function UpgradeOptions({
  onUpgradeSuccess,
  showTitle = true,
}: UpgradeOptionsProps) {
  const {
    subscriptionTier,
    refreshSubscriptionStatus,
    isLoading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription();

  const upgradeOptions = getAvailableUpgrades(subscriptionTier);

  const handleUpgradeToTier = async (targetTier: string) => {
    try {
      const success = await presentUpgradePaywall(targetTier as any);
      if (success) {
        // Refresh subscription status to get updated tier
        await refreshSubscriptionStatus();

        // Call optional success callback if provided
        onUpgradeSuccess?.();
      }
    } catch (error) {
      console.error("Error presenting upgrade paywall:", error);
      Alert.alert(
        "Error",
        "Something went wrong. Please try again or contact support if the issue persists.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  // Handle loading and error states
  if (subscriptionLoading) {
    return (
      <View style={{ padding: 16 }}>
        <Text type="body">Loading upgrade options...</Text>
      </View>
    );
  }

  if (subscriptionError) {
    return (
      <View style={{ padding: 16 }}>
        <Text type="body">Unable to load upgrade options</Text>
      </View>
    );
  }

  if (upgradeOptions.length === 0) {
    return null;
  }

  return (
    <View style={{ gap: 12 }}>
      {showTitle && (
        <Text
          type="sm"
          lightColor="#666"
          weight="semibold"
          style={{ marginBottom: 12 }}
        >
          Available Upgrades:
        </Text>
      )}
      {upgradeOptions.map((tier, index) => {
        const tierPricing =
          DEFAULT_PLAN_PRICING[tier] || DEFAULT_PLAN_PRICING.free;
        const tierLimits =
          DEFAULT_PLAN_LIMITS[tier] || DEFAULT_PLAN_LIMITS.free;
        const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

        // Define tier-specific benefits
        const getFeatures = (tierType: string) => {
          switch (tierType) {
            case "starter":
              return [
                `${tierLimits} generations per month`,
                "Basic tattoo styles",
                "Standard support",
              ];
            case "plus":
              return [
                `${tierLimits} generations per month`,
                "Premium tattoo styles",
                "Advanced customization",
                "Priority support",
              ];
            case "pro":
              return [
                `${tierLimits} generations per month`,
                "All premium styles",
                "Advanced AI features",
                "Priority support",
                "Early access to new features",
              ];
            default:
              return [`${tierLimits} generations per month`];
          }
        };

        const features = getFeatures(tier);

        return (
          <View
            key={tier}
            style={{
              marginBottom: index === upgradeOptions.length - 1 ? 0 : 12,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                tier === "pro"
                  ? "#3b82f6"
                  : tier === "plus"
                  ? "#10b981"
                  : "#f59e0b",
            }}
          >
            <Button
              title={`Upgrade to ${tierName} - ${tierPricing.priceString}`}
              onPress={() => handleUpgradeToTier(tier)}
              variant="link"
              color={tier === "pro" ? "blue" : "neutral"}
              style={{ marginBottom: 8 }}
            />
            {features.map((feature, featureIndex) => (
              <Text
                key={featureIndex}
                type="xs"
                lightColor="#666"
                style={{ marginLeft: 4, marginBottom: 2 }}
              >
                • {feature}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
  );
}
