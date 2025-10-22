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
import { useState } from "react";
import { Linking, Share, View } from "react-native";

export function Profile() {
  const { user } = useUserData();
  const { refreshSubscriptionStatus } = useSubscription();
  const {
    used,
    limit,
    remaining,
    isLimitReached,
    subscriptionTier,
    planDisplayName,
    planColor,
    usagePercentage,
    periodStart,
    periodEnd,
    refetch: refetchUsage,
  } = useUsageLimit();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

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
        "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017?action=write-review"
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
        url: "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017",
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

  const handleSignOut = () => {
    authClient.signOut();
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

        <Section title="Plan & Usage">
          <LabeledContent label="Current Plan">
            <Text weight="bold" color={planColor}>
              {planDisplayName}
            </Text>
          </LabeledContent>
          <LabeledContent label="Usage This Period">
            <Text weight="bold" color={isLimitReached ? "#ef4444" : planColor}>
              {`${used} / ${limit}`}
            </Text>
          </LabeledContent>
          <LabeledContent label="Remaining">
            <Text weight="bold" color={remaining <= 5 ? "#f59e0b" : "#10b981"}>
              {`${remaining} generations`}
            </Text>
          </LabeledContent>
          <LabeledContent label="Usage Percentage">
            <Text>{`${usagePercentage}%`}</Text>
          </LabeledContent>
          <LabeledContent label="Billing Period">
            <Text>
              {`${
                periodStart ? new Date(periodStart).toLocaleDateString() : "N/A"
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
              modifiers={[foregroundStyle({ type: "color", color: "white" })]}
            >
              {subscriptionTier === "free" ? "Upgrade Plan" : "Change Plan"}
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
      </List>
    </Host>
  );
}
