import { Color } from "@/src/constants/TWPalette";
import { entitlementToTier, getPlanConfig } from "@/src/constants/plan-limits";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Link, router, Stack } from "expo-router";
import { PressableScale } from "pressto";
import { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Purchases, {
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaywallBackground } from "../shaders/PaywallBackground";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

export function Paywall() {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const { customerInfo, refreshSubscriptionStatus } = useSubscription();
  const queryClient = useQueryClient();

  const { top, bottom } = useSafeAreaInsets();
  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();
    setOfferings(offerings);
  };

  const handlePurchase = async (
    pkg: PurchasesPackage,
    offeringIdentifier: string
  ) => {
    try {
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

    console.log("normalizedIdentifier", normalizedIdentifier);
    console.log("isCurrentPlan", isCurrentPlan);
    console.log(
      "customerInfo.entitlements.active",
      customerInfo.entitlements.active
    );

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
          title: "",
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              label: "Back",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: () => router.back(),
            },
          ],
        }}
      />
      <PaywallBackground />
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: top + 16,
        }}
      >
        <View style={[styles.heroContainer]}>
          <Text
            variant="poster"
            type="4xl"
            weight="bold"
            style={styles.heroTitle}
          >
            Create. Ink. Repeat.
          </Text>
          <Text type="base" weight="medium" style={styles.heroSubtitle}>
            Explore styles, refine details, and bring your tattoo vision to
            life.
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {availableOfferings.length > 0 ? (
            <View style={styles.planList}>
              {availableOfferings.map(([key, offering]) => {
                const pkg = offering.monthly!;
                const tier = entitlementToTier(offering.identifier);
                const planConfig = getPlanConfig(tier);
                const isCurrent = isCurrentPlan(offering.identifier);
                const isBestValue = tier === "pro";
                const tierColors = getTierColors(tier);

                const cardContent = (
                  <BlurView
                    intensity={40}
                    tint="dark"
                    style={styles.planCardBlur}
                  >
                    <View style={styles.planHeader}>
                      <View style={styles.planTitleRow}>
                        <Text
                          weight="bold"
                          type="sm"
                          style={[
                            styles.planTitle,
                            { color: tierColors.primary },
                          ]}
                        >
                          {planConfig.displayName}
                        </Text>
                        {isCurrent && (
                          <View
                            style={[
                              styles.planBadge,
                              styles.currentBadge,
                              { backgroundColor: tierColors.badge },
                            ]}
                          >
                            <Text
                              type="sm"
                              weight="bold"
                              style={styles.currentBadgeText}
                            >
                              Current Plan
                            </Text>
                          </View>
                        )}
                      </View>

                      <View style={styles.priceContainer}>
                        <Text
                          type="xl"
                          weight="semibold"
                          style={styles.priceText}
                        >
                          {pkg.product.priceString} / month
                        </Text>
                      </View>
                    </View>

                    <Text weight="bold" style={[{ color: tierColors.primary }]}>
                      {planConfig.monthlyLimit.toLocaleString()} generations /
                      month
                    </Text>
                  </BlurView>
                );

                if (isBestValue) {
                  return (
                    <PressableScale
                      key={key}
                      accessibilityRole="button"
                      accessibilityLabel={`Choose the ${planConfig.displayName} plan`}
                      onPress={() => {
                        if (isCurrent) return;
                        handlePurchase(pkg, offering.identifier);
                      }}
                    >
                      <Animated.View
                        style={[
                          styles.planCard,
                          styles.planCardFeatured,
                          {
                            animationName: {
                              "0%": {
                                boxShadow: `0 0 8px 0 ${Color.orange[600]}`,
                              },
                              "50%": {
                                boxShadow: `0 0 20px 4px ${Color.orange[500]}`,
                              },
                              "100%": {
                                boxShadow: `0 0 8px 0 ${Color.orange[600]}`,
                              },
                            },
                            animationDuration: "2s",
                            animationIterationCount: "infinite",
                            animationTimingFunction: "ease-in-out",
                          } as any,
                        ]}
                      >
                        {cardContent}
                      </Animated.View>
                    </PressableScale>
                  );
                }

                return (
                  <PressableScale
                    key={key}
                    accessibilityRole="button"
                    accessibilityLabel={`Choose the ${planConfig.displayName} plan`}
                    onPress={() => {
                      if (isCurrent) return;
                      handlePurchase(pkg, offering.identifier);
                    }}
                    style={styles.planCard}
                  >
                    {cardContent}
                  </PressableScale>
                );
              })}
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <Text type="base" style={styles.loadingText}>
                Loading plans…
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Button
            title="Restore Subscription"
            onPress={async () => {
              try {
                const restore = await Purchases.restorePurchases();

                if (Object.keys(restore.entitlements.active).length > 0) {
                  Alert.alert(
                    "Success!",
                    "Your purchases have been restored successfully.",
                    [{ text: "OK", onPress: () => router.dismissAll() }]
                  );
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

          <View style={styles.legalLinks}>
            <Link href="/terms-of-service" asChild>
              <Text type="xs" style={styles.legalLinkText}>
                Terms of Service
              </Text>
            </Link>
            <Text type="xs" style={styles.legalSeparator}>
              {` `}•{` `}
            </Text>
            <Link href="/privacy-policy" asChild>
              <Text type="xs" style={styles.legalLinkText}>
                Privacy Policy
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

function getTierColors(tier: string) {
  switch (tier) {
    case "starter":
      return {
        primary: Color.yellow[400],
        badge: Color.yellow[600],
      };
    case "plus":
      return {
        primary: Color.emerald[400],
        badge: Color.emerald[600],
      };
    case "pro":
      return {
        primary: Color.orange[400],
        badge: Color.orange[600],
      };
    default:
      return {
        primary: Color.zinc[400],
        badge: Color.zinc[600],
      };
  }
}

const styles = StyleSheet.create({
  heroContainer: {
    gap: 16,
    marginBottom: 16,
  },
  heroTitle: {
    color: Color.zinc[50],
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    color: Color.zinc[300],
    lineHeight: 24,
  },
  planList: {
    gap: 16,
  },
  planCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  planCardBlur: {
    padding: 16,
  },
  planCardFeatured: {
    borderRadius: 16,
  },
  planHeader: {
    gap: 16,
  },
  planTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  planTitle: {
    flex: 1,
    letterSpacing: 0.5,
  },
  planBadge: {
    borderRadius: 999,
  },
  currentBadge: {},
  currentBadgeText: {
    color: Color.zinc[50],
    letterSpacing: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  priceText: {
    color: Color.zinc[50],
    letterSpacing: -1,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    color: Color.zinc[500],
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 20,
    justifyContent: "flex-end",
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  legalLinkText: {
    color: Color.zinc[500],
    textDecorationLine: "underline",
  },
  legalSeparator: {
    color: Color.zinc[700],
  },
});
