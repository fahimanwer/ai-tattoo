import { BodyPartsInspiration } from "@/components/home/BodyPartsInspiration";
import { GetInspiration } from "@/components/home/GetInspiration";
import { Banner } from "@/components/pro/Banner";
import { useUserData } from "@/hooks/useUserData";
import { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export function Home() {
  const { user, usage, subscription, isLoading, refresh } = useUserData();

  // Log user data when it changes
  useEffect(() => {
    if (user) {
      console.log("🏠 Home - User data:", {
        userId: user.id,
        email: user.email,
        name: user.name,
        subscriptionTier: subscription.tier,
        usageCount: usage.currentPeriodUsage?.count || 0,
        usageLimit: usage.currentPeriodUsage?.limit || 0,
        hasActiveEntitlement: usage.hasActiveEntitlement,
      });
    }
  }, [user, usage, subscription]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refresh}
          tintColor="#007AFF"
        />
      }
    >
      <View style={styles.section}>
        <Banner />
        <GetInspiration />
        <BodyPartsInspiration />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 52,
    gap: 24,
  },
});
