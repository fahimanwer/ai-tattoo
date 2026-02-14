import { authClient } from "@/lib/auth-client";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUserData } from "@/src/hooks/useUserData";
import { Image } from "expo-image";
import { Link, Stack, useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { use, useEffect, useMemo, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import Purchases, {
  PACKAGE_TYPE,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
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
function getPersonalizedHeadlineKey(
  answers: OnboardingAnswers | undefined
): string {
  const userType = getArrayValue(answers, "user-description");
  const goals = getArrayValue(answers, "goal");

  if (userType?.includes("artist")) return "paywall.headlineArtist";
  if (goals?.includes("cover_up")) return "paywall.headlineCoverUp";
  if (goals?.includes("try_on")) return "paywall.headlineTryOn";
  if (goals?.includes("generate")) return "paywall.headlineDesign";
  if (goals?.includes("browse")) return "paywall.headlineBrowse";
  return "paywall.headlineDesign";
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
  const { isDark } = useTheme();

  // Close button visibility logic
  const { settings, updateSettingsSync, setIsOnboarded } =
    use(AppSettingsContext);
  const isFirstPaywallView = !settings.hasSeenPaywall;
  const [showCloseButton, setShowCloseButton] = useState(!isFirstPaywallView);

  // Detect if we're in the onboarding flow (user hasn't completed onboarding yet)
  const isOnboardingFlow = !settings.isOnboarded;

  const { t } = useTranslation();

  // Personalized headline based on onboarding answers
  const headlineKey = useMemo(
    () => getPersonalizedHeadlineKey(settings.onboardingAnswers),
    [settings.onboardingAnswers]
  );
  const headline = t(headlineKey);

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
            t('paywall.successTitle'),
            t('paywall.subscriptionActiveMessage'),
            [
              {
                text: t('common.continue'),
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
            t('paywall.almostThereTitle'),
            t('paywall.createAccountMessage'),
            [
              {
                text: t('common.continue'),
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
          t('paywall.successTitle'),
          t('paywall.subscriptionActiveMessage'),
          [
            {
              text: t('common.ok'),
              onPress: async () => {
                router.dismissTo("/(playground)");
                toast.success(t('paywall.subscriptionActivated'));
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
        t('paywall.purchaseFailedTitle'),
        error.message || t('paywall.purchaseFailedMessage'),
        [{ text: t('common.ok') }]
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
              t('paywall.purchaseRestoredTitle'),
              t('paywall.subscriptionNowActive'),
              [
                {
                  text: t('common.continue'),
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
              t('paywall.purchaseFoundTitle'),
              t('paywall.createAccountMessage'),
              [
                {
                  text: t('common.continue'),
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
          Alert.alert(t('paywall.successTitle'), t('paywall.purchasesRestoredMessage'), [
            { text: t('common.ok'), onPress: () => router.dismissAll() },
          ]);
        }
      } else {
        Alert.alert(
          t('paywall.noPurchasesFoundTitle'),
          t('paywall.noPurchasesFoundMessage'),
          [{ text: t('common.ok') }]
        );
      }
    } catch (e) {
      console.error("Error restoring purchases:", e);
      customEvent("restore_attempted", {
        success: false,
        hasActivePurchases: false,
      });
      Alert.alert(
        t('paywall.errorRestoringTitle'),
        t('paywall.errorRestoringMessage'),
        [{ text: t('common.ok') }]
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerRight: () =>
            showCloseButton ? (
              <PressableScale
                onPress={() => {
                  if (isPurchasing) return;

                  if (isOnboardingFlow) {
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
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: isDark
                      ? Color.grayscale[200]
                      : Color.grayscale[100],
                  },
                ]}
              >
                {Platform.OS === "ios" ? (
                  <Icon
                    symbol="xmark"
                    size="md"
                    color={Color.grayscale[800]}
                  />
                ) : (
                  <Text
                    type="base"
                    weight="bold"
                    style={{ color: Color.grayscale[800] }}
                  >
                    ✕
                  </Text>
                )}
              </PressableScale>
            ) : null,
        }}
      />

      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 1,
              experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, ${isDark ? Color.grayscale[50] : "#FFFFFF"} 50%)`,
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
          <Text
            type="4xl"
            weight="bold"
            style={[
              styles.heroTitle,
              { color: isDark ? Color.zinc[50] : Color.zinc[900] },
            ]}
          >
            {headline}
          </Text>
          <Text
            type="base"
            weight="medium"
            style={{
              textAlign: "center",
              color: isDark ? Color.grayscale[700] : Color.grayscale[500],
            }}
          >
            {t('paywall.subtitle')}
          </Text>

          {defaultOffering && weeklyPackage && monthlyPackage ? (
            <>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <OfferingCard
                  title={t('paywall.monthly')}
                  term={t('paywall.month')}
                  package={monthlyPackage}
                  onPress={() => setSelectedPeriod("monthly")}
                  isSelected={selectedPeriod === "monthly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    monthlyPackage.product.identifier
                  )}
                  discountBadge={t('paywall.saveBadge', { percent: '50' })}
                />
                <OfferingCard
                  title={t('paywall.weekly')}
                  term={t('paywall.week')}
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
                title={t('paywall.continueButton')}
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
                {t('paywall.loadingPlans')}
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
              {t('paywall.restoreSubscription')}
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
                {t('profile.termsOfService')}
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
                {t('profile.privacyPolicy')}
              </Text>
            </Link>
          </View>
          <Text
            type="xs"
            style={{ textAlign: "center", color: Color.grayscale[400] }}
          >
            {t('paywall.fairUseNote')}
          </Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    zIndex: 2,
  },
  heroTitle: {
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
    backgroundColor: Color.blue[500],
  },
  saveBadgeText: {
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    color: Color.blue[500],
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
