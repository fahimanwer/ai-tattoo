import { useSubscription } from "@/hooks/useSubscription";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { authClient } from "@/lib/auth-client";
import {
  manageSubscription,
  presentPaywall,
  presentUpgradePaywall,
} from "@/lib/paywall-utils";
import { getAvailableUpgrades } from "@/lib/subscription-utils";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [upgradeOptions, setUpgradeOptions] = useState<string[]>([]);

  const {
    subscriptionTier,
    isLoading: subscriptionLoading,
    refreshSubscriptionStatus,
  } = useSubscription();

  // Usage data for free plan
  const { limit, remaining, isLimitReached } = useUsageLimit();

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

  const handleUpgradeToTier = async (targetTier: string) => {
    try {
      const success = await presentUpgradePaywall(targetTier as any);
      if (success) {
        await refreshSubscriptionStatus();
        Alert.alert(
          `Welcome to ${targetTier.toUpperCase()}! 🎉`,
          `You now have access to all ${targetTier} features.`,
          [{ text: "Awesome!", style: "default" }]
        );
      }
    } catch (error) {
      console.error("Error presenting upgrade paywall:", error);
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

  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  const planText = subscriptionLoading
    ? "LOADING..."
    : subscriptionTier.toUpperCase() + " PLAN";

  // Get available upgrade options
  React.useEffect(() => {
    if (!subscriptionLoading) {
      const upgrades = getAvailableUpgrades(subscriptionTier);
      setUpgradeOptions(upgrades);
    }
  }, [subscriptionTier, subscriptionLoading]);

  // React Query automatically fetches data when needed
  // No manual refetch required

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
        <Text style={{ fontSize: 16 }}>Not signed in</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {/* Profile Section */}
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {displayName}
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
            {user.email}
          </Text>

          <TouchableOpacity
            onPress={() => authClient.signOut()}
            style={{
              backgroundColor: "#007AFF",
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text
              style={{ color: "white", textAlign: "center", fontWeight: "600" }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Current Plan Section */}
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            {planText}
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
              Current Plan:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color:
                  subscriptionTier === "plus"
                    ? "#10b981"
                    : subscriptionTier === "pro"
                    ? "#3b82f6"
                    : subscriptionTier === "starter"
                    ? "#f59e0b"
                    : "#6b7280",
              }}
            >
              {subscriptionTier.charAt(0).toUpperCase() +
                subscriptionTier.slice(1)}
            </Text>
          </View>

          {/* Generation Usage Display */}
          {subscriptionTier === "free" ? (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                Free Plan Generations
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isLimitReached ? "#ef4444" : "#3b82f6",
                }}
              >
                {`${remaining}/${limit} remaining`}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isLimitReached ? "#ef4444" : "#666",
                  marginTop: 4,
                }}
              >
                {isLimitReached
                  ? "Monthly limit reached. Upgrade to get more generations."
                  : "Upgrade to get more generations"}
              </Text>
            </View>
          ) : (
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:
                    subscriptionTier === "plus"
                      ? "#10b981"
                      : subscriptionTier === "pro"
                      ? "#3b82f6"
                      : "#f59e0b",
                  marginBottom: 8,
                }}
              >
                {`${
                  subscriptionTier.charAt(0).toUpperCase() +
                  subscriptionTier.slice(1)
                } Plan Active`}
              </Text>

              {/* Plan Details */}
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                  Plan Details:
                </Text>
                {subscriptionTier === "starter" && (
                  <>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • $4.99/month
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • 125 generations per month
                    </Text>
                  </>
                )}
                {subscriptionTier === "plus" && (
                  <>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • $9.99/month
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • 300 generations per month
                    </Text>
                  </>
                )}
                {subscriptionTier === "pro" && (
                  <>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • $29.99/month
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      • 1,000 generations per month
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}

          {/* Subscription Actions */}
          <View>
            {subscriptionTier !== "free" ? (
              <TouchableOpacity
                onPress={handleManageSubscription}
                style={{
                  backgroundColor: "#007AFF",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Subscription
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleUpgradeToPlus}
                style={{
                  backgroundColor: "#007AFF",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Upgrade to Starter
                </Text>
              </TouchableOpacity>
            )}

            {/* Upgrade Options */}
            {upgradeOptions.length > 0 && (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#666",
                    fontWeight: "600",
                    marginBottom: 8,
                  }}
                >
                  Upgrade Options:
                </Text>
                {upgradeOptions.map((tier) => (
                  <TouchableOpacity
                    key={tier}
                    onPress={() => handleUpgradeToTier(tier)}
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#333",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
