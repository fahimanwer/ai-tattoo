import { ProfileContent } from "@/components/profile/ProfileContent";
import { Text } from "@/components/ui/Text";
import { useUsage } from "@/hooks/useUsage";
import { useUserData } from "@/hooks/useUserData";
import { RefreshControl, ScrollView, View } from "react-native";
import { UsageDisplay } from "../profile/UsageDisplay";

export function Profile() {
  const { user, isLoading } = useUserData();
  const { refetch: refetchUsage, isLoading: isUsageLoading } = useUsage();

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
      contentContainerStyle={{ paddingHorizontal: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isUsageLoading}
          onRefresh={refetchUsage}
          tintColor="#007AFF"
        />
      }
    >
      <ProfileContent user={user} />
      {/* <PlanInfo /> */}
      <UsageDisplay />
    </ScrollView>
  );
}
