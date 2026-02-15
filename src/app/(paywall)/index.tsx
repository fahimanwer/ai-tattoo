import { Paywall } from "@/src/components/screens/Paywall";
import { useLocalSearchParams } from "expo-router";

export default function PaywallScreen() {
  const { variant } = useLocalSearchParams<{ variant?: string }>();
  return <Paywall variant={(variant as "main" | "discount") ?? "main"} />;
}
