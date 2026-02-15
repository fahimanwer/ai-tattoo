import { authClient } from "@/lib/auth-client";
import { Home } from "@/src/components/screens/Home";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { Stack, useRouter } from "expo-router";
import { use, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLimitReached, isLoading: isUsageLoading } = useUsageLimit();
  const { hasActiveSubscription, isLoading: isSubLoading } = useSubscription();
  const { data: session } = authClient.useSession();
  const { settings } = use(AppSettingsContext);
  const isAuthenticated = session?.user !== undefined;
  const isLoading = isUsageLoading || isSubLoading;
  const hasShownPaywall = useRef(false);

  const paywallVariant = settings.hasSeenPaywall ? "discount" : "main";

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      !hasActiveSubscription &&
      !hasShownPaywall.current
    ) {
      hasShownPaywall.current = true;
      router.push(`/(paywall)?variant=${paywallVariant}`);
    }
  }, [isLoading, isAuthenticated, hasActiveSubscription, router, paywallVariant]);

  const getButtonConfig = () => {
    if (isLoading) {
      return { label: t("common.loading"), action: () => {} };
    }
    if (!isAuthenticated) {
      return { label: t("sheet.createNewTattoo"), action: () => router.push("/(playground)") };
    }
    if (isLimitReached || !hasActiveSubscription) {
      return { label: t("common.upgrade"), action: () => router.push(`/(paywall)?variant=${paywallVariant}`) };
    }
    return { label: t("sheet.createNewTattoo"), action: () => router.push("/(playground)") };
  };

  const { label, action } = getButtonConfig();

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          tintColor="#3563E9"
          variant="prominent"
          style={{ fontWeight: "bold" }}
          onPress={action}
        >
          {label}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <Home />
    </>
  );
}
