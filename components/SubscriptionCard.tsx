import { useSubscription } from "@/hooks/useSubscription";
import { View } from "react-native";
import { Text } from "./ui/Text";

export function SubscriptionCard() {
  const { isPlusUser, customerInfo, isLoading, error } = useSubscription();

  if (isLoading) {
    return (
      <View>
        <Text>Loading subscription status...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error loading subscription: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Subscription Status</Text>
      <Text
        style={{ fontWeight: "bold", color: isPlusUser ? "green" : "orange" }}
      >
        {isPlusUser ? "✅ PLUS USER" : "🔒 FREE USER"}
      </Text>

      <Text>
        Active Entitlements:{" "}
        {Object.keys(customerInfo?.entitlements.active || {}).join(", ") ||
          "None"}
      </Text>

      <Text>
        Active Subscriptions:{" "}
        {customerInfo?.activeSubscriptions.join(", ") || "None"}
      </Text>
      <Text>
        All Purchases:{" "}
        {customerInfo?.allPurchasedProductIdentifiers.join(", ") || "None"}
      </Text>
      <Text>
        Latest Expiration: {customerInfo?.latestExpirationDate || "N/A"}
      </Text>
      <Text>First Seen: {customerInfo?.firstSeen || "N/A"}</Text>
      <Text>User ID: {customerInfo?.originalAppUserId || "N/A"}</Text>
      <Text>Request Date: {customerInfo?.requestDate || "N/A"}</Text>
      <Text>
        Original App Version:{" "}
        {customerInfo?.originalApplicationVersion || "N/A"}
      </Text>
      <Text>
        Original Purchase Date: {customerInfo?.originalPurchaseDate || "N/A"}
      </Text>
      <Text>Management URL: {customerInfo?.managementURL || "N/A"}</Text>
      <Text>
        Non-Subscription Transactions:{" "}
        {customerInfo?.nonSubscriptionTransactions.length || 0}
      </Text>
      <Text>
        Active Product Subscriptions:{" "}
        {Object.keys(customerInfo?.subscriptionsByProductIdentifier || {}).join(
          ", "
        ) || "None"}
      </Text>
    </View>
  );
}
