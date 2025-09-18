import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import { manageSubscription, presentPaywall } from "@/lib/paywall-utils";
import {
  Button,
  DisclosureGroup,
  Form,
  Gauge,
  Host,
  HStack,
  Section,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { cornerRadius, frame } from "@expo/ui/swift-ui/modifiers";
import { Image as ExpoImage } from "expo-image";
import { useState } from "react";
import { Alert } from "react-native";

function ProfileSection() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [profileExpanded, setProfileExpanded] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = () => {
    authClient.signOut();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is irreversible and will permanently remove all your data, including your tattoo designs and account information.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: async () => {
            try {
              await authClient.deleteUser();
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again or contact support."
              );
            }
          },
        },
      ]
    );
  };

  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  if (!user) {
    return (
      <Section>
        <Text size={16}>Not signed in</Text>
      </Section>
    );
  }

  return (
    <Section>
      <HStack spacing={16}>
        <HStack
          modifiers={[frame({ width: 80, height: 80 }), cornerRadius(40)]}
        >
          {user.image ? (
            <ExpoImage
              source={{ uri: user.image }}
              style={{ width: 80, height: 80 }}
              contentFit="cover"
            />
          ) : (
            <Text size={24} weight="bold">
              {getInitials(user.name)}
            </Text>
          )}
        </HStack>

        <VStack alignment="leading" spacing={4}>
          <Text size={22} weight="bold">
            {displayName}
          </Text>
          <Text size={16}>{user.email}</Text>
        </VStack>
      </HStack>

      <DisclosureGroup
        onStateChange={setProfileExpanded}
        isExpanded={profileExpanded}
        label="Profile Settings"
      >
        <Button onPress={handleSignOut}>Sign Out</Button>

        <Button role="destructive" onPress={handleDeleteAccount}>
          Delete Account
        </Button>
      </DisclosureGroup>
    </Section>
  );
}

function CurrentPlanSection() {
  const {
    subscriptionTier,
    isLoading: subscriptionLoading,
    refreshSubscriptionStatus,
  } = useSubscription();
  const [subscriptionExpanded, setSubscriptionExpanded] = useState(false);

  const planText = subscriptionLoading
    ? "LOADING..."
    : subscriptionTier.toUpperCase() + " PLAN";

  const handleUpgradeToPlus = async () => {
    try {
      const success = await presentPaywall();
      if (success) {
        await refreshSubscriptionStatus();
        Alert.alert(
          "Welcome to Plus! 🎉",
          "You now have access to all Plus features including unlimited generations and priority support.",
          [{ text: "Awesome!", style: "default" }]
        );
      }
    } catch (error) {
      console.error("Error presenting paywall:", error);
      Alert.alert(
        "Error",
        "Something went wrong. Please try again or contact support if the issue persists.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  const handleManageSubscription = async () => {
    await manageSubscription();
  };

  return (
    <Section title={planText}>
      <VStack spacing={12} alignment="leading">
        {/* Subscription Tier Display */}
        <HStack spacing={8}>
          <Text size={14} weight="medium" color="#6b7280">
            Current Plan:
          </Text>
          <Text
            size={16}
            weight="bold"
            color={
              subscriptionTier === "plus"
                ? "#10b981"
                : subscriptionTier === "pro"
                ? "#3b82f6"
                : subscriptionTier === "starter"
                ? "#f59e0b"
                : "#6b7280"
            }
          >
            {subscriptionTier.charAt(0).toUpperCase() +
              subscriptionTier.slice(1)}
          </Text>
        </HStack>

        {/* Generation Usage Display */}
        {subscriptionTier === "free" ? (
          <>
            <Text size={14} weight="medium" color="#6b7280">
              Free Plan Generations
            </Text>
            <Text size={16} weight="bold" color="#3b82f6">
              3/5 remaining
            </Text>
            <Text size={12} color="#6b7280">
              Upgrade to get more generations
            </Text>
          </>
        ) : (
          <VStack spacing={8}>
            {/* Subscription Plan Status */}
            <Text
              size={16}
              weight="bold"
              color={
                subscriptionTier === "plus"
                  ? "#10b981"
                  : subscriptionTier === "pro"
                  ? "#3b82f6"
                  : "#f59e0b"
              }
            >
              {`${
                subscriptionTier.charAt(0).toUpperCase() +
                subscriptionTier.slice(1)
              } Plan Active`}
            </Text>

            {/* Generation Gauge based on subscription tier */}
            {subscriptionTier === "starter" && (
              <Gauge
                current={{ value: 75 }}
                type="default"
                label={"75 / 125 Generations"}
                max={{ value: 125, label: "125" }}
                min={{ value: 0, label: "0" }}
              />
            )}

            {subscriptionTier === "plus" && (
              <Gauge
                current={{ value: 180 }}
                type="default"
                label={"180 / 300 Generations"}
                max={{ value: 300, label: "300" }}
                min={{ value: 0, label: "0" }}
              />
            )}

            {subscriptionTier === "pro" && (
              <Gauge
                current={{ value: 650 }}
                type="default"
                label={"650 / 1,000 Generations"}
                max={{ value: 1000, label: "1,000" }}
                min={{ value: 0, label: "0" }}
              />
            )}

            {/* Pricing Information */}
            <VStack spacing={4} alignment="leading">
              <Text size={12} color="#6b7280">
                Plan Details:
              </Text>
              {subscriptionTier === "starter" && (
                <>
                  <Text size={12} color="#6b7280">
                    • $4.99/month
                  </Text>
                  <Text size={12} color="#6b7280">
                    • 125 generations per month
                  </Text>
                </>
              )}
              {subscriptionTier === "plus" && (
                <>
                  <Text size={12} color="#6b7280">
                    • $9.99/month
                  </Text>
                  <Text size={12} color="#6b7280">
                    • 300 generations per month
                  </Text>
                </>
              )}
              {subscriptionTier === "pro" && (
                <>
                  <Text size={12} color="#6b7280">
                    • $29.99/month
                  </Text>
                  <Text size={12} color="#6b7280">
                    • 1,000 generations per month
                  </Text>
                </>
              )}
            </VStack>
          </VStack>
        )}
      </VStack>

      <DisclosureGroup
        onStateChange={setSubscriptionExpanded}
        isExpanded={subscriptionExpanded}
        label="Subscription Settings"
      >
        {subscriptionTier !== "free" ? (
          <Button onPress={handleManageSubscription}>
            Manage Subscription
          </Button>
        ) : (
          <Button onPress={handleUpgradeToPlus}>
            {subscriptionTier === "free"
              ? "Upgrade to Starter"
              : "Upgrade Plan"}
          </Button>
        )}
      </DisclosureGroup>
    </Section>
  );
}

export function Profile() {
  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <ProfileSection />
        <CurrentPlanSection />
      </Form>
    </Host>
  );
}
