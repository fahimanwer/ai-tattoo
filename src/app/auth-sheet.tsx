import { AuthContent } from "@/src/components/auth/AuthContent";
import { useRouter } from "expo-router";
import { useUserData } from "../hooks/useUserData";

/**
 * Auth sheet for signing in from anywhere in the app (profile, etc).
 * For onboarding post-purchase auth, use /(onboarding)/auth instead.
 */
export default function AuthSheet() {
  const router = useRouter();
  const { refresh } = useUserData();

  const handleSuccess = async () => {
    await refresh();
    router.dismiss();
  };

  return <AuthContent onSuccess={handleSuccess} />;
}
