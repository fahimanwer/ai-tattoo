import { PLUS_ENTITLEMENT_IDENTIFIER } from "@/hooks/useSubscription";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

/**
 * Present the main paywall for the Plus subscription
 * @returns Promise<boolean> - true if purchase/restore was successful, false otherwise
 */
export async function presentPaywall(): Promise<boolean> {
  try {
    // Present paywall for current offering (Main paywall is already configured)
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error("Error presenting paywall:", error);
    return false;
  }
}

/**
 * Present paywall only if the customer does not have Plus entitlement
 * @returns Promise<boolean> - true if purchase/restore was successful or user already has access
 */
export async function presentPaywallIfNeeded(): Promise<boolean> {
  try {
    // Present paywall for current offering if user doesn't have Plus entitlement
    const paywallResult: PAYWALL_RESULT =
      await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: PLUS_ENTITLEMENT_IDENTIFIER,
      });

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
        // User already has the entitlement
        return true;
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error("Error presenting paywall if needed:", error);
    return false;
  }
}

/**
 * Get a human-readable description of the paywall result
 */
export function getPaywallResultDescription(result: PAYWALL_RESULT): string {
  switch (result) {
    case PAYWALL_RESULT.NOT_PRESENTED:
      return "Paywall not presented";
    case PAYWALL_RESULT.ERROR:
      return "Error occurred";
    case PAYWALL_RESULT.CANCELLED:
      return "User cancelled";
    case PAYWALL_RESULT.PURCHASED:
      return "Purchase successful";
    case PAYWALL_RESULT.RESTORED:
      return "Purchase restored";
    default:
      return "Unknown result";
  }
}

/**
 * Handle paywall result with optional callbacks
 */
export function handlePaywallResult(
  result: PAYWALL_RESULT,
  options?: {
    onSuccess?: () => void;
    onCancel?: () => void;
    onError?: (error: string) => void;
  }
): boolean {
  const { onSuccess, onCancel, onError } = options || {};

  switch (result) {
    case PAYWALL_RESULT.PURCHASED:
    case PAYWALL_RESULT.RESTORED:
      console.log("✅ Paywall success:", getPaywallResultDescription(result));
      onSuccess?.();
      return true;

    case PAYWALL_RESULT.CANCELLED:
      console.log("❌ Paywall cancelled");
      onCancel?.();
      return false;

    case PAYWALL_RESULT.ERROR:
      console.error("❌ Paywall error");
      onError?.("An error occurred during the purchase process");
      return false;

    case PAYWALL_RESULT.NOT_PRESENTED:
      console.log("ℹ️ Paywall not presented");
      return false;

    default:
      console.log("❓ Unknown paywall result:", result);
      return false;
  }
}
