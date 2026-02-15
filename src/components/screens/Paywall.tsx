import { authClient } from "@/lib/auth-client";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useTheme } from "@/src/context/ThemeContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUserData } from "@/src/hooks/useUserData";
import { Image } from "expo-image";
import { Link, Stack, useRouter } from "expo-router";
import { PressableScale } from "pressto";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import Purchases, {
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

type BillingPeriod = "weekly" | "annual";

const CLOSE_BUTTON_DELAY_MS = 2500;
const COUNTDOWN_DURATION_S = 24 * 60 * 60; // 24 hours in seconds

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

function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface PaywallProps {
  variant?: "main" | "discount";
}

export function Paywall({ variant = "main" }: PaywallProps) {
  const [defaultOffering, setDefaultOffering] =
    useState<PurchasesOffering | null>(null);
  const [selectedPeriod, setSelectedPeriod] =
    useState<BillingPeriod>("annual");
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
  const isOnboardingFlow = !settings.isOnboarded;

  const { t } = useTranslation();

  // Countdown timer for discount variant
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION_S);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (variant === "discount") {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
      };
    }
  }, [variant]);

  const headlineKey = useMemo(
    () => getPersonalizedHeadlineKey(settings.onboardingAnswers),
    [settings.onboardingAnswers]
  );
  const headline = t(headlineKey);

  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  // Packages from offering
  const weeklyPackage = defaultOffering?.weekly;
  const annualPackage = defaultOffering?.annual;
  const selectedPackage =
    selectedPeriod === "weekly" ? weeklyPackage : annualPackage;

  // Trial detection
  const hasFreeTrial = annualPackage?.product?.introPrice?.price === 0;
  const trialDays =
    annualPackage?.product?.introPrice?.periodNumberOfUnits ?? 0;

  // Savings calculation
  const weeklyPrice = weeklyPackage?.product?.price ?? 0;
  const annualPrice = annualPackage?.product?.price ?? 0;
  const weeklyEquivalent = annualPrice > 0 ? annualPrice / 52 : 0;
  const savingsPercent =
    weeklyPrice > 0
      ? Math.round((1 - weeklyEquivalent / weeklyPrice) * 100)
      : 0;

  // CTA text
  const ctaTrialText =
    selectedPeriod === "annual" && hasFreeTrial && trialDays > 0
      ? t("paywall.startTrialButton", { days: trialDays })
      : undefined;

  // Annual subtitle (per-week breakdown)
  const annualPerWeekStr =
    weeklyEquivalent > 0
      ? t("paywall.annualPerWeek", {
          price: `$${weeklyEquivalent.toFixed(2)}`,
        })
      : undefined;

  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();
    const offeringKey = variant === "discount" ? "pro_offer" : "pro_default";
    setDefaultOffering(offerings?.all?.[offeringKey] ?? null);
  };

  // Shared post-purchase/restore flow
  const handleSuccessFlow = async (titleKey: string, msgKey: string) => {
    if (isOnboardingFlow) {
      if (isAuthenticated && session?.user?.id) {
        await syncAfterAuth(session.user.id);
        Alert.alert(t(titleKey), t(msgKey), [{
          text: t("common.continue"), isPreferred: true,
          onPress: () => { router.dismiss(); setIsOnboarded(true); },
        }]);
      } else {
        Alert.alert(t("paywall.almostThereTitle"), t("paywall.createAccountMessage"), [{
          text: t("common.continue"), isPreferred: true,
          onPress: () => { router.dismiss(); router.replace("/(onboarding)/auth"); },
        }]);
      }
    } else {
      if (session?.user?.id) await syncAfterAuth(session.user.id);
      else await refresh();
      Alert.alert(t(titleKey), t(msgKey), [{
        text: t("common.ok"),
        onPress: () => { router.dismissTo("/(playground)"); toast.success(t("paywall.subscriptionActivated")); },
      }]);
    }
  };

  const handlePurchase = async (pkg: PurchasesPackage) => {
    customEvent("plan_selected", { plan: selectedPeriod, price: pkg.product.priceString, variant });
    try {
      setIsPurchasing(true);
      await Purchases.purchasePackage(pkg);
      setIsPurchasing(false);
      customEvent("purchase_completed", { plan: selectedPeriod, success: true, variant });
      await handleSuccessFlow("paywall.successTitle", "paywall.subscriptionActiveMessage");
    } catch (error: any) {
      setIsPurchasing(false);
      if (error.userCancelled) return;
      customEvent("purchase_completed", { plan: selectedPeriod, success: false, error: error.message });
      Alert.alert(t("paywall.purchaseFailedTitle"), error.message || t("paywall.purchaseFailedMessage"), [{ text: t("common.ok") }]);
    } finally {
      fetchProducts();
      setIsPurchasing(false);
    }
  };

  useEffect(() => {
    customEvent("paywall_viewed", { source: "manual", variant });
    fetchProducts();
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
      const hasActive = Object.keys(restore.entitlements.active).length > 0;
      customEvent("restore_attempted", { success: true, hasActivePurchases: hasActive });
      if (hasActive) {
        await handleSuccessFlow("paywall.purchaseRestoredTitle", "paywall.subscriptionNowActive");
        fetchProducts();
      } else {
        Alert.alert(t("paywall.noPurchasesFoundTitle"), t("paywall.noPurchasesFoundMessage"), [{ text: t("common.ok") }]);
      }
    } catch (e) {
      customEvent("restore_attempted", { success: false, hasActivePurchases: false });
      Alert.alert(t("paywall.errorRestoringTitle"), t("paywall.errorRestoringMessage"), [{ text: t("common.ok") }]);
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
      <View style={{ paddingTop: top * 2, flex: 1, zIndex: 1, padding: 16, gap: 16 }}>
        <View style={{ flex: 1, justifyContent: "flex-end", gap: 16 }}>
          {/* Discount banner */}
          {variant === "discount" && (
            <View style={styles.discountBanner}>
              <Text weight="bold" type="sm" style={{ color: "#f59e0b" }}>
                {t("paywall.specialOffer")}
              </Text>
              <Text type="xs" style={{ color: Color.grayscale[400] }}>
                {t("paywall.offerExpires")} {formatCountdown(countdown)}
              </Text>
            </View>
          )}

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
            {variant === "discount"
              ? t("paywall.discountSubtitle")
              : t("paywall.subtitle")}
          </Text>

          {defaultOffering && weeklyPackage && annualPackage ? (
            <>
              <View style={{ flexDirection: "column", gap: 12 }}>
                <OfferingCard
                  title={t("paywall.annual")}
                  term={t("paywall.year")}
                  package={annualPackage}
                  onPress={() => setSelectedPeriod("annual")}
                  isSelected={selectedPeriod === "annual"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    annualPackage.product.identifier
                  )}
                  trialBadge={
                    hasFreeTrial && trialDays > 0
                      ? t("paywall.freeTrialBadge", { days: trialDays })
                      : undefined
                  }
                  discountBadge={
                    savingsPercent > 0
                      ? t("paywall.savePercent", {
                          percent: savingsPercent.toString(),
                        })
                      : undefined
                  }
                  subtitle={annualPerWeekStr}
                />
                <OfferingCard
                  title={t("paywall.weekly")}
                  term={t("paywall.week")}
                  package={weeklyPackage}
                  onPress={() => setSelectedPeriod("weekly")}
                  isSelected={selectedPeriod === "weekly"}
                  isCurrentPlan={customerInfo?.activeSubscriptions?.includes(
                    weeklyPackage.product.identifier
                  )}
                />
              </View>

              <CTAButton
                title={t("paywall.continueButton")}
                trialText={ctaTrialText}
                onPress={() => {
                  if (selectedPackage) handlePurchase(selectedPackage);
                }}
                loading={isPurchasing}
              />
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <Text type="base" style={styles.loadingText}>
                {t("paywall.loadingPlans")}
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={{ flex: 0.13, justifyContent: "flex-end", gap: 4 }}>
          <PressableScale onPress={handleRestoreSubscription}>
            <Text
              style={{ color: Color.grayscale[400], textAlign: "center" }}
              weight="medium"
            >
              {t("paywall.restoreSubscription")}
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
              <Text type="xs" style={{ color: Color.grayscale[400] }}>
                {t("profile.termsOfService")}
              </Text>
            </Link>
            <Text type="xs" style={{ color: Color.grayscale[400] }}>
              •
            </Text>
            <Link href="/privacy-policy" asChild>
              <Text type="xs" style={{ color: Color.grayscale[400] }}>
                {t("profile.privacyPolicy")}
              </Text>
            </Link>
          </View>
          <Text
            type="xs"
            style={{ textAlign: "center", color: Color.grayscale[400] }}
          >
            {t("paywall.fairUseNote")}
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
  heroTitle: {
    letterSpacing: -1,
    textAlign: "center",
  },
  discountBanner: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f59e0b",
    alignSelf: "center",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    color: Color.grayscale[500],
  },
});
