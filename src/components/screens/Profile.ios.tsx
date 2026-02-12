import { authClient } from "@/lib/auth-client";
import { NANOBANANA, NANOBANANA_PRO } from "@/convex/geminiUtils";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { getLastSubscription } from "@/src/context/SubscriptionContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { useUserData } from "@/src/hooks/useUserData";
import {
  Button,
  ContentUnavailableView,
  DisclosureGroup,
  Form,
  Host,
  HStack,
  Label,
  LabeledContent,
  Section,
  Text,
  Toggle,
  VStack,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  font,
  foregroundStyle,
  onTapGesture,
  refreshable,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import * as Application from "expo-application";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Activity, use, useMemo, useState } from "react";
import { Alert, Linking, Share } from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";
import { toast } from "sonner-native";
// Button component for Form sections with haptic feedback
function FormButton({
  title,
  systemImage,
  onPress,
  color = "white",
}: {
  title: string;
  systemImage: SFSymbol;
  onPress: () => void;
  color?: string;
}) {
  return (
    <Button
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      modifiers={[foregroundStyle({ type: "color", color })]}
    >
      <Label title={title} systemImage={systemImage} />
    </Button>
  );
}

export function Profile() {
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
  const [isPlanDetailsExpanded, setIsPlanDetailsExpanded] = useState(false);
  const [isSecretExpanded, setIsSecretExpanded] = useState(false);
  const [isArtistExpanded, setIsArtistExpanded] = useState(false);
  const router = useRouter();

  // Get last subscription info
  const lastSubscription = useMemo(
    () => getLastSubscription(customerInfo),
    [customerInfo]
  );

  // Determine if there's an active subscription (even if cancelled, they still have access)
  const hasActiveSubscription = useMemo(() => {
    return lastSubscription?.isActive === true;
  }, [lastSubscription]);

  // Check if user has active usage period (they can still use the service)
  const hasActiveUsagePeriod = useMemo(() => {
    if (!periodStart || !periodEnd) return false;
    const now = new Date();
    const start = new Date(periodStart);
    const end = new Date(periodEnd);
    return now >= start && now <= end;
  }, [periodStart, periodEnd]);

  // Helper function to format status display
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
    } catch (error) {
      console.error("Error refreshing profile data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleContactSupport = async () => {
    try {
      const subject = "Inkigo AI App Support Request";
      const userInfo = user
        ? `User ID: ${user.id}\nEmail: ${user.email}`
        : "(Not signed in)";
      const body = `Hi,\n\nI need help with the Inkigo app.\n\n${userInfo}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
      const mailtoUrl = `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      await Linking.openURL(mailtoUrl);
    } catch (error) {
      console.error("Error opening email:", error);
    }
  };

  const handleArtistContact = async () => {
    try {
      const subject = "Are you an artist? - Inkigo AI";
      const userInfo = user
        ? `My account email: ${user.email}\nMy user ID: ${user.id}`
        : "(Not signed in)";
      const body = `Hi!\n\nI'm interested in collaborating or have suggestions/complaints.\n\n${userInfo}\n\n[Please share your suggestions, complaints, or tell us about yourself as an artist]\n\nThanks!`;
      const mailtoUrl = `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      await Linking.openURL(mailtoUrl);
    } catch (error) {
      console.error("Error opening email:", error);
    }
  };

  const handleRateApp = async () => {
    try {
      await Linking.openURL(
        "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193?action=write-review"
      );
    } catch (error) {
      console.error("Error opening App Store:", error);
    }
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: "Check out Inkigo AI \n",
        url: "https://cwb.sh/inkigo-ios?r=app",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handlePrivacyPolicy = async () => {
    try {
      router.push("/privacy-policy");
    } catch (error) {
      console.error("Error opening privacy policy:", error);
    }
  };

  const handleTermsOfService = async () => {
    try {
      router.push("/terms-of-service");
    } catch (error) {
      console.error("Error opening terms of service:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await refresh();
      await authClient.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Format member since date
  const memberSince = useMemo(() => {
    if (!user?.createdAt) return null;
    const date = new Date(user.createdAt);
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [user?.createdAt]);

  // Get plan badge info
  const planBadge = useMemo(() => {
    if (hasActiveSubscription && lastSubscription) {
      const name = lastSubscription.productName || "Pro";

      if (name.toLowerCase().includes("inkigo_")) {
        return {
          name: "Premium",
          color: "yellow",
          icon: "star.fill" as const,
        };
      }
      if (name.toLowerCase().includes("plus")) {
        return {
          name: "Plus",
          color: Color.green[500],
          icon: "star.fill" as const,
        };
      }
      if (name.toLowerCase().includes("starter")) {
        return {
          name: "Starter",
          color: "yellow",
          icon: "star.leadinghalf.filled" as const,
        };
      }
      return { name, color: Color.green[500], icon: "star.fill" as const };
    }
    return { name: "Free", color: Color.zinc[400], icon: "star" as const };
  }, [hasActiveSubscription, lastSubscription]);

  // Get model display name
  const modelDisplayName = useMemo(() => {
    const model = hasActiveSubscription ? NANOBANANA_PRO : NANOBANANA;
    if (model === NANOBANANA_PRO) {
      return "🍌 Nano Banana Pro";
    }
    if (model === NANOBANANA) {
      return "Nano Banana";
    }
    return model;
  }, [hasActiveSubscription]);

  const isAuthenticated = !!user;

  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  return (
    <Host style={{ flex: 1 }}>
      <Form modifiers={[refreshable(handleRefresh)]}>
        {/* Sign-in prompt for unauthenticated users */}
        <Activity mode={isAuthenticated ? "hidden" : "visible"}>
          <Section>
            <VStack>
              <ContentUnavailableView
                title="Not signed in"
                description="Sign in to access your account details, subscription info, and personalized features"
                systemImage="person.crop.circle.badge.exclamationmark"
              />
              <Button
                label="Sign in"
                modifiers={[
                  buttonStyle("borderedProminent"),
                  tint("white"),
                  foregroundStyle("black"),
                  font({ weight: "bold" }),
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/auth-sheet",
                    params: { dismissImmediately: "true" },
                  })
                }
              />
            </VStack>
          </Section>
        </Activity>

        {/* Account section - only for authenticated users */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section
            title="Account"
            footer={
              <Text
                modifiers={[
                  onTapGesture(async () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    await Clipboard.setStringAsync(user?.id ?? "");
                    toast.success("User ID copied to clipboard");
                  }),
                ]}
              >{`User ID: ${user?.id}`}</Text>
            }
          >
            <LabeledContent label="Name">
              <Text>{displayName}</Text>
            </LabeledContent>
            <LabeledContent label="Email">
              <Text>{user?.email ?? ""}</Text>
            </LabeledContent>
            <LabeledContent label="Model">
              <Text>{modelDisplayName}</Text>
            </LabeledContent>
            <Activity mode={memberSince ? "visible" : "hidden"}>
              <LabeledContent label="Member Since">
                <Text
                  modifiers={[
                    foregroundStyle({ type: "color", color: Color.zinc[400] }),
                  ]}
                >
                  {memberSince ?? ""}
                </Text>
              </LabeledContent>
            </Activity>
          </Section>
        </Activity>

        {/* Plan section - only for authenticated users with subscription/usage */}
        <Activity
          mode={
            isAuthenticated && (hasActiveSubscription || hasActiveUsagePeriod)
              ? "visible"
              : "hidden"
          }
        >
          <Section
            title={
              hasActiveSubscription
                ? lastSubscription?.unsubscribeDetectedAt
                  ? "Active Until Expiration"
                  : "Plan"
                : "Active Usage Period"
            }
            footer={
              <Activity mode={remaining === 0 ? "visible" : "hidden"}>
                <Text
                  modifiers={[foregroundStyle({ type: "color", color: "orange" })]}
                >
                  You&apos;ve reached your AI tattoo generation limit for this
                  plan. Upgrade to continue creating tattoos or contact us.
                </Text>
              </Activity>
            }
          >
            <LabeledContent label="Plan">
              <HStack spacing={6}>
                <Label systemImage={planBadge.icon} />
                <Text
                  modifiers={[
                    foregroundStyle({ type: "color", color: planBadge.color }),
                    font({ weight: "bold" }),
                  ]}
                >
                  {planBadge.name}
                </Text>
              </HStack>
            </LabeledContent>
            <FormButton
              title={hasActiveSubscription ? "Manage Plan" : "Upgrade Plan"}
              systemImage={
                hasActiveSubscription ? "creditcard.fill" : "star.fill"
              }
              onPress={() => router.push("/(paywall)")}
              color={hasActiveSubscription ? "white" : "yellow"}
            />
            <DisclosureGroup
              isExpanded={isPlanDetailsExpanded}
              onIsExpandedChange={setIsPlanDetailsExpanded}
              label="Plan Details"
              modifiers={[tint("white")]}
            >
              <LabeledContent label="Plan">
                <Text
                  modifiers={[
                    font({ weight: "bold" }),
                    foregroundStyle({ type: "color", color: planColor }),
                  ]}
                >
                  {hasActiveSubscription && lastSubscription
                    ? lastSubscription.productName || "Unknown"
                    : "Free"}
                </Text>
              </LabeledContent>
              <Activity
                mode={
                  hasActiveSubscription && lastSubscription
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent label="Status">
                  <Text
                    modifiers={[
                      font({ weight: "bold" }),
                      foregroundStyle({
                        type: "color",
                        color: getStatusDisplay().color,
                      }),
                    ]}
                  >
                    {lastSubscription?.unsubscribeDetectedAt
                      ? "Cancelled (Active Until Expiration)"
                      : getStatusDisplay().text}
                  </Text>
                </LabeledContent>
              </Activity>
              <Activity
                mode={
                  hasActiveSubscription && lastSubscription?.expiresDate
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent
                  label={
                    lastSubscription?.unsubscribeDetectedAt
                      ? "Access Ends On"
                      : lastSubscription?.willRenew
                      ? "Renews On"
                      : "Expires On"
                  }
                >
                  <Text
                    modifiers={[
                      font({
                        weight: lastSubscription?.unsubscribeDetectedAt
                          ? "bold"
                          : "regular",
                      }),
                    ]}
                  >
                    {lastSubscription?.expiresDate
                      ? new Date(
                          lastSubscription.expiresDate
                        ).toLocaleDateString()
                      : ""}
                  </Text>
                </LabeledContent>
              </Activity>
              <Activity
                mode={
                  hasActiveSubscription &&
                  lastSubscription &&
                  lastSubscription.daysRemaining !== null &&
                  lastSubscription.daysRemaining > 0
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent label="Days Remaining">
                  <Text
                    modifiers={[
                      font({ weight: "bold" }),
                      foregroundStyle({
                        type: "color",
                        color:
                          (lastSubscription?.daysRemaining ?? 0) <= 3
                            ? "yellow"
                            : Color.green[500],
                      }),
                    ]}
                  >
                    {`${lastSubscription?.daysRemaining ?? 0} days`}
                  </Text>
                </LabeledContent>
              </Activity>
              <Activity
                mode={
                  hasActiveSubscription && lastSubscription
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent label="Auto-Renew">
                  <Text
                    modifiers={[
                      foregroundStyle({
                        type: "color",
                        color: lastSubscription?.willRenew
                          ? Color.green[500]
                          : Color.red[500],
                      }),
                    ]}
                  >
                    {lastSubscription?.willRenew ? "On" : "Off"}
                  </Text>
                </LabeledContent>
              </Activity>
              <Activity
                mode={
                  hasActiveSubscription &&
                  lastSubscription?.unsubscribeDetectedAt
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent label="Cancelled At">
                  <Text
                    modifiers={[
                      font({ weight: "bold" }),
                      foregroundStyle({
                        type: "color",
                        color: Color.yellow[500],
                      }),
                    ]}
                  >
                    {lastSubscription?.unsubscribeDetectedAt
                      ? new Date(
                          lastSubscription.unsubscribeDetectedAt
                        ).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : ""}
                  </Text>
                </LabeledContent>
              </Activity>
              <Activity
                mode={
                  hasActiveSubscription && lastSubscription?.price
                    ? "visible"
                    : "hidden"
                }
              >
                <LabeledContent label="Price">
                  <Text>
                    {lastSubscription?.price
                      ? `${lastSubscription.price.currency} $${lastSubscription.price.amount}`
                      : ""}
                  </Text>
                </LabeledContent>
              </Activity>
              <LabeledContent label="Billing Period">
                <Text>
                  {`${
                    periodStart
                      ? new Date(periodStart).toLocaleDateString()
                      : "N/A"
                  } - ${
                    periodEnd ? new Date(periodEnd).toLocaleDateString() : "N/A"
                  }`}
                </Text>
              </LabeledContent>
            </DisclosureGroup>
          </Section>
        </Activity>

        {/* We Miss You section - only for authenticated users with expired subscription */}
        <Activity
          mode={
            isAuthenticated &&
            !hasActiveSubscription &&
            !hasActiveUsagePeriod &&
            lastSubscription
              ? "visible"
              : "hidden"
          }
        >
          <Section
            title="💔 We Miss You!"
            footer={
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[400] }),
                ]}
              >
                {
                  "Ready to create more amazing tattoos? Come back and let's design something incredible together."
                }
              </Text>
            }
          >
            <LabeledContent label="Previous Plan">
              <Text
                modifiers={[
                  font({ weight: "bold" }),
                  foregroundStyle({ type: "color", color: planColor }),
                ]}
              >
                {lastSubscription?.productName || "Unknown"}
              </Text>
            </LabeledContent>
            <LabeledContent label="Status">
              <Text
                modifiers={[
                  font({ weight: "bold" }),
                  foregroundStyle({
                    type: "color",
                    color: getStatusDisplay().color,
                  }),
                ]}
              >
                {getStatusDisplay().text}
              </Text>
            </LabeledContent>
            <Activity
              mode={lastSubscription?.expiresDate ? "visible" : "hidden"}
            >
              <LabeledContent label="Expired On">
                <Text>
                  {lastSubscription?.expiresDate
                    ? new Date(
                        lastSubscription.expiresDate
                      ).toLocaleDateString()
                    : ""}
                </Text>
              </LabeledContent>
            </Activity>
            <FormButton
              title="🎨 Come Back & Create"
              systemImage="sparkles"
              onPress={() => router.push("/(paywall)")}
              color="yellow"
            />
            <FormButton
              title={isRefreshing ? "Refreshing..." : "Refresh data"}
              systemImage="arrow.clockwise"
              onPress={handleRefresh}
            />
          </Section>
        </Activity>

        <Section
          footer={
            isSecretExpanded ? (
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[400] }),
                ]}
              >
                Your feedback helps us improve the app for everyone.
              </Text>
            ) : null
          }
        >
          <DisclosureGroup
            isExpanded={isSecretExpanded}
            onIsExpandedChange={setIsSecretExpanded}
            label="🎁    Enjoying the app?"
            modifiers={[tint("white")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[300] }),
                ]}
              >
                {"We'd love to hear from you!"}
              </Text>

              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[400] }),
                ]}
              >
                {
                  "If you're enjoying Inkigo, a review on the App Store helps other tattoo lovers discover us. You can also reach out anytime with feedback or feature ideas."
                }
              </Text>
            </VStack>

            <FormButton
              title="Rate on App Store"
              systemImage="star.fill"
              onPress={handleRateApp}
              color={"yellow"}
            />
            <FormButton
              title="Send Feedback"
              systemImage="envelope.fill"
              onPress={() => {
                const subject = "Inkigo Feedback";
                const userInfo = user ? `\n\nAccount: ${user.email}` : "";
                const body = `Hi!\n\nI have some feedback about Inkigo:\n\n[Your feedback here]${userInfo}\n\nThanks!`;
                const mailtoUrl = `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;
                Linking.openURL(mailtoUrl);
              }}
              color={Color.zinc[500]}
            />
          </DisclosureGroup>
        </Section>

        <Section>
          <DisclosureGroup
            isExpanded={isArtistExpanded}
            onIsExpandedChange={setIsArtistExpanded}
            label="🎨    Are you an artist?"
            modifiers={[tint("white")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text
                modifiers={[
                  foregroundStyle({ type: "color", color: Color.zinc[300] }),
                ]}
              >
                {
                  "Interested in collaborating? Have suggestions or complaints? We'd love to hear from you!"
                }
              </Text>
            </VStack>

            <FormButton
              title="Write to Us"
              systemImage="envelope.fill"
              onPress={handleArtistContact}
              color={Color.blue[500]}
            />
          </DisclosureGroup>
        </Section>

        <Section title="Support & Feedback">
          <FormButton
            title="Rate App"
            systemImage="star.fill"
            onPress={handleRateApp}
          />
          <FormButton
            title="Share with Friends"
            systemImage="square.and.arrow.up.fill"
            onPress={handleShareApp}
          />
          <FormButton
            title="Contact Support"
            systemImage="envelope.fill"
            onPress={handleContactSupport}
          />
        </Section>

        <Section title="Follow Us">
          <FormButton
            title="inkigo.ai"
            systemImage="globe"
            onPress={() => Linking.openURL("https://inkigo.ai")}
          />
          <FormButton
            title="Instagram"
            systemImage="camera.fill"
            onPress={() =>
              Linking.openURL("https://www.instagram.com/inkigoapp")
            }
          />
          <FormButton
            title="TikTok"
            systemImage="video.fill"
            onPress={() => Linking.openURL("https://www.tiktok.com/@inkigoapp")}
          />
          <FormButton
            title="X"
            systemImage="bubble.left.fill"
            onPress={() => Linking.openURL("https://x.com/inkigoapp")}
          />
        </Section>

        <Section
          title="Settings"
          footer={
            <Text
              modifiers={[
                foregroundStyle({ type: "color", color: Color.zinc[500] }),
              ]}
            >
              {`Version ${Application.nativeApplicationVersion}`}
            </Text>
          }
        >
          <LabeledContent label="Show Onboarding">
            <Toggle
              isOn={!settings.isOnboarded}
              onIsOnChange={() => {
                updateSettings({
                  isOnboarded: !(settings.isOnboarded ?? true),
                });
              }}
            />
          </LabeledContent>
          <LabeledContent label="Prompt Enhancement">
            <Toggle
              isOn={settings.improvePrompt}
              onIsOnChange={() => {
                const newValue = !settings.improvePrompt;
                updateSettings({ improvePrompt: newValue });

                if (!newValue) {
                  // Show info when turning off
                  Alert.alert(
                    "Prompt Enhancement Disabled",
                    "We enhance your prompts to create better tattoo designs. With this off, you have full control but results may vary.\n\nYou can turn it back on anytime.",
                    [{ text: "OK" }]
                  );
                }
              }}
            />
          </LabeledContent>
        </Section>

        <Section title="Legal">
          <FormButton
            title="Privacy Policy"
            systemImage="hand.raised.fill"
            onPress={handlePrivacyPolicy}
          />
          <FormButton
            title="Terms of Service"
            systemImage="doc.text.fill"
            onPress={handleTermsOfService}
          />
        </Section>

        {/* Log out - only for authenticated users */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section>
            <FormButton
              title="Log out"
              systemImage="rectangle.portrait.and.arrow.right.fill"
              onPress={handleSignOut}
            />
          </Section>
        </Activity>

        {/* Danger Zone - only for authenticated users */}
        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
          <Section
            title="Danger Zone"
            footer={
              <Text>
                Deleting your account is permanent and cannot be undone. All
                your data, tattoos, and history will be lost forever. This does
                NOT cancel active subscriptions — cancel in Settings → Apple ID
                → Subscriptions first.
              </Text>
            }
          >
            <FormButton
              title="Delete Account"
              systemImage="exclamationmark.triangle.fill"
              color={Color.zinc[500]}
              onPress={() =>
                Alert.alert(
                  "Delete Account",
                  "Are you sure you want to delete your account? This action cannot be undone, and all your data will be permanently deleted. Note that deleting your account will NOT cancel any active subscriptions. You can manage or cancel your subscriptions at any time from your iCloud settings.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        try {
                          router.dismissAll();

                          // TODO: Delete account, currently people are deleteing and recreating accounts to get free generations. :(
                          // await authClient.deleteUser();

                          await authClient.signOut();
                        } catch (error) {
                          console.error("Error deleting account:", error);
                        }
                      },
                    },
                  ]
                )
              }
            />
          </Section>
        </Activity>
      </Form>
    </Host>
  );
}

