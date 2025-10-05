import { authClient } from "@/lib/auth-client";
import { Redirect } from "expo-router";

export default function Index() {
  const { data: session } = authClient.useSession();

  const isAuthenticated = !!session;

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(onboarding)" />;
  }
}
