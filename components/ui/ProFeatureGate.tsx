import { useSubscription } from "@/hooks/useSubscription";
import { presentPaywall } from "@/lib/paywall-utils";
import React from "react";
import { Alert, View } from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";

interface ProFeatureGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  featureName?: string;
  onUpgradePress?: () => void;
}

/**
 * Component that gates content behind plus subscription
 * Shows children if user has plus access, otherwise shows upgrade prompt
 */
export function ProFeatureGate({
  children,
  fallback,
  featureName = "feature",
  onUpgradePress,
}: ProFeatureGateProps) {
  const { isPlusUser, isLoading, refreshSubscriptionStatus } =
    useSubscription();

  const handleUpgrade = async () => {
    if (onUpgradePress) {
      onUpgradePress();
    } else {
      try {
        const success = await presentPaywall();

        if (success) {
          // Refresh subscription status after successful purchase/restore
          await refreshSubscriptionStatus();

          Alert.alert(
            "Welcome to Plus! 🎉",
            `You now have access to ${featureName} and all other Plus features!`,
            [{ text: "Awesome!", style: "default" }]
          );
        }
      } catch (error) {
        console.error("Error presenting paywall:", error);
        Alert.alert(
          "Error",
          "Something went wrong. Please try again or contact support if the issue persists.",
          [{ text: "OK", style: "default" }]
        );
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Using the exact pattern from your example
  if (isPlusUser) {
    // Grant user "plus" access
    return <>{children}</>;
  }

  // Show fallback or default upgrade prompt
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "rgba(59, 130, 246, 0.08)",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(59, 130, 246, 0.2)",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text type="subtitle" weight="bold" style={{ textAlign: "center" }}>
        🔒 Plus Feature
      </Text>
      <Text type="default" style={{ textAlign: "center", opacity: 0.8 }}>
        This {featureName} is available for Plus subscribers.
      </Text>
      <Button
        variant="solid"
        color="blue"
        title="Upgrade to Plus"
        symbol="crown.fill"
        onPress={handleUpgrade}
        haptic={true}
        hapticStyle="light"
        size="sm"
      />
    </View>
  );
}

/**
 * Example usage:
 *
 * <ProFeatureGate featureName="unlimited generations">
 *   <AdvancedTattooGenerator />
 * </ProFeatureGate>
 *
 * // With custom fallback
 * <ProFeatureGate
 *   featureName="premium styles"
 *   fallback={<Text>Premium styles coming soon!</Text>}
 * >
 *   <PremiumStyleSelector />
 * </ProFeatureGate>
 */
