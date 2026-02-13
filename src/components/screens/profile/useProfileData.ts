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

export function useProfileData() {
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
    if (!lastSubscription) return { text: "No subscription", color: "#9ca3af" };
    switch (lastSubscription.status) {
      case "active":
        return { text: "Active", color: "#10b981" };
      case "expired":
        return { text: "Expired", color: "#ef4444" };
      case "cancelled":
        return { text: "Cancelled", color: "#f59e0b" };
      default:
        return { text: "Unknown", color: "#9ca3af" };
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
    const subject = "Inkigo AI App Support Request";
    const userInfo = user
      ? `User ID: ${user.id}\nEmail: ${user.email}`
      : "(Not signed in)";
    const body = `Hi,\n\nI need help with the Inkigo app.\n\n${userInfo}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
    await Linking.openURL(
      `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleRateApp = () =>
    Linking.openURL(
      "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193?action=write-review"
    );

  const handleShareApp = () =>
    Share.share({
      message: "Check out Inkigo AI \n",
      url: "https://cwb.sh/inkigo-ios?r=app",
    });

  const handleArtistContact = async () => {
    const subject = "Are you an artist? - Inkigo AI";
    const userInfo = user
      ? `My account email: ${user.email}\nMy user ID: ${user.id}`
      : "(Not signed in)";
    const body = `Hi!\n\nI'm interested in collaborating or have suggestions/complaints.\n\n${userInfo}\n\n[Please share your suggestions, complaints, or tell us about yourself as an artist]\n\nThanks!`;
    await Linking.openURL(
      `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleSendFeedback = async () => {
    const subject = "Inkigo Feedback";
    const userInfo = user ? `\n\nAccount: ${user.email}` : "";
    const body = `Hi!\n\nI have some feedback about Inkigo:\n\n[Your feedback here]${userInfo}\n\nThanks!`;
    await Linking.openURL(
      `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
      "Delete Account",
      "Are you sure? This cannot be undone. Note: this does NOT cancel active subscriptions.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
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
      if (name.toLowerCase().includes("inkigo_"))
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
    : user?.name || "Unknown User";

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
