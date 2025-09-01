import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import { manageSubscription, presentPaywall } from "@/lib/paywall-utils";
import { cornerRadius, frame } from "@expo/ui/build/swift-ui/modifiers";
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
    isPlusUser,
    isLoading: subscriptionLoading,
    refreshSubscriptionStatus,
  } = useSubscription();
  const [subscriptionExpanded, setSubscriptionExpanded] = useState(false);

  const planText = subscriptionLoading
    ? "LOADING..."
    : isPlusUser
    ? "Usage"
    : "FREE PLAN";

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
        {!isPlusUser ? (
          <>
            <Text size={14} weight="medium">
              Messages Remaining
            </Text>
            <Text size={16} weight="bold" color="#3b82f6">
              47/50
            </Text>
            <Text size={14} weight="medium">
              Tattoo Generations
            </Text>
            <Text size={16} weight="bold" color="#3b82f6">
              3/5
            </Text>
          </>
        ) : (
          <VStack>
            <Text size={16} weight="bold" color="#3b82f6">
              Plus Plan
            </Text>
            <Gauge
              current={{ value: 20 }}
              type="default"
              label={"20 / 30 Tattoo Generations"}
              max={{ value: 30, label: "30" }}
              min={{ value: 0, label: "0" }}
            />
          </VStack>
        )}
      </VStack>

      <DisclosureGroup
        onStateChange={setSubscriptionExpanded}
        isExpanded={subscriptionExpanded}
        label="Subscription Settings"
      >
        {isPlusUser ? (
          <Button onPress={handleManageSubscription}>
            Manage Subscription
          </Button>
        ) : (
          <Button onPress={handleUpgradeToPlus}>Upgrade to Plus</Button>
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
