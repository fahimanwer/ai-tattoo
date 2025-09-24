import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { presentUpgradePaywall } from "@/lib/paywall-utils";
import { getAvailableUpgrades } from "@/lib/subscription-utils";
import { Alert, View } from "react-native";

interface UpgradeOptionsProps {
  subscriptionTier: string;
  onSubscriptionChange: () => void;
}

export function UpgradeOptions({
  subscriptionTier,
  onSubscriptionChange,
}: UpgradeOptionsProps) {
  const upgradeOptions = getAvailableUpgrades(subscriptionTier);

  const handleUpgradeToTier = async (targetTier: string) => {
    try {
      const success = await presentUpgradePaywall(targetTier as any);
      if (success) {
        await onSubscriptionChange();
        Alert.alert(
          `Welcome to ${targetTier.toUpperCase()}! 🎉`,
          `You now have access to all ${targetTier} features.`,
          [{ text: "Awesome!", style: "default" }]
        );
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

  if (upgradeOptions.length === 0) {
    return null;
  }

  return (
    <View>
      <Text
        type="xs"
        lightColor="#666"
        weight="semibold"
        style={{ marginBottom: 8 }}
      >
        Upgrade Options:
      </Text>
      {upgradeOptions.map((tier) => (
        <Button
          key={tier}
          title={`Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
          onPress={() => handleUpgradeToTier(tier)}
          variant="outline"
          color="neutral"
          style={{ marginBottom: 4 }}
        />
      ))}
    </View>
  );
}
