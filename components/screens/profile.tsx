import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import { manageSubscription, presentPaywall } from "@/lib/paywall-utils";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from "react-native";

export function Profile() {
  const { data: session } = authClient.useSession();
  const {
    isPlusUser,
    isLoading: subscriptionLoading,
    refreshSubscriptionStatus,
  } = useSubscription();

  const user = session?.user;

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

  const handleRate = async () => {
    try {
      await Linking.openURL(
        "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017?action=write-review"
      );
    } catch (error) {
      console.error("Error opening App Store:", error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out AI Tattoo - the amazing app for creating custom tattoo designs with AI! Download it now on the App Store.",
        url: "https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017", // You can update this URL later
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
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
              // User will be automatically signed out after account deletion
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

  const handlePrivacyPolicy = async () => {
    try {
      await Linking.openURL("https://tattoaiapp.com/privacy-policy");
    } catch (error) {
      console.error("Error opening privacy policy:", error);
    }
  };

  const handleTermsOfService = async () => {
    try {
      await Linking.openURL("https://tattoaiapp.com/terms-of-service");
    } catch (error) {
      console.error("Error opening terms of service:", error);
    }
  };

  const handleUpgradeToPlus = async () => {
    try {
      const success = await presentPaywall();

      if (success) {
        // Refresh subscription status after successful purchase/restore
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

  if (!user) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.subcontainer}>
          <Text type="subtitle" weight="bold">
            Not signed in
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.subcontainer}>
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text type="title" weight="bold" style={styles.avatarText}>
                  {getInitials(user.name)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text type="title" weight="bold">
              {(user.name?.includes("@")
                ? user.name.slice(0, user.name.indexOf("@"))
                : user.name) || "Unknown User"}
            </Text>
            <Text type="body" style={styles.emailText}>
              {user.email}
            </Text>
          </View>
        </View>

        {/* Subscription Plan Section */}
        <View style={styles.section}>
          <Text type="subtitle" weight="bold" style={styles.sectionTitle}>
            AI Tattoo Plus Plan
          </Text>
          <View style={[styles.planCard, isPlusUser && styles.proUserCard]}>
            <View style={styles.planHeader}>
              <View style={[styles.planBadge, isPlusUser && styles.proBadge]}>
                <Text
                  type="caption"
                  weight="bold"
                  style={[
                    styles.planBadgeText,
                    isPlusUser && styles.proBadgeText,
                  ]}
                >
                  {subscriptionLoading
                    ? "LOADING..."
                    : isPlusUser
                    ? "PLUS PLAN"
                    : "FREE PLAN"}
                </Text>
              </View>
              <Text type="lg" weight="bold">
                Current Plan
              </Text>
            </View>

            {!isPlusUser && (
              <View style={styles.usageStats}>
                <View style={styles.usageStat}>
                  <Text type="default" weight="medium">
                    Messages Remaining
                  </Text>
                  <Text type="lg" weight="bold" style={styles.usageNumber}>
                    47/50
                  </Text>
                </View>
                <View style={styles.usageStat}>
                  <Text type="default" weight="medium">
                    Tattoo Generations
                  </Text>
                  <Text type="lg" weight="bold" style={styles.usageNumber}>
                    3/5
                  </Text>
                </View>
              </View>
            )}

            {isPlusUser && (
              <View style={styles.usageStats}>
                <View style={styles.usageStat}>
                  <Text type="default" weight="medium">
                    Messages
                  </Text>
                  <Text
                    type="lg"
                    weight="bold"
                    style={[styles.usageNumber, styles.unlimitedText]}
                  >
                    ∞ Unlimited
                  </Text>
                </View>
                <View style={styles.usageStat}>
                  <Text type="default" weight="medium">
                    Tattoo Generations
                  </Text>
                  <Text
                    type="lg"
                    weight="bold"
                    style={[styles.usageNumber, styles.unlimitedText]}
                  >
                    ∞ Unlimited
                  </Text>
                </View>
              </View>
            )}

            {!isPlusUser && (
              <View style={styles.upgradeSection}>
                <Text type="sm" style={styles.upgradeText}>
                  Upgrade to Plus for unlimited generations, priority support,
                  and exclusive features.
                </Text>
                <Button
                  variant="solid"
                  color="blue"
                  title="Try Plus Free"
                  symbol="crown.fill"
                  onPress={handleUpgradeToPlus}
                  haptic={true}
                  hapticStyle="light"
                  size="sm"
                />
              </View>
            )}

            {isPlusUser && (
              <View style={styles.upgradeSection}>
                <Text
                  type="sm"
                  style={[styles.upgradeText, styles.proUserText]}
                >
                  🎉 You have full access to all Plus features! Thank you for
                  your support.
                </Text>
                <Button
                  variant="outline"
                  color="blue"
                  title="Manage Subscription"
                  symbol="gear"
                  onPress={handleManageSubscription}
                  haptic={true}
                  hapticStyle="light"
                  size="sm"
                />
              </View>
            )}
          </View>
        </View>

        {/* Account Information Section */}
        <View style={styles.section}>
          <Text type="subtitle" weight="bold" style={styles.sectionTitle}>
            Account Information
          </Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingsRow}>
              <Text type="xs" weight="light" style={styles.userIdLabel}>
                User ID
              </Text>
              <Text type="xs" style={styles.userIdValue}>
                {user.id}
              </Text>
            </View>
            <View style={styles.settingsRow}>
              <Text type="default" weight="medium">
                Name
              </Text>
              <Text type="default" style={styles.settingsValue}>
                {user.name || "Not provided"}
              </Text>
            </View>
            <View style={styles.settingsRow}>
              <Text type="default" weight="medium">
                Email
              </Text>
              <Text type="default" style={styles.settingsValue}>
                {user.email}
              </Text>
            </View>
            <View style={styles.settingsRow}>
              <Text type="default" weight="medium">
                Email Verified
              </Text>
              <Text type="default" style={styles.settingsValue}>
                {user.emailVerified ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.settingsRow}>
              <Text type="default" weight="medium">
                Account Created
              </Text>
              <Text type="default" style={styles.settingsValue}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text type="subtitle" weight="bold" style={styles.sectionTitle}>
            Actions
          </Text>
          <View style={styles.actionsContainer}>
            <Button
              variant="outline"
              color="blue"
              title="Contact Support"
              symbol="envelope"
              onPress={handleContactSupport}
              haptic={true}
              hapticStyle="light"
            />
            <Button
              variant="outline"
              color="amber"
              title="Rate App"
              symbol="star"
              onPress={handleRate}
              haptic={true}
              hapticStyle="light"
            />
            <Button
              variant="outline"
              color="green"
              title="Share with Friends"
              symbol="square.and.arrow.up"
              onPress={handleShare}
              haptic={true}
              hapticStyle="light"
            />
            <Button
              variant="soft"
              color="red"
              title="Sign Out"
              symbol="arrow.right.square"
              onPress={handleSignOut}
              haptic={true}
              hapticStyle="medium"
            />
          </View>
        </View>

        {/* Legal Links */}
        <View style={styles.legalSection}>
          <View style={styles.legalLinks}>
            <Text
              type="xs"
              style={styles.legalLink}
              onPress={handlePrivacyPolicy}
            >
              Privacy Policy
            </Text>
            <Text type="xs" style={styles.legalSeparator}>
              •
            </Text>
            <Text
              type="xs"
              style={styles.legalLink}
              onPress={handleTermsOfService}
            >
              Terms of Service
            </Text>
          </View>
        </View>

        {/* Delete Account - Hidden at the bottom */}
        <View style={styles.dangerZone}>
          <Text
            type="xs"
            weight="light"
            style={styles.deleteAccountLink}
            onPress={handleDeleteAccount}
          >
            Delete Account
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 32,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#6B7280",
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  emailText: {
    opacity: 0.7,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  settingsGroup: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  proUserCard: {
    backgroundColor: "rgba(34, 197, 94, 0.08)",
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  planBadgeText: {
    color: "#16a34a",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  proBadge: {
    backgroundColor: "rgba(168, 85, 247, 0.15)",
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  proBadgeText: {
    color: "#a855f7",
  },
  usageStats: {
    gap: 12,
  },
  usageStat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usageNumber: {
    color: "#3b82f6",
  },
  upgradeSection: {
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(59, 130, 246, 0.15)",
  },
  upgradeText: {
    opacity: 0.8,
    lineHeight: 18,
  },
  unlimitedText: {
    color: "#16a34a",
  },
  proUserText: {
    color: "#16a34a",
    opacity: 1,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 24,
  },
  settingsValue: {
    opacity: 0.7,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  userIdLabel: {
    opacity: 0.5,
  },
  userIdValue: {
    opacity: 0.4,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
    fontFamily: "monospace",
  },
  actionsContainer: {
    gap: 12,
  },
  legalSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legalLink: {
    opacity: 0.5,
    textDecorationLine: "underline",
  },
  legalSeparator: {
    opacity: 0.3,
  },
  dangerZone: {
    alignItems: "center",
    paddingVertical: 24,
    paddingBottom: 40,
  },
  deleteAccountLink: {
    opacity: 0.3,
    textDecorationLine: "underline",
    fontSize: 10,
  },
});
