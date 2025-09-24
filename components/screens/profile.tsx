import { ProfileContent } from "@/components/profile/ProfileContent";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/hooks/useUserData";
import { RefreshControl, ScrollView, View } from "react-native";

export function Profile() {
  const { user, isLoading, refresh } = useUserData();

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
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refresh}
          tintColor="#007AFF"
        />
      }
    >
      <ProfileContent user={user} />
    </ScrollView>
  );
}
