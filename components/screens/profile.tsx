import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { authClient } from "@/lib/auth-client";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export function Profile() {
  const { data: session } = authClient.useSession();
  const { isPlusUser, isLoading: subscriptionLoading } = useSubscription();

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

        {/* Current Plan Section */}
        <View style={styles.section}>
          <Text type="subtitle" weight="bold" style={styles.sectionTitle}>
            Current Plan
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
          </View>
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
    justifyContent: "flex-start",
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
  unlimitedText: {
    color: "#16a34a",
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
});
