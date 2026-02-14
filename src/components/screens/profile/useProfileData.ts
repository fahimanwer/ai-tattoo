import { authClient } from "@/lib/auth-client";
import { NANOBANANA, NANOBANANA_PRO } from "@/convex/geminiUtils";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { getLastSubscription } from "@/src/context/SubscriptionContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { useUserData } from "@/src/hooks/useUserData";
import { useRouter } from "expo-router";
import { use, useMemo, useState } from "react";
import { Alert, Linking, Share } from "react-native";
import { useTranslation } from "react-i18next";

export function useProfileData() {
  const { t } = useTranslation();
  const { user, refresh } = useUserData();
  const { settings, updateSettings } = use(AppSettingsContext);
  const { refreshSubscriptionStatus, customerInfo } = useSubscription();
  const {
    remaining,
    planColor,
    periodStart,
    periodEnd,
    refetch: refetchUsage,
  } = useUsageLimit();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const lastSubscription = useMemo(
    () => getLastSubscription(customerInfo),
    [customerInfo]
  );

  const hasActiveSubscription = useMemo(
    () => lastSubscription?.isActive === true,
    [lastSubscription]
  );

  const hasActiveUsagePeriod = useMemo(() => {
    if (!periodStart || !periodEnd) return false;
    const now = new Date();
    return now >= new Date(periodStart) && now <= new Date(periodEnd);
  }, [periodStart, periodEnd]);

  const getStatusDisplay = () => {
    if (!lastSubscription) return { text: t('profile.noSubscription'), color: "#9ca3af" };
    switch (lastSubscription.status) {
      case "active":
        return { text: t('profile.active'), color: "#10b981" };
      case "expired":
        return { text: t('profile.expired'), color: "#ef4444" };
      case "cancelled":
        return { text: t('profile.cancelled'), color: "#f59e0b" };
      default:
        return { text: t('profile.unknown'), color: "#9ca3af" };
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchUsage(), refreshSubscriptionStatus()]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleContactSupport = async () => {
    const subject = t('emails.support.subject');
    const userInfo = user
      ? `User ID: ${user.id}\nEmail: ${user.email}`
      : t('auth.notSignedIn');
    const body = t('emails.support.body', { userInfo });
    await Linking.openURL(
      `mailto:contact@fahimanwer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleRateApp = () =>
    Linking.openURL(
      "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193?action=write-review"
    );

  const handleShareApp = () =>
    Share.share({
      message: t('profile.shareMessage'),
      url: "https://fahimanwer.com/tattooai",
    });

  const handleArtistContact = async () => {
    const subject = t('emails.artist.subject');
    const userInfo = user
      ? `My account email: ${user.email}\nMy user ID: ${user.id}`
      : t('auth.notSignedIn');
    const body = t('emails.artist.body', { userInfo });
    await Linking.openURL(
      `mailto:contact@fahimanwer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleSendFeedback = async () => {
    const subject = t('emails.feedback.subject');
    const userInfo = user ? t('emails.accountInfo', { email: user.email }) : "";
    const body = t('emails.feedback.body', { userInfo });
    await Linking.openURL(
      `mailto:contact@fahimanwer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handlePrivacyPolicy = () => router.push("/privacy-policy");
  const handleTermsOfService = () => router.push("/terms-of-service");

  const handleSignOut = async () => {
    await refresh();
    await authClient.signOut();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('profile.deleteAccountConfirmTitle'),
      t('profile.deleteAccountConfirmMessage'),
      [
        { text: t('common.cancel'), style: "cancel" },
        {
          text: t('common.delete'),
          style: "destructive",
          onPress: async () => {
            router.dismissAll();
            await authClient.signOut();
          },
        },
      ]
    );
  };

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return null;
    return new Date(user.createdAt).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [user?.createdAt]);

  const planBadge = useMemo(() => {
    if (hasActiveSubscription && lastSubscription) {
      const name = lastSubscription.productName || "Pro";
      if (name.toLowerCase().includes("tattoodesignai_"))
        return { name: "Premium", color: "#3563E9" };
      if (name.toLowerCase().includes("plus"))
        return { name: "Plus", color: Color.green[500] };
      if (name.toLowerCase().includes("starter"))
        return { name: "Starter", color: "#3563E9" };
      return { name, color: Color.green[500] };
    }
    return { name: "Free", color: Color.zinc[400] };
  }, [hasActiveSubscription, lastSubscription]);

  const modelDisplayName = useMemo(() => {
    const model = hasActiveSubscription ? NANOBANANA_PRO : NANOBANANA;
    return model === NANOBANANA_PRO ? "Nano Banana Pro" : "Nano Banana";
  }, [hasActiveSubscription]);

  const isAuthenticated = !!user;
  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || t('profile.unknownUser');

  return {
    user,
    settings,
    updateSettings,
    isRefreshing,
    isAuthenticated,
    displayName,
    memberSince,
    modelDisplayName,
    planBadge,
    planColor,
    lastSubscription,
    hasActiveSubscription,
    hasActiveUsagePeriod,
    remaining,
    periodStart,
    periodEnd,
    getStatusDisplay,
    handleRefresh,
    handleContactSupport,
    handleRateApp,
    handleShareApp,
    handleArtistContact,
    handleSendFeedback,
    handlePrivacyPolicy,
    handleTermsOfService,
    handleSignOut,
    handleDeleteAccount,
    router,
  };
}
