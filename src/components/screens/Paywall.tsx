import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useSubscription } from "@/src/hooks/useSubscription";
import { Host, Label, Button as SwiftUIButton } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  disabled,
  font,
  foregroundStyle,
  frame,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useQueryClient } from "@tanstack/react-query";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Link, Stack, useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { use, useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import Purchases, {
  PACKAGE_TYPE,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";
import { OfferingCard } from "../paywall/OfferingCard";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

type BillingPeriod = "weekly" | "monthly";

const CLOSE_BUTTON_DELAY_MS = 2500;

export function Paywall() {
  const [defaultOffering, setDefaultOffering] =
    useState<PurchasesOffering | null>(null);
  const [selectedPeriod, setSelectedPeriod] =
    useState<BillingPeriod>("monthly");
  const { customerInfo, refreshSubscriptionStatus } = useSubscription();
  const queryClient = useQueryClient();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();

  // Close button visibility logic
  const { settings, updateSettingsSync } = use(AppSettingsContext);
  const isFirstPaywallView = !settings.hasSeenPaywall;
  const [showCloseButton, setShowCloseButton] = useState(!isFirstPaywallView);

  const weeklyPackage = defaultOffering?.weekly;
  const monthlyPackage = defaultOffering?.monthly;
  const selectedPackage =
    selectedPeriod === "weekly" ? weeklyPackage : monthlyPackage;

  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();

    // We introduced a new offering called v2_default. This is the default offering that will be used if no offering is specified.
    const offering = offerings?.all?.v2_default;
    setDefaultOffering(offering ?? null);
  };

  const handlePurchase = async (pkg: PurchasesPackage) => {
    const periodLabel =
      pkg.packageType === PACKAGE_TYPE.WEEKLY ? "weekly" : "monthly";

    customEvent("plan_selected", {
      plan: periodLabel,
      price: pkg.product.priceString,
    });

    try {
      setIsPurchasing(true);
      const { customerInfo: updatedCustomerInfo } =
        await Purchases.purchasePackage(pkg);
      setIsPurchasing(false);

      console.log("Purchase successful!");
      console.log("Updated customer info:", updatedCustomerInfo);

      customEvent("purchase_completed", {
        plan: periodLabel,
        success: true,
      });

      Alert.alert(
        "Success!",
        "Your subscription is now active. Enjoy unlimited tattoo generations!",
        [
          {
            text: "OK",
            onPress: async () => {
              await refreshSubscriptionStatus();
              await queryClient.invalidateQueries({
                queryKey: ["user", "usage"],
              });
              router.dismissTo("/(playground)");
              toast.success("Subscription activated!");
            },
          },
        ]
      );
    } catch (error: any) {
      setIsPurchasing(false);
      console.error("Purchase error:", error);

      if (error.userCancelled) {
        console.log("User cancelled the purchase");
        return;
      }

      customEvent("purchase_completed", {
        plan: periodLabel,
        success: false,
        error: error.message || "Unknown error",
      });

      Alert.alert(
        "Purchase Failed",
        error.message || "Unable to complete purchase. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      fetchProducts();
      setIsPurchasing(false);
    }
  };

  const hasActiveSubscription = (): boolean => {
    if (!customerInfo) return false;
    return Object.keys(customerInfo.entitlements.active).length > 0;
  };

  useEffect(() => {
    customEvent("paywall_viewed", { source: "manual" });
    fetchProducts();

    // Delayed close button for first-time viewers
    if (isFirstPaywallView) {
      const timer = setTimeout(() => {
        setShowCloseButton(true);
        updateSettingsSync({ hasSeenPaywall: true });
      }, CLOSE_BUTTON_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isFirstPaywallView, updateSettingsSync]);

  const isSubscribed = hasActiveSubscription();

  const handleRestoreSubscription = async () => {
    if (isPurchasing) return;
    try {
      const restore = await Purchases.restorePurchases();
      const hasActivePurchases =
        Object.keys(restore.entitlements.active).length > 0;

      customEvent("restore_attempted", {
        success: true,
        hasActivePurchases,
      });

      if (hasActivePurchases) {
        Alert.alert("Success!", "Your purchases have been restored.", [
          { text: "OK", onPress: () => router.dismissAll() },
        ]);
        await queryClient.invalidateQueries({
          queryKey: ["user", "usage"],
        });
        await refreshSubscriptionStatus();
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
      customEvent("restore_attempted", {
        success: false,
        hasActivePurchases: false,
      });
      Alert.alert(
        "Error Restoring Purchases",
        "Unable to restore purchases. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          unstable_headerLeftItems: () => [
            {
              type: "custom",
              hidesSharedBackground: true,
              element: (
                <>
                  {showCloseButton && (
                    <PressableScale
                      onPress={() => {
                        if (isPurchasing) return;

                        if (router.canGoBack()) {
                          router.back();
                          return;
                        }
                        router.replace("/(tabs)/(home)");
                      }}
                    >
                      <Icon
                        symbol="xmark"
                        size="md"
                        color={Color.grayscale[50]}
                      />
                    </PressableScale>
                  )}
                </>
              ),
            },
          ],
        }}
      />

      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 1,
              experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, ${Color.grayscale[50]} 50%)`,
            },
          ]}
        />
        <Image
          source={{
            uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/paywall-bg.avif",
          }}
          contentFit="cover"
          contentPosition="top center"
          style={[StyleSheet.absoluteFill, { height: 400 }]}
        />
      </View>

      {/* Content */}
      <View
        style={{
          paddingTop: top * 2,
          flex: 1,
          zIndex: 1,
          padding: 16,
          gap: 16,
        }}
      >
        {/* Plan Selection */}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <Text type="4xl" weight="bold" style={styles.heroTitle}>
            Design the tattoo you&apos;ve always wanted
          </Text>
          <Text
            type="base"
            weight="medium"
            style={{ textAlign: "center", color: Color.grayscale[700] }}
          >
            Explore tattoo ideas, refine designs through endless variations, try
            them on any body part, and export high-quality results with
            confidence.
          </Text>

          {defaultOffering && weeklyPackage && monthlyPackage ? (
            <>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <OfferingCard
                  title="Weekly"
                  package={weeklyPackage}
                  onPress={() => setSelectedPeriod("weekly")}
                  isSelected={selectedPeriod === "weekly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    weeklyPackage.product.identifier
                  )}
                />

                <OfferingCard
                  title="Monthly"
                  package={monthlyPackage}
                  onPress={() => setSelectedPeriod("monthly")}
                  isSelected={selectedPeriod === "monthly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    monthlyPackage.product.identifier
                  )}
                />
              </View>

              {/* CTA Button */}
              <Host
                style={{
                  width: "100%",
                  height: 60,
                }}
              >
                <SwiftUIButton
                  modifiers={[
                    buttonStyle(
                      isLiquidGlassAvailable()
                        ? "glassProminent"
                        : "borderedProminent"
                    ),
                    tint("yellow"),
                    controlSize("large"),
                    disabled(isPurchasing),
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    if (selectedPackage) {
                      handlePurchase(selectedPackage);
                    }
                  }}
                >
                  <Label
                    title={isPurchasing ? "Processing..." : "Continue"}
                    modifiers={[
                      frame({ width: width - 64 }),
                      foregroundStyle("black"),
                      font({ weight: "bold" }),
                    ]}
                  />
                </SwiftUIButton>
              </Host>
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <Text type="base" style={styles.loadingText}>
                Loading plans…
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View
          style={{
            flex: 0.13,
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 4,
          }}
        >
          <PressableScale onPress={handleRestoreSubscription}>
            <Text
              style={{
                color: Color.grayscale[400],
                textAlign: "center",
              }}
              weight="medium"
            >
              Restore Subscription
            </Text>
          </PressableScale>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <Link href="/terms-of-service" asChild>
              <Text
                type="xs"
                style={{
                  color: Color.grayscale[400],
                }}
              >
                Terms of Service
              </Text>
            </Link>
            <Text type="xs" style={{ color: Color.grayscale[400] }}>
              •
            </Text>
            <Link href="/privacy-policy" asChild>
              <Text
                type="xs"
                style={{
                  color: Color.grayscale[400],
                }}
              >
                Privacy Policy
              </Text>
            </Link>
          </View>
          <Text
            type="xs"
            style={{ textAlign: "center", color: Color.grayscale[300] }}
          >
            AI design generation includes fair-use limits.
          </Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    zIndex: 2,
  },
  heroTitle: {
    color: Color.zinc[50],
    letterSpacing: -1,
    textAlign: "center",
  },
  heroSubtitle: {
    color: Color.zinc[50] + "90",
    textAlign: "center",
    lineHeight: 26,
  },
  saveBadge: {
    position: "absolute",
    top: -1,
    right: -1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    backgroundColor: Color.yellow[400],
  },
  saveBadgeText: {
    color: Color.grayscale[950],
    letterSpacing: 0.5,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    color: Color.yellow[400],
    fontSize: 14,
  },
  featureText: {
    color: Color.zinc[200],
    fontSize: 15,
    letterSpacing: -0.3,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    color: Color.grayscale[500],
  },
  footer: {
    gap: 8,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  fairUseText: {
    color: Color.grayscale[600],
  },
  legalLinkText: {
    color: Color.grayscale[500],
    textDecorationLine: "underline",
  },
  legalSeparator: {
    color: Color.grayscale[700],
  },
});
