import { Color } from "@/src/constants/TWPalette";
import { entitlementToTier, getPlanConfig } from "@/src/constants/plan-limits";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
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
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, ${Color.grayscale[50]} 50%)`,
          }}
        />
        <Image
          source={{
            uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/paywall-2-bw-2.png",
          }}
          contentFit="cover"
          contentPosition="bottom right"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {/* <PaywallBackground /> */}
      </View>
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: top * 4,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <View style={[styles.heroContainer]}>
          <Text type="4xl" weight="bold" style={styles.heroTitle}>
            Create. Ink. Repeat.
          </Text>
          <Text type="lg" weight="medium" style={styles.heroSubtitle}>
            Explore styles, refine details, and bring your tattoo vision to
            life.
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
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

                const cardContent = (
                  <GlassView
                    glassEffectStyle="clear"
                    style={[
                      styles.planCardBlur,
                      isBestValue && styles.isPlanCardFeatured,
                    ]}
                  >
                    <View style={styles.planHeader}>
                      <View style={styles.planTitleRow}>
                        <Text
                          weight="semibold"
                          type="sm"
                          style={styles.planTitle}
                        >
                          {planConfig.displayName}
                        </Text>
                        {isCurrent && (
                          <View style={styles.planBadge}>
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
                        <Text type="xl" weight="bold" style={styles.priceText}>
                          {pkg.product.priceString} / Monthly
                        </Text>
                      </View>
                    </View>

                    <Text
                      weight="medium"
                      type="sm"
                      style={styles.planLimitText}
                    >
                      Unlock up to {planConfig.monthlyLimit.toLocaleString()}{" "}
                      stunning tattoo generations each month
                    </Text>
                  </GlassView>
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
                          styles.isPlanCardFeatured,
                          /*  {
                            animationName: {
                              "0%": {
                                boxShadow: `0 0 12px 0 ${Color.orange[600]}`,
                              },
                              "50%": {
                                boxShadow: `0 0 20px 12px ${Color.orange[500]}`,
                              },
                              "100%": {
                                boxShadow: `0 0 8px 0 ${Color.orange[600]}`,
                              },
                            },
                            animationDuration: "2s",
                            animationIterationCount: "infinite",
                            animationTimingFunction: "ease-in-out",
                          } as any, */
                        ]}
                      >
                        <View style={styles.badgeMostPopular}>
                          <Text
                            type="sm"
                            weight="bold"
                            style={styles.badgeMostPopularText}
                          >
                            Most Popular
                          </Text>
                        </View>
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
            color="yellow"
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

const styles = StyleSheet.create({
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  heroTitle: {
    color: Color.zinc[50],
    letterSpacing: -1,
    textAlign: "center",
  },
  heroSubtitle: {
    color: Color.zinc[50] + "80",
    textAlign: "center",
    lineHeight: 20,
  },
  planList: {
    gap: 16,
  },
  planCard: {
    borderRadius: 18,
    overflow: "hidden",
  },
  planCardBlur: {
    padding: 16,
    experimental_backgroundImage: `linear-gradient(to bottom, transparent, ${Color.grayscale[50]})`,
  },
  isPlanCardFeatured: {
    experimental_backgroundImage: `linear-gradient(to top, transparent, ${
      Color.yellow[400] + "30"
    })`,
    boxShadow: `0 0 0 3px ${Color.yellow[400]}`,
  },
  badgeMostPopular: {
    position: "absolute",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    top: 8,
    right: 8,
    zIndex: 3,
    experimental_backgroundImage: `linear-gradient(-10deg, ${Color.yellow[400]}, ${Color.yellow[100]}, ${Color.yellow[400]})`,
  },
  badgeMostPopularText: {
    color: Color.grayscale[50],
    letterSpacing: -1,
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
    color: Color.grayscale[950],
    letterSpacing: -1,
  },
  planLimitText: {
    color: Color.grayscale[950] + "80",
    letterSpacing: -1,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    color: Color.grayscale[500],
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  legalLinkText: {
    color: Color.grayscale[500],
    textDecorationLine: "underline",
  },
  legalSeparator: {
    color: Color.grayscale[700],
  },
});
