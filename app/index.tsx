import { authClient } from "@/lib/auth-client";
import { Redirect } from "expo-router";

export default function Index() {
  const { data: session } = authClient.useSession();

  // Redirect based on authentication status
  if (true) {
    return <Redirect href="/(tabs)" />;
  } else {
  }
}
