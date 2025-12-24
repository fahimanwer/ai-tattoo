import { authClient } from "@/lib/auth-client";
import { NANOBANANA, NANOBANANA_PRO } from "@/server-utils/constants";
import { Color } from "@/src/constants/TWPalette";
import { AppSettingsContext } from "@/src/context/AppSettings";
import { getLastSubscription } from "@/src/context/SubscriptionContext";
import { useSubscription } from "@/src/hooks/useSubscription";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import { useUserData } from "@/src/hooks/useUserData";
import {
  Button,
  DisclosureGroup,
  Form,
  Host,
  HStack,
  Label,
  LabeledContent,
  Progress,
  Section,
  Switch,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { font, foregroundStyle, tint } from "@expo/ui/swift-ui/modifiers";
import * as Application from "expo-application";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { use, useMemo, useState } from "react";
import { Alert, Linking, Share } from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";

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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      modifiers={[foregroundStyle({ type: "color", color })]}
    >
      <Label title={title} systemImage={systemImage} />
    </Button>
  );
}

export function Profile() {
  const { user } = useUserData();
  const { settings, updateSettings } = use(AppSettingsContext);

  const { refreshSubscriptionStatus, customerInfo } = useSubscription();
  const {
    used,
    limit,
    remaining,
    isLimitReached,
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
      const subject = "Inkigo App Support Request";
      const body = `Hi,\n\nI need help with the Inkigo app.\n\nUser ID: ${user?.id}\nEmail: ${user?.email}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
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
      const subject = "Are you an artist? - Inkigo";
      const body = `Hi!\n\nI'm interested in collaborating or have suggestions/complaints.\n\nMy account email: ${user?.email}\nMy user ID: ${user?.id}\n\n[Please share your suggestions, complaints, or tell us about yourself as an artist]\n\nThanks!`;
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
        message:
          "Check out Inkigo - the amazing app for creating custom tattoo designs with AI! Download it now on the App Store.",
        url: "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193",
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
      router.back();
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

  if (!user) {
    return (
      <Host
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Not signed in</Text>
      </Host>
    );
  }

  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section title="Account">
          <LabeledContent label="Name">
            <Text>{displayName}</Text>
          </LabeledContent>
          <LabeledContent label="Email">
            <Text>{user.email}</Text>
          </LabeledContent>
          <LabeledContent label="Plan">
            <HStack spacing={6}>
              <Label systemImage={planBadge.icon} />
              <Text
                color={planBadge.color}
                modifiers={[font({ weight: "bold" })]}
              >
                {planBadge.name}
              </Text>
            </HStack>
          </LabeledContent>
          <LabeledContent label="Model">
            <Text>{modelDisplayName}</Text>
          </LabeledContent>
          {memberSince && (
            <LabeledContent label="Member Since">
              <Text color={Color.zinc[400]}>{memberSince}</Text>
            </LabeledContent>
          )}
        </Section>

        {(hasActiveSubscription || hasActiveUsagePeriod) && (
          <Section
            title={
              hasActiveSubscription
                ? lastSubscription?.unsubscribeDetectedAt
                  ? "Active Until Expiration"
                  : "Plan & Usage"
                : "Active Usage Period"
            }
            footer={
              <Text color={remaining <= 5 ? "yellow" : Color.zinc[400]}>
                {`${remaining} generations remaining`}
              </Text>
            }
          >
            <HStack spacing={16}>
              <Progress
                progress={remaining / limit}
                variant="linear"
                color={
                  remaining < 4
                    ? "yellow"
                    : remaining < 8
                    ? "orange"
                    : Color.green[500]
                }
              />
              <Text
                modifiers={[font({ weight: "bold" })]}
                color={isLimitReached ? "#ef4444" : planColor}
              >
                {`${used} / ${limit} gens`}
              </Text>
            </HStack>
            <FormButton
              title={hasActiveSubscription ? "Change Plan" : "Upgrade Plan"}
              systemImage="arrow.up.circle.fill"
              onPress={() => router.push("/(paywall)")}
              color={hasActiveSubscription ? "white" : "yellow"}
            />
            <FormButton
              title={isRefreshing ? "Refreshing..." : "Refresh data"}
              systemImage="arrow.clockwise.circle.fill"
              onPress={handleRefresh}
            />
            <DisclosureGroup
              isExpanded={isPlanDetailsExpanded}
              onStateChange={setIsPlanDetailsExpanded}
              label="Plan Details"
              modifiers={[tint("white")]}
            >
              <LabeledContent label="Plan">
                <Text modifiers={[font({ weight: "bold" })]} color={planColor}>
                  {hasActiveSubscription && lastSubscription
                    ? lastSubscription.productName || "Unknown"
                    : "Free"}
                </Text>
              </LabeledContent>
              {hasActiveSubscription && lastSubscription && (
                <LabeledContent label="Status">
                  <Text weight="bold" color={getStatusDisplay().color}>
                    {lastSubscription.unsubscribeDetectedAt
                      ? "Cancelled (Active Until Expiration)"
                      : getStatusDisplay().text}
                  </Text>
                </LabeledContent>
              )}
              {hasActiveSubscription && lastSubscription?.expiresDate && (
                <LabeledContent
                  label={
                    lastSubscription.unsubscribeDetectedAt
                      ? "Access Ends On"
                      : lastSubscription.willRenew
                      ? "Renews On"
                      : "Expires On"
                  }
                >
                  <Text
                    weight={
                      lastSubscription.unsubscribeDetectedAt
                        ? "bold"
                        : "regular"
                    }
                  >
                    {new Date(
                      lastSubscription.expiresDate
                    ).toLocaleDateString()}
                  </Text>
                </LabeledContent>
              )}
              {hasActiveSubscription &&
                lastSubscription &&
                lastSubscription.daysRemaining !== null &&
                lastSubscription.daysRemaining > 0 && (
                  <LabeledContent label="Days Remaining">
                    <Text
                      weight="bold"
                      color={
                        lastSubscription.daysRemaining <= 3
                          ? "yellow"
                          : Color.green[500]
                      }
                    >
                      {`${lastSubscription.daysRemaining} days`}
                    </Text>
                  </LabeledContent>
                )}
              {hasActiveSubscription && lastSubscription && (
                <LabeledContent label="Auto-Renew">
                  <Text
                    color={
                      lastSubscription.willRenew
                        ? Color.green[500]
                        : Color.red[500]
                    }
                  >
                    {lastSubscription.willRenew ? "On" : "Off"}
                  </Text>
                </LabeledContent>
              )}
              {hasActiveSubscription &&
                lastSubscription?.unsubscribeDetectedAt && (
                  <LabeledContent label="Cancelled At">
                    <Text weight="bold" color={Color.yellow[500]}>
                      {new Date(
                        lastSubscription.unsubscribeDetectedAt
                      ).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  </LabeledContent>
                )}
              {hasActiveSubscription && lastSubscription?.price && (
                <LabeledContent label="Price">
                  <Text>
                    {`${lastSubscription.price.currency} $${lastSubscription.price.amount}`}
                  </Text>
                </LabeledContent>
              )}
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
        )}

        {!hasActiveSubscription &&
          !hasActiveUsagePeriod &&
          lastSubscription && (
            <Section
              title="💔 We Miss You!"
              footer={
                <Text color={Color.zinc[400]}>
                  {
                    "Ready to create more amazing tattoos? Come back and let's design something incredible together."
                  }
                </Text>
              }
            >
              <LabeledContent label="Previous Plan">
                <Text weight="bold" color={planColor}>
                  {lastSubscription.productName || "Unknown"}
                </Text>
              </LabeledContent>
              <LabeledContent label="Status">
                <Text weight="bold" color={getStatusDisplay().color}>
                  {getStatusDisplay().text}
                </Text>
              </LabeledContent>
              {lastSubscription.expiresDate && (
                <LabeledContent label="Expired On">
                  <Text>
                    {new Date(
                      lastSubscription.expiresDate
                    ).toLocaleDateString()}
                  </Text>
                </LabeledContent>
              )}
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
          )}

        <Section
          footer={
            isSecretExpanded ? (
              <Text color={Color.zinc[400]}>
                Your feedback helps us improve the app for everyone.
              </Text>
            ) : null
          }
        >
          <DisclosureGroup
            isExpanded={isSecretExpanded}
            onStateChange={setIsSecretExpanded}
            label="🎁    Enjoying the app?"
            modifiers={[tint("white")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text color={Color.zinc[300]}>
                {"We'd love to hear from you!"}
              </Text>

              <Text color={Color.zinc[400]}>
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
                const body = `Hi!\n\nI have some feedback about Inkigo:\n\n[Your feedback here]\n\nThanks!`;
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
            onStateChange={setIsArtistExpanded}
            label="🎨    Are you an artist?"
            modifiers={[tint("white")]}
          >
            <VStack spacing={16} alignment="leading">
              <Text color={Color.zinc[300]}>
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
            title="@trytattooapp on X"
            systemImage="bubble.left.fill"
            onPress={() => Linking.openURL("https://x.com/trytattooapp")}
          />
          <FormButton
            title="trytattooapp.ai"
            systemImage="globe"
            onPress={() => Linking.openURL("https://trytattooapp.ai")}
          />
        </Section>

        <Section
          title="Settings"
          footer={
            <Text color={Color.zinc[500]}>
              {`Version ${Application.nativeApplicationVersion}`}
            </Text>
          }
        >
          <LabeledContent label="Show Onboarding">
            <Switch
              value={!settings.isOnboarded}
              onValueChange={() =>
                updateSettings({
                  isOnboarded: !(settings.isOnboarded ?? true),
                })
              }
            />
          </LabeledContent>
          <LabeledContent label="Prompt Enhancement">
            <Switch
              key={settings.improvePrompt ? "on" : "off"}
              value={settings.improvePrompt}
              onValueChange={() => {
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

        <Section>
          <FormButton
            title="Log out"
            systemImage="rectangle.portrait.and.arrow.right.fill"
            onPress={handleSignOut}
          />
        </Section>

        <Section
          title="Danger Zone"
          footer={
            <Text>
              Deleting your account is permanent and cannot be undone. All your
              data, tattoos, and history will be lost forever. This does NOT
              cancel active subscriptions — cancel in Settings → Apple ID →
              Subscriptions first.
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
