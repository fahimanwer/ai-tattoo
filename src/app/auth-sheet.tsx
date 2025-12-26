import { authClient } from "@/lib/auth-client";
import { AuthContent } from "@/src/components/auth/AuthContent";
import { useRouter } from "expo-router";
import { useUserData } from "../hooks/useUserData";

/**
 * Auth sheet for signing in from anywhere in the app (profile, etc).
 * For onboarding post-purchase auth, use /(onboarding)/auth instead.
 */
export default function AuthSheet() {
  const router = useRouter();
  const { syncAfterAuth } = useUserData();

  const handleSuccess = async () => {
    // Get the authenticated user's ID
    const session = await authClient.getSession();
    const userId = session?.data?.user?.id;

    if (userId) {
      // Link RevenueCat with Better Auth user ID + restore purchases + refresh usage
      await syncAfterAuth(userId);
    }

    router.dismiss();
  };

  return <AuthContent onSuccess={handleSuccess} />;
}
