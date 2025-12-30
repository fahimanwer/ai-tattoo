import { authClient } from "@/lib/auth-client";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUserData } from "@/src/hooks/useUserData";
import { Image } from "expo-image";
import { Link, Stack, useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { use, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Purchases, {
  PACKAGE_TYPE,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";
import type { OnboardingAnswers } from "../onboarding/onboardingTypes";
import { CTAButton } from "../paywall/CTAButton";
import { OfferingCard } from "../paywall/OfferingCard";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

type BillingPeriod = "weekly" | "monthly";

const CLOSE_BUTTON_DELAY_MS = 2500;

/**
 * Helper to safely extract an array value from answers
 */
function getArrayValue(
  answers: OnboardingAnswers | undefined,
  key: string
): string[] | undefined {
  if (!answers) return undefined;
  const value = answers[key];
  if (Array.isArray(value) && value.length > 0) {
    return value.filter((v) => typeof v === "string" && v.trim().length > 0);
  }
  return undefined;
}

/**
 * Generate personalized paywall headline based on user's onboarding answers
 */
function getPersonalizedHeadline(
  answers: OnboardingAnswers | undefined
): string {
  const userType = getArrayValue(answers, "user-description");
  const goals = getArrayValue(answers, "goal");

  // Artist-specific headline
  if (userType?.includes("artist")) {
    return "Show clients their tattoo before you ink";
  }

  // Cover-up focused headline
  if (goals?.includes("cover_up")) {
    return "Transform your tattoo with confidence";
  }

  // Try-on focused headline
  if (goals?.includes("try_on")) {
    return "See your tattoo before you commit";
  }

  // Generate/design focused headline
  if (goals?.includes("generate")) {
    return "Design the tattoo you've always wanted";
  }

  // Browsing/inspiration focused
  if (goals?.includes("browse")) {
    return "Find your perfect tattoo design";
  }

  // Default: Strong, universal headline
  return "Design the tattoo you've always wanted";
}

export function Paywall() {
  const [defaultOffering, setDefaultOffering] =
    useState<PurchasesOffering | null>(null);
  const [selectedPeriod, setSelectedPeriod] =
    useState<BillingPeriod>("monthly");
  const { customerInfo } = useSubscription();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { refresh, syncAfterAuth } = useUserData();

  // Close button visibility logic
  const { settings, updateSettingsSync, setIsOnboarded } =
    use(AppSettingsContext);
  const isFirstPaywallView = !settings.hasSeenPaywall;
  const [showCloseButton, setShowCloseButton] = useState(!isFirstPaywallView);

  // Detect if we're in the onboarding flow (user hasn't completed onboarding yet)
  const isOnboardingFlow = !settings.isOnboarded;

  // Personalized headline based on onboarding answers
  const headline = useMemo(
    () => getPersonalizedHeadline(settings.onboardingAnswers),
    [settings.onboardingAnswers]
  );

  // Check if user is authenticated
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

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
        isOnboardingFlow,
      });

      // Different flow for onboarding vs authenticated users
      if (isOnboardingFlow) {
        if (isAuthenticated && session?.user?.id) {
          // Link RevenueCat with Better Auth user ID + restore + refresh usage
          await syncAfterAuth(session.user.id);
          // Already authenticated: complete onboarding directly
          Alert.alert(
            "Success!",
            "Your subscription is now active. Enjoy unlimited tattoo designs!",
            [
              {
                text: "Continue",
                onPress: () => {
                  router.dismiss();
                  setIsOnboarded(true);
                },
                isPreferred: true,
              },
            ]
          );
        } else {
          // Not authenticated: require sign-in to link purchase
          // The auth screen will call syncAfterAuth after sign-in
          Alert.alert(
            "Almost there!",
            "Create an account to activate your subscription and start designing.",
            [
              {
                text: "Continue",
                onPress: () => {
                  // Dismiss paywall, then replace onboarding with auth screen
                  // Using replace unmounts the onboarding Container (stops videos/haptics)
                  router.dismiss();
                  router.replace("/(onboarding)/auth");
                },
                isPreferred: true,
              },
            ]
          );
        }
      } else {
        // Authenticated user: link RevenueCat + refresh usage
        if (session?.user?.id) {
          await syncAfterAuth(session.user.id);
        } else {
          await refresh();
        }
        // Normal flow
        Alert.alert(
          "Success!",
          "Your subscription is now active. Enjoy unlimited tattoo designs!",
          [
            {
              text: "OK",
              onPress: async () => {
                router.dismissTo("/(playground)");
                toast.success("Subscription activated!");
              },
            },
          ]
        );
      }
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
        if (isOnboardingFlow) {
          if (isAuthenticated && session?.user?.id) {
            // Link RevenueCat with Better Auth user ID + refresh usage
            await syncAfterAuth(session.user.id);
            // Already authenticated: complete onboarding directly
            Alert.alert(
              "Purchase Restored!",
              "Your subscription is now active.",
              [
                {
                  text: "Continue",
                  onPress: () => {
                    router.dismiss();
                    setTimeout(() => {
                      setIsOnboarded(true);
                    }, 400);
                  },
                  isPreferred: true,
                },
              ]
            );
          } else {
            // Not authenticated: require sign-in to link restored purchase
            // The auth screen will call syncAfterAuth after sign-in
            Alert.alert(
              "Purchase Found!",
              "Create an account to activate your subscription and start designing.",
              [
                {
                  text: "Continue",
                  onPress: () => {
                    // Dismiss paywall, then replace onboarding with auth screen
                    // Using replace unmounts the onboarding Container (stops videos/haptics)
                    router.dismiss();
                    router.replace("/(onboarding)/auth");
                  },
                  isPreferred: true,
                },
              ]
            );
          }
        } else {
          // Authenticated user: link RevenueCat + refresh usage
          if (session?.user?.id) {
            await syncAfterAuth(session.user.id);
          } else {
            await refresh();
          }
          fetchProducts();
          // Normal flow
          Alert.alert("Success!", "Your purchases have been restored.", [
            { text: "OK", onPress: () => router.dismissAll() },
          ]);
        }
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
          unstable_headerRightItems: () => [
            {
              type: "custom",
              hidesSharedBackground: true,
              element: (
                <>
                  {showCloseButton && (
                    <PressableScale
                      onPress={() => {
                        if (isPurchasing) return;

                        if (isOnboardingFlow) {
                          // Complete onboarding when skipping paywall
                          setIsOnboarded(true);
                          router.replace("/(tabs)/(home)");
                          return;
                        }

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
                        color={Color.grayscale[800]}
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
            {headline}
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
                  title="Monthly"
                  term="Month"
                  package={monthlyPackage}
                  onPress={() => setSelectedPeriod("monthly")}
                  isSelected={selectedPeriod === "monthly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    monthlyPackage.product.identifier
                  )}
                  discountBadge="Save 50%"
                />
                <OfferingCard
                  title="Weekly"
                  term="Week"
                  package={weeklyPackage}
                  onPress={() => setSelectedPeriod("weekly")}
                  isSelected={selectedPeriod === "weekly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    weeklyPackage.product.identifier
                  )}
                />
              </View>

              {/* CTA Button */}
              <CTAButton
                title="Continue"
                onPress={() => {
                  if (selectedPackage) {
                    handlePurchase(selectedPackage);
                  }
                }}
                loading={isPurchasing}
              />
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
            style={{ textAlign: "center", color: Color.grayscale[400] }}
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
