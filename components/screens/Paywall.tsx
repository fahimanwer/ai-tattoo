import { useSubscription } from "@/hooks/useSubscription";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Purchases, {
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases";
import { OfferingCard } from "../paywall/OfferingCard";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { Text } from "../ui/Text";

export function Paywall() {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const { customerInfo, refreshSubscriptionStatus } = useSubscription();

  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();
    setOfferings(offerings);
  };

  const handlePurchase = async (pkg: PurchasesPackage) => {
    try {
      console.log("Attempting to purchase:", pkg.identifier);

      // Make the purchase
      const { customerInfo: updatedCustomerInfo } =
        await Purchases.purchasePackage(pkg);

      console.log("Purchase successful!");
      console.log("Updated customer info:", updatedCustomerInfo);

      // Refresh subscription status
      await refreshSubscriptionStatus();

      // Show success message
      Alert.alert(
        "Success!",
        "Your subscription has been updated. Changes may take effect at the end of your current billing period.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      console.error("Purchase error:", error);

      // Handle user cancellation
      if (error.userCancelled) {
        console.log("User cancelled the purchase");
        return;
      }

      // Show error alert
      Alert.alert(
        "Purchase Failed",
        error.message || "Unable to complete purchase. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  // Helper to check if a package is the current plan
  const isCurrentPlan = (offeringIdentifier: string): boolean => {
    if (!customerInfo) return false;

    // Check if user has this entitlement
    const normalizedIdentifier =
      offeringIdentifier.charAt(0).toUpperCase() + offeringIdentifier.slice(1);

    const isCurrentPlan =
      typeof customerInfo.entitlements.active[normalizedIdentifier] !==
      "undefined";
    if (isCurrentPlan) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Subscription",
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "xmark" }}
              buttonProps={{ onPress: () => router.back() }}
            />
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ marginBottom: 16 }}>
          <Text
            variant="poster"
            type="2xl"
            weight="bold"
            style={{ marginBottom: 8 }}
          >
            Choose Your Plan
          </Text>
          <Text style={{ color: "#666", marginBottom: 16 }}>
            Subscribe or change your subscription anytime. Downgrades take
            effect at the end of your current billing period.
          </Text>
        </View>

        {offerings?.all && (
          <View>
            {Object.entries(offerings.all).map(([key, offering]) => (
              <View key={key} style={{ marginBottom: 16 }}>
                {offering.monthly && (
                  <OfferingCard
                    title={offering.identifier}
                    package={offering.monthly}
                    onPurchase={handlePurchase}
                    isCurrentPlan={isCurrentPlan(offering.identifier)}
                  />
                )}
              </View>
            ))}
          </View>
        )}

        {!offerings && <Text>Loading offerings...</Text>}
      </ScrollView>
    </>
  );
}
