import { Color } from "@/constants/TWPalette";
import { getLastSubscription } from "@/context/SubscriptionContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { useUserData } from "@/hooks/useUserData";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Host,
  HStack,
  LabeledContent,
  List,
  Section,
  Text,
} from "@expo/ui/swift-ui";
import { foregroundStyle } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Linking, Share, View } from "react-native";

export function Profile() {
  const { user } = useUserData();
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
      const subject = "AI Tattoo App Support Request";
      const body = `Hi,\n\nI need help with the AI Tattoo app.\n\nUser ID: ${user?.id}\nEmail: ${user?.email}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
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
          "Check out AI Tattoo - the amazing app for creating custom tattoo designs with AI! Download it now on the App Store.",
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

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Not signed in</Text>
      </View>
    );
  }

  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  return (
    <Host style={{ flex: 1 }}>
      <List listStyle="automatic">
        <Section title="Account">
          <LabeledContent label="Name">
            <Text>{displayName}</Text>
          </LabeledContent>
          <LabeledContent label="Email">
            <Text>{user.email}</Text>
          </LabeledContent>
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
          >
            <LabeledContent label="Plan">
              <Text weight="bold" color={planColor}>
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
            <LabeledContent label="Usage This Period">
              <Text
                weight="bold"
                color={isLimitReached ? "#ef4444" : planColor}
              >
                {`${used} / ${limit}`}
              </Text>
            </LabeledContent>
            <LabeledContent label="Remaining">
              <Text
                weight="bold"
                color={remaining <= 5 ? Color.yellow[500] : Color.green[500]}
              >
                {`${remaining} generations`}
              </Text>
            </LabeledContent>
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
                    lastSubscription.unsubscribeDetectedAt ? "bold" : "regular"
                  }
                >
                  {new Date(lastSubscription.expiresDate).toLocaleDateString()}
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
                        ? Color.yellow[500]
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
            <HStack>
              <Button
                variant="borderless"
                systemImage="arrow.up.circle"
                onPress={() => router.push("/(paywall)")}
                modifiers={[
                  foregroundStyle({
                    type: "color",
                    color: hasActiveSubscription ? "white" : Color.yellow[500],
                  }),
                ]}
              >
                {hasActiveSubscription ? "Change Plan" : "Upgrade Plan"}
              </Button>
            </HStack>
            <HStack>
              <Button
                variant="borderless"
                systemImage="arrow.clockwise"
                onPress={handleRefresh}
                modifiers={[foregroundStyle({ type: "color", color: "white" })]}
              >
                {isRefreshing ? "Refreshing..." : "Refresh data"}
              </Button>
            </HStack>
          </Section>
        )}

        {!hasActiveSubscription &&
          !hasActiveUsagePeriod &&
          lastSubscription && (
            <Section title="Last Subscription">
              <LabeledContent label="Plan">
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
              {lastSubscription.daysSinceExpired !== null &&
                lastSubscription.daysSinceExpired > 0 && (
                  <LabeledContent label="Expired">
                    <Text weight="bold" color={Color.red[500]}>
                      {`${lastSubscription.daysSinceExpired} days ago`}
                    </Text>
                  </LabeledContent>
                )}
              <LabeledContent label="Auto-Renew">
                <Text
                  color={
                    lastSubscription.willRenew
                      ? Color.green[500]
                      : Color.red[500]
                  }
                >
                  {lastSubscription.willRenew ? "Was On" : "Was Off"}
                </Text>
              </LabeledContent>
              {lastSubscription.price && (
                <LabeledContent label="Price">
                  <Text>
                    {`${lastSubscription.price.currency} $${lastSubscription.price.amount}`}
                  </Text>
                </LabeledContent>
              )}
              {lastSubscription.unsubscribeDetectedAt && (
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
              <HStack>
                <Button
                  variant="borderless"
                  systemImage="arrow.up.circle"
                  onPress={() => router.push("/(paywall)")}
                  modifiers={[
                    foregroundStyle({ type: "color", color: "white" }),
                  ]}
                >
                  Subscribe Again
                </Button>
              </HStack>
              <HStack>
                <Button
                  variant="borderless"
                  systemImage="arrow.clockwise"
                  onPress={handleRefresh}
                  modifiers={[
                    foregroundStyle({ type: "color", color: "white" }),
                  ]}
                >
                  {isRefreshing ? "Refreshing..." : "Refresh data"}
                </Button>
              </HStack>
            </Section>
          )}

        <Section title="Support & Feedback">
          <HStack>
            <Button
              variant="borderless"
              systemImage="star"
              onPress={handleRateApp}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Rate App
            </Button>
          </HStack>
          <HStack>
            <Button
              variant="borderless"
              systemImage="square.and.arrow.up"
              onPress={handleShareApp}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Share with Friends
            </Button>
          </HStack>
          <HStack>
            <Button
              variant="borderless"
              systemImage="arrow.up.forward.square"
              onPress={handleContactSupport}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Contact Support
            </Button>
          </HStack>
        </Section>

        <Section title="Legal">
          <HStack>
            <Button
              variant="borderless"
              systemImage="hand.raised"
              onPress={handlePrivacyPolicy}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Privacy Policy
            </Button>
          </HStack>
          <HStack>
            <Button
              variant="borderless"
              systemImage="doc.plaintext"
              onPress={handleTermsOfService}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Terms of Service
            </Button>
          </HStack>
        </Section>

        <Section>
          <HStack>
            <Button
              variant="borderless"
              systemImage="rectangle.portrait.and.arrow.right"
              onPress={handleSignOut}
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              Log out
            </Button>
          </HStack>
        </Section>

        <Section title="Danger Zone">
          <HStack>
            <Button
              variant="borderless"
              color="gray"
              systemImage="exclamationmark.triangle"
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
                          await authClient.deleteUser();
                        } catch (error) {
                          console.error("Error deleting account:", error);
                        }
                      },
                    },
                  ]
                )
              }
              modifiers={[foregroundStyle({ type: "color", color: "gray" })]}
            >
              Delete Account
            </Button>
          </HStack>
        </Section>
      </List>
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
