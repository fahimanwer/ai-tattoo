import { ProfileContent } from "@/components/profile/ProfileContent";
import { Text } from "@/components/ui/Text";
import { authClient } from "@/lib/auth-client";
import { View } from "react-native";

export function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

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

  return <ProfileContent user={user} />;
}
