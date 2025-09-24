import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { authClient } from "@/lib/auth-client";
import { View } from "react-native";

interface ProfileHeaderProps {
  user: {
    name?: string;
    email?: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user?.name?.includes("@")
    ? user.name.slice(0, user.name.indexOf("@"))
    : user?.name || "Unknown User";

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF10",
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Text type="2xl" weight="bold" style={{ marginBottom: 8 }}>
        {displayName}
      </Text>
      <Text type="body" lightColor="#666" style={{ marginBottom: 16 }}>
        {user.email}
      </Text>

      <Button
        title="Sign Out"
        onPress={() => authClient.signOut()}
        variant="solid"
        color="blue"
        style={{ marginBottom: 8 }}
      />
    </View>
  );
}
