import { authClient } from "@/lib/auth-client";
import { AuthContent } from "@/src/components/auth/AuthContent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUserData } from "../hooks/useUserData";

/**
 * Auth sheet for signing in from anywhere in the app (profile, etc).
 * For onboarding post-purchase auth, use /(onboarding)/auth instead.
 */
export default function AuthSheet() {
  const router = useRouter();
  const { syncAfterAuth } = useUserData();
  const params = useLocalSearchParams<{ dismissImmediately?: string }>();

  // Dismiss immediately when coming from PlaygroundScreen to avoid keyboard conflict during sheet dismissal
  const shouldDismissImmediately = params.dismissImmediately === "true";

  const handleSuccess = async () => {
    // Skip sync and dismiss right away (e.g., from PlaygroundScreen where keyboard auto-focuses)
    if (shouldDismissImmediately) {
      router.dismiss();
      return;
    }

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
