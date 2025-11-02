import { Color } from "@/constants/TWPalette";
import { entitlementToTier, getPlanConfig } from "@/constants/plan-limits";
import { useSubscription } from "@/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { Link, router, Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Purchases, {
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases";
import { Button } from "../ui/Button";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { Text } from "../ui/Text";

export function Paywall() {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { customerInfo, refreshSubscriptionStatus } = useSubscription();
  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();
    setOfferings(offerings);
  };

  const handlePurchase = async (
    pkg: PurchasesPackage,
    offeringIdentifier: string
  ) => {
    try {
      setSelectedPlan(offeringIdentifier);
      console.log("Attempting to purchase:", pkg.identifier);

      // Make the purchase
      const { customerInfo: updatedCustomerInfo } =
        await Purchases.purchasePackage(pkg);

      console.log("Purchase successful!");
      console.log("Updated customer info:", updatedCustomerInfo);

      // Refresh subscription status
      await refreshSubscriptionStatus();

      // Invalidate usage query to refresh usage data on profile screen
      await queryClient.invalidateQueries({
        queryKey: ["user", "usage"],
      });

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
    } finally {
      setSelectedPlan(null);
      fetchProducts();
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

  const availableOfferings = useMemo(() => {
    if (!offerings?.all) return [];

    return Object.entries(offerings.all)
      .filter(([, offering]) => offering?.monthly)
      .sort(([, a], [, b]) => {
        const aTier = entitlementToTier(a.identifier);
        const bTier = entitlementToTier(b.identifier);
        const tierRank = { free: 0, starter: 1, plus: 2, pro: 3 } as const;
        return tierRank[aTier] - tierRank[bTier];
      });
  }, [offerings]);

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
        style={styles.scroll}
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.heroContainer}>
          <View style={styles.heroBadge}>
            <Text type="xs" weight="semibold" style={styles.heroBadgeText}>
              Premium Access
            </Text>
          </View>
          <Text
            variant="poster"
            type="2xl"
            weight="bold"
            style={styles.heroTitle}
          >
            Unlock Limitless Tattoo Inspiration
          </Text>
          <Text type="sm" style={styles.heroSubtitle}>
            Choose the plan that matches your creative flow and get priority
            access to the freshest designs, higher fidelity renders, and faster
            turnarounds.
          </Text>
        </View>
        {availableOfferings.length > 0 ? (
          <View style={styles.planList}>
            {availableOfferings.map(([key, offering]) => {
              const pkg = offering.monthly!;
              const tier = entitlementToTier(offering.identifier);
              const planConfig = getPlanConfig(tier);
              const isCurrent = isCurrentPlan(offering.identifier);
              const isBestValue = tier === "plus";
              const isSelected = selectedPlan === offering.identifier;

              return (
                <Pressable
                  key={key}
                  accessibilityRole="button"
                  accessibilityLabel={`Choose the ${planConfig.displayName} plan`}
                  disabled={isCurrent}
                  onPress={() => handlePurchase(pkg, offering.identifier)}
                  style={({ pressed }) => [
                    styles.planCard,
                    isBestValue && styles.planCardFeatured,
                    isCurrent && styles.planCardCurrent,
                    (pressed || isSelected) && styles.planCardPressed,
                  ]}
                >
                  <View style={styles.planHeader}>
                    <View style={styles.planTitleRow}>
                      <Text type="xl" weight="bold" style={styles.planTitle}>
                        {planConfig.displayName}
                      </Text>
                      <View style={styles.planBadges}>
                        {isBestValue && (
                          <View
                            style={[styles.planBadge, styles.featuredBadge]}
                          >
                            <Text
                              type="xs"
                              weight="semibold"
                              style={styles.featuredBadgeText}
                            >
                              Best Value
                            </Text>
                          </View>
                        )}
                        {isCurrent && (
                          <View style={[styles.planBadge, styles.currentBadge]}>
                            <Text
                              type="xs"
                              weight="semibold"
                              style={styles.currentBadgeText}
                            >
                              Current Plan
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <Text type="lg" weight="semibold" style={styles.priceText}>
                      {pkg.product.priceString}
                      <Text type="xs" style={styles.priceSuffix}>
                        {" "}
                        / month
                      </Text>
                    </Text>
                  </View>

                  <Text type="base" style={styles.planLimit}>
                    <Text type="xl" weight="semibold">
                      {planConfig.monthlyLimit.toLocaleString()}
                    </Text>{" "}
                    tattoo generations each month
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Text type="sm" style={styles.loadingText}>
            Loading plans…
          </Text>
        )}
        <Button
          title="Restore Subscription"
          onPress={async () => {
            try {
              const restore = await Purchases.restorePurchases();

              // Check if any entitlements were restored
              if (Object.keys(restore.entitlements.active).length > 0) {
                Alert.alert(
                  "Success!",
                  "Your purchases have been restored successfully.",
                  [{ text: "OK", onPress: () => router.dismissAll() }]
                );
                // Invalidate usage query to refresh usage data on profile screen
                await queryClient.invalidateQueries({
                  queryKey: ["user", "usage"],
                });
                fetchProducts();
              } else {
                Alert.alert(
                  "No Purchases Found",
                  "No previous purchases were found to restore.",
                  [{ text: "OK" }]
                );
              }
            } catch (e) {
              console.error("Error restoring purchases:", e);
              Alert.alert(
                "Error Restoring Purchases",
                "Unable to restore purchases. Please try again.",
                [{ text: "OK" }]
              );
            }
          }}
          variant="link"
          color="blue"
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/terms-of-service" asChild>
            <Text type="xs" style={{ color: Color.blue[500] }}>
              Terms of Service
            </Text>
          </Link>
          <Text type="xs" style={{ color: Color.gray[500] }}>
            {` `}and{` `}
          </Text>
          <Link href="/privacy-policy" asChild>
            <Text type="xs" style={{ color: Color.blue[500] }}>
              Privacy Policy
            </Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 32,
  },
  heroContainer: {
    borderRadius: 24,
    gap: 16,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: Color.blue[800],
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroBadgeText: {
    color: Color.blue[200],
    letterSpacing: 0.4,
  },
  heroTitle: {
    color: Color.zinc[50],
  },
  heroSubtitle: {
    color: Color.zinc[300],
    lineHeight: 20,
  },
  heroBenefits: {
    gap: 8,
  },
  heroBenefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Color.blue[400],
  },
  heroBenefitText: {
    color: Color.zinc[200],
  },
  planList: {
    gap: 20,
  },
  planCard: {
    backgroundColor: Color.zinc[900],
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.zinc[800],
    padding: 20,
    gap: 16,
  },
  planCardFeatured: {},
  planCardCurrent: {
    borderColor: Color.green[500],
  },
  planCardPressed: {
    borderColor: Color.blue[400],
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  planTitleRow: {
    flex: 1,
    gap: 8,
  },
  planTitle: {
    color: Color.zinc[50],
  },
  planBadges: {
    flexDirection: "row",
    gap: 8,
  },
  planBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  featuredBadge: {
    backgroundColor: Color.blue[600],
    borderColor: Color.blue[500],
  },
  featuredBadgeText: {
    color: Color.zinc[50],
  },
  currentBadge: {
    backgroundColor: Color.green[600],
    borderColor: Color.green[500],
  },
  currentBadgeText: {
    color: Color.zinc[50],
  },
  priceText: {
    color: Color.zinc[50],
  },
  priceSuffix: {
    color: Color.zinc[400],
  },
  planLimit: {
    color: Color.zinc[200],
  },
  planFeatures: {
    gap: 10,
  },
  planFeatureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.blue[500],
  },
  planFeatureText: {
    color: Color.zinc[200],
  },
  ctaRow: {
    gap: 4,
  },
  ctaText: {
    color: Color.zinc[50],
  },
  ctaHint: {
    color: Color.zinc[500],
  },
  loadingText: {
    color: Color.zinc[300],
  },
});
