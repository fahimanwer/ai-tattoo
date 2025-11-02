import { Color } from "@/constants/TWPalette";
import { entitlementToTier, getPlanConfig } from "@/constants/plan-limits";
import { useSubscription } from "@/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Purchases, {
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import { HeaderButton } from "../ui/HeaderButtons/HeaderButton";
import { Text } from "../ui/Text";

export function Paywall() {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { customerInfo, refreshSubscriptionStatus } = useSubscription();
  const queryClient = useQueryClient();

  const { top } = useSafeAreaInsets();

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
          title: "",
          headerLeft: () => (
            <HeaderButton
              imageProps={{ systemName: "xmark" }}
              buttonProps={{ onPress: () => router.back() }}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Image
        source={require("@/assets/images/AITattooHome.png")}
        style={styles.heroBackground}
        contentFit="cover"
      />
      <View
        style={{
          padding: 16,
          paddingTop: top + 16,
        }}
      >
        <View style={styles.heroContainer}>
          <View style={styles.heroBadge}>
            <LinearGradient
              colors={[Color.violet[600], Color.fuchsia[600]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroBadgeGradient}
            >
              <Text type="xs" weight="bold" style={styles.heroBadgeText}>
                ✨ PREMIUM ACCESS
              </Text>
            </LinearGradient>
          </View>
          <Text
            variant="poster"
            type="4xl"
            weight="bold"
            style={styles.heroTitle}
          >
            Unlock Your{"\n"}Creative Vision
          </Text>
          <Text type="base" weight="medium" style={styles.heroSubtitle}>
            Transform ideas into stunning tattoo designs with unlimited
            possibilities
          </Text>
        </View>

        <View style={styles.plansSection}>
          <Text type="sm" weight="semibold" style={styles.plansSectionTitle}>
            CHOOSE YOUR PLAN
          </Text>

          {availableOfferings.length > 0 ? (
            <View style={styles.planList}>
              {availableOfferings.map(([key, offering]) => {
                const pkg = offering.monthly!;
                const tier = entitlementToTier(offering.identifier);
                const planConfig = getPlanConfig(tier);
                const isCurrent = isCurrentPlan(offering.identifier);
                const isBestValue = tier === "plus";
                const isSelected = selectedPlan === offering.identifier;
                const tierColors = getTierColors(tier);

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
                    {isBestValue && (
                      <View style={styles.ribbonContainer}>
                        <LinearGradient
                          colors={[Color.emerald[500], Color.teal[500]]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.ribbon}
                        >
                          <Text
                            type="xs"
                            weight="bold"
                            style={styles.ribbonText}
                          >
                            BEST VALUE
                          </Text>
                        </LinearGradient>
                      </View>
                    )}

                    <LinearGradient
                      colors={
                        isBestValue
                          ? [Color.zinc[900], Color.zinc[950]]
                          : [Color.zinc[900], Color.zinc[900]]
                      }
                      style={styles.planCardGradient}
                    >
                      <View style={styles.planHeader}>
                        <View style={styles.planTitleRow}>
                          <Text
                            type="2xl"
                            weight="bold"
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
                                type="xs"
                                weight="bold"
                                style={styles.currentBadgeText}
                              >
                                ✓ CURRENT
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.priceContainer}>
                          <Text
                            type="4xl"
                            weight="bold"
                            style={styles.priceText}
                          >
                            {pkg.product.priceString}
                          </Text>
                          <Text type="sm" style={styles.priceSuffix}>
                            per month
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.limitContainer,
                          { backgroundColor: tierColors.background },
                        ]}
                      >
                        <Text
                          type="5xl"
                          weight="bold"
                          style={[
                            styles.limitNumber,
                            { color: tierColors.primary },
                          ]}
                        >
                          {planConfig.monthlyLimit.toLocaleString()}
                        </Text>
                        <Text
                          type="sm"
                          weight="medium"
                          style={styles.limitText}
                        >
                          tattoo generations every month
                        </Text>
                      </View>

                      {/* <View style={styles.planFeatures}>
                        {planConfig.features.map((feature, index) => (
                          <View key={index} style={styles.planFeatureItem}>
                            <View
                              style={[
                                styles.featureDot,
                                { backgroundColor: tierColors.primary },
                              ]}
                            />
                            <Text type="sm" style={styles.planFeatureText}>
                              {feature}
                            </Text>
                          </View>
                        ))}
                      </View> */}
                    </LinearGradient>
                  </Pressable>
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

        <View style={styles.footer}>
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
        primary: Color.amber[400],
        background: Color.amber[950] + "40",
        badge: Color.amber[600],
      };
    case "plus":
      return {
        primary: Color.emerald[400],
        background: Color.emerald[950] + "40",
        badge: Color.emerald[600],
      };
    case "pro":
      return {
        primary: Color.violet[400],
        background: Color.violet[950] + "40",
        badge: Color.violet[600],
      };
    default:
      return {
        primary: Color.zinc[400],
        background: Color.zinc[800] + "40",
        badge: Color.zinc[600],
      };
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: 40,
  },
  heroBackground: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
  },
  heroBackgroundImage: {
    opacity: 0.3,
    resizeMode: "cover",
  },
  heroGradient: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroContainer: {
    gap: 20,
  },
  heroBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: Color.violet[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heroBadgeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  heroBadgeText: {
    color: Color.zinc[50],
    letterSpacing: 1,
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
  plansSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 20,
  },
  plansSectionTitle: {
    color: Color.zinc[500],
    letterSpacing: 2,
    textAlign: "center",
  },
  planList: {
    gap: 24,
  },
  planCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Color.zinc[800],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  planCardFeatured: {
    borderColor: Color.emerald[500],
    borderWidth: 2,
    shadowColor: Color.emerald[500],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  planCardCurrent: {
    borderColor: Color.violet[500],
    opacity: 0.7,
  },
  planCardPressed: {
    transform: [{ scale: 0.98 }],
    borderColor: Color.blue[400],
  },
  planCardGradient: {
    padding: 24,
    gap: 20,
  },
  ribbonContainer: {
    position: "absolute",
    top: 16,
    right: -32,
    zIndex: 10,
    transform: [{ rotate: "45deg" }],
  },
  ribbon: {
    paddingVertical: 6,
    paddingHorizontal: 40,
    shadowColor: Color.emerald[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  ribbonText: {
    color: Color.zinc[50],
    letterSpacing: 1.5,
    textAlign: "center",
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
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  currentBadge: {},
  currentBadgeText: {
    color: Color.zinc[50],
    letterSpacing: 0.5,
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
  priceSuffix: {
    color: Color.zinc[500],
  },
  limitContainer: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  limitNumber: {
    letterSpacing: -2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  limitText: {
    color: Color.zinc[400],
    textAlign: "center",
  },
  planFeatures: {
    gap: 12,
    paddingTop: 4,
  },
  planFeatureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  planFeatureText: {
    color: Color.zinc[300],
    flex: 1,
  },
  ctaIndicator: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Color.zinc[800],
    alignItems: "center",
  },
  ctaText: {
    color: Color.zinc[400],
    letterSpacing: 0.5,
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
    alignItems: "center",
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
