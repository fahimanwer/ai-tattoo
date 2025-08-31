export async function presentPaywall(): Promise<boolean> {
  return false;
}

/**
 * Present paywall only if the customer does not have Plus entitlement
 * @returns Promise<boolean> - true if purchase/restore was successful or user already has access
 */
export async function presentPaywallIfNeeded(): Promise<boolean> {
  return false;
}

/**
 * Get a human-readable description of the paywall result
 */
export function getPaywallResultDescription(): string {
  return "";
}

/**
 * Handle paywall result with optional callbacks
 */
export function handlePaywallResult() {
  return;
}

/**
 * Open subscription management for the user
 * This will take them to their device's subscription settings
 */
export function manageSubscription() {
  return;
}
