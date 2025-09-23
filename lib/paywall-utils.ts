import { PLUS_ENTITLEMENT_IDENTIFIER, SubscriptionTier } from "@/hooks/useSubscription";
import { canUserUpgradeTo } from "@/lib/subscription-utils";
import { Alert, Linking, Platform } from "react-native";
import Purchases from "react-native-purchases";
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

/**
 * Present upgrade paywall for a specific subscription tier
 * @param targetTier - The tier to upgrade to
 * @returns Promise<boolean> - true if upgrade was successful, false otherwise
 */
export async function presentUpgradePaywall(targetTier: SubscriptionTier): Promise<boolean> {
  try {
    // Present paywall for upgrade
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

    return handlePaywallResult(paywallResult);
  } catch (error) {
    console.error("Error presenting upgrade paywall:", error);
    return false;
  }
}

/**
 * Get available packages for upgrade
 * @param currentTier - Current subscription tier
 * @returns Promise<any[]> - Available upgrade packages
 */
export async function getUpgradePackages(currentTier: SubscriptionTier): Promise<any[]> {
  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      console.warn("No current offering available");
      return [];
    }

    // Filter packages that are upgrades from current tier
    return currentOffering.availablePackages.filter((packageItem: any) => {
      const packageTier = getTierFromEntitlement(packageItem.entitlementIdentifier);
      return canUserUpgradeTo(currentTier, packageTier);
    });
  } catch (error) {
    console.error("Error getting upgrade packages:", error);
    return [];
  }
}

/**
 * Get tier from entitlement identifier
 */
function getTierFromEntitlement(entitlement: string): SubscriptionTier {
  switch (entitlement) {
    case "Starter":
      return "starter";
    case "Pro":
      return "pro";
    case "Plus":
      return "plus";
    default:
      return "free";
  }
}

/**
 * Open subscription management for the user
 * This will take them to their device's subscription settings
 */
export async function manageSubscription(): Promise<void> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();

    if (customerInfo.managementURL) {
      // Use RevenueCat's management URL if available
      await Linking.openURL(customerInfo.managementURL);
    } else {
      // Fallback to platform-specific subscription management
      if (Platform.OS === "ios") {
        await Linking.openURL("https://apps.apple.com/account/subscriptions");
      } else if (Platform.OS === "android") {
        await Linking.openURL(
          "https://play.google.com/store/account/subscriptions"
        );
      } else {
        // Web or other platforms
        Alert.alert(
          "Manage Subscription",
          "Please visit your app store account to manage your subscription.",
          [{ text: "OK", style: "default" }]
        );
      }
    }
  } catch (error) {
    console.error("Error opening subscription management:", error);
    Alert.alert(
      "Error",
      "Unable to open subscription management. Please try again or contact support.",
      [{ text: "OK", style: "default" }]
    );
  }
}
