import { View } from "react-native";
import { ProfileHeader } from "./ProfileHeader";

interface ProfileContentProps {
  user: {
    name?: string;
    email?: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <View style={{ padding: 20 }}>
      <ProfileHeader user={user} />
      <View
        style={{
          backgroundColor: "#FFFFFF10",
          padding: 20,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        {/* <SubscriptionActions
          subscriptionTier={subscription.tier}
          onSubscriptionChange={refresh}
        />

        <UpgradeOptions
          subscriptionTier={subscription.tier}
          onSubscriptionChange={refresh}
        /> */}
      </View>
    </View>
  );
}