// LOG  customerInfo {
//   "allExpirationDates": {
//     "main_ai_tattoo_starter": "2025-10-25T00:16:25Z",
//     "main_ai_tattoo_plus": "2025-10-25T00:13:25Z"
//   },
//   "firstSeenMillis": 1761096272000,
//   "originalAppUserId": "yOOAKM7JU8MdLYE3QgHvZvsKmjY80EKn",
//   "subscriptionsByProductIdentifier": {
//     "main_ai_tattoo_plus": {
//       "productIdentifier": "main_ai_tattoo_plus",
//       "billingIssuesDetectedAt": null,
//       "purchaseDate": "2025-10-25T00:10:25Z",
//       "expiresDate": "2025-10-25T00:13:25Z",
//       "periodType": "NORMAL",
//       "gracePeriodExpiresDate": null,
//       "isActive": false,
//       "isSandbox": true,
//       "willRenew": true,
//       "ownershipType": "PURCHASED",
//       "originalPurchaseDate": "2025-10-22T01:28:55Z",
//       "unsubscribeDetectedAt": null,
//       "storeTransactionId": "2000001042009045",
//       "store": "APP_STORE",
//       "refundedAt": null,
//       "price": {
//         "currency": "USD",
//         "amount": 9.99
//       }
//     },
//     "main_ai_tattoo_starter": {
//       "periodType": "NORMAL",
//       "isActive": false,
//       "ownershipType": "PURCHASED",
//       "storeTransactionId": "2000001042010123",
//       "refundedAt": null,
//       "originalPurchaseDate": "2025-10-22T01:28:55Z",
//       "productIdentifier": "main_ai_tattoo_starter",
//       "willRenew": false,
//       "price": {
//         "currency": "USD",
//         "amount": 4.99
//       },
//       "gracePeriodExpiresDate": null,
//       "purchaseDate": "2025-10-25T00:13:25Z",
//       "store": "APP_STORE",
//       "expiresDate": "2025-10-25T00:16:25Z",
//       "unsubscribeDetectedAt": "2025-10-25T00:12:59Z",
//       "isSandbox": true,
//       "billingIssuesDetectedAt": null
//     }
//   },
//   "latestExpirationDate": "2025-10-25T00:16:25Z",
//   "allExpirationDatesMillis": {
//     "main_ai_tattoo_plus": 1761351205000,
//     "main_ai_tattoo_starter": 1761351385000
//   },
//   "allPurchasedProductIdentifiers": [
//     "main_ai_tattoo_starter",
//     "main_ai_tattoo_plus"
//   ],
//   "originalPurchaseDate": "2013-08-01T07:00:00Z",
//   "originalApplicationVersion": "1.0",
//   "entitlements": {
//     "verification": "NOT_REQUESTED",
//     "active": {},
//     "all": {
//       "Plus": {
//         "store": "APP_STORE",
//         "ownershipType": "PURCHASED",
//         "latestPurchaseDateMillis": 1761351025000,
//         "identifier": "Plus",
//         "productPlanIdentifier": null,
//         "billingIssueDetectedAt": null,
//         "verification": "NOT_REQUESTED",
//         "expirationDateMillis": 1761351205000,
//         "productIdentifier": "main_ai_tattoo_plus",
//         "isActive": false,
//         "willRenew": true,
//         "originalPurchaseDate": "2025-10-22T01:28:55Z",
//         "expirationDate": "2025-10-25T00:13:25Z",
//         "unsubscribeDetectedAtMillis": null,
//         "latestPurchaseDate": "2025-10-25T00:10:25Z",
//         "periodType": "NORMAL",
//         "originalPurchaseDateMillis": 1761096535000,
//         "isSandbox": true,
//         "unsubscribeDetectedAt": null,
//         "billingIssueDetectedAtMillis": null
//       },
//       "Starter": {
//         "productIdentifier": "main_ai_tattoo_starter",
//         "billingIssueDetectedAt": null,
//         "periodType": "NORMAL",
//         "identifier": "Starter",
//         "originalPurchaseDateMillis": 1761096535000,
//         "unsubscribeDetectedAtMillis": 1761351179000,
//         "isActive": false,
//         "store": "APP_STORE",
//         "originalPurchaseDate": "2025-10-22T01:28:55Z",
//         "latestPurchaseDate": "2025-10-25T00:13:25Z",
//         "expirationDateMillis": 1761351385000,
//         "willRenew": false,
//         "unsubscribeDetectedAt": "2025-10-25T00:12:59Z",
//         "ownershipType": "PURCHASED",
//         "billingIssueDetectedAtMillis": null,
//         "verification": "NOT_REQUESTED",
//         "expirationDate": "2025-10-25T00:16:25Z",
//         "isSandbox": true,
//         "productPlanIdentifier": null,
//         "latestPurchaseDateMillis": 1761351205000
//       }
//     }
//   },
//   "allPurchaseDates": {
//     "main_ai_tattoo_starter": "2025-10-25T00:13:25Z",
//     "main_ai_tattoo_plus": "2025-10-25T00:10:25Z"
//   },
//   "nonSubscriptionTransactions": [],
//   "originalPurchaseDateMillis": 1375340400000,
//   "managementURL": null,
//   "firstSeen": "2025-10-22T01:24:32Z",
//   "latestExpirationDateMillis": 1761351385000,
//   "requestDate": "2025-11-03T01:02:27Z",
//   "allPurchaseDatesMillis": {
//     "main_ai_tattoo_plus": 1761351025000,
//     "main_ai_tattoo_starter": 1761351205000
//   },
//   "requestDateMillis": 1762131747000,
//   "activeSubscriptions": []
// }
