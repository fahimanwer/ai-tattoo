import { ProfileContent } from "@/components/profile/ProfileContent";
import { Text } from "@/components/ui/Text";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { PlanInfo } from "../profile/PlanInfo";
import { Button } from "../ui/Button";

export function Profile() {
  const { user, isLoading } = useUserData();
  const { refetch: refetchUsage, isLoading: isUsageLoading } = useUsageLimit();
  const { refreshSubscriptionStatus, isLoading: isSubscriptionLoading } =
    useSubscription();
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
      <Button title="Paywall" onPress={() => router.push("/(paywall)")} />
    </ScrollView>
  );
}
