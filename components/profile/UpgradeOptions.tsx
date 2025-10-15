import { useSubscription } from "@/hooks/useSubscription";
import { View } from "react-native";

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

  return <View style={{ gap: 12 }}></View>;
}
