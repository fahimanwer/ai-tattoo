import { Button } from "@/components/ui/Button";
import { manageSubscription, presentPaywall } from "@/lib/paywall-utils";
import { Alert, View } from "react-native";

interface SubscriptionActionsProps {
  subscriptionTier: string;
  onSubscriptionChange: () => void;
}

export function SubscriptionActions({
  subscriptionTier,
  onSubscriptionChange,
}: SubscriptionActionsProps) {
  const handleUpgradeToPlus = async () => {
    try {
      const success = await presentPaywall();
      if (success) {
        await onSubscriptionChange();
        Alert.alert(
          "Welcome to Plus! 🎉",
          "You now have access to all Plus features including unlimited generations and priority support.",
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
  };

  const handleManageSubscription = async () => {
    await manageSubscription();
  };

  return (
    <View>
      {subscriptionTier !== "free" ? (
        <Button
          title="Manage Subscription"
          onPress={handleManageSubscription}
          variant="solid"
          color="blue"
          style={{ marginBottom: 8 }}
        />
      ) : (
        <Button
          title="Upgrade to Starter"
          onPress={handleUpgradeToPlus}
          variant="solid"
          color="blue"
          style={{ marginBottom: 8 }}
        />
      )}
    </View>
  );
}
