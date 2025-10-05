import { ProfileContent } from "@/components/profile/ProfileContent";
import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsage } from "@/hooks/useUsage";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { PlanInfo } from "../profile/PlanInfo";
import { UpgradeOptions } from "../profile/UpgradeOptions";

export function Profile() {
  const { user, isLoading } = useUserData();
  const { refetch: refetchUsage, isLoading: isUsageLoading } = useUsage();
  const { refreshSubscriptionStatus, isLoading: isSubscriptionLoading } =
    useSubscription();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleUpgradeSuccess = async () => {
    console.log("Upgrade successful -> Refreshing all data");
    await handleRefresh();
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
        <Text type="body">Not signed in</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={
            isRefreshing || isLoading || isUsageLoading || isSubscriptionLoading
          }
          onRefresh={handleRefresh}
          tintColor="#007AFF"
        />
      }
    >
      <ProfileContent user={user} />
      <PlanInfo />
      <UpgradeOptions onUpgradeSuccess={handleUpgradeSuccess} />
    </ScrollView>
  );
}
