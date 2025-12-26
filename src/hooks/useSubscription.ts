/**
 * Re-export everything from SubscriptionContext for backward compatibility.
 * This allows existing code to continue using `import { useSubscription } from '@/hooks/useSubscription'`
 * without breaking changes.
 */
export {
  getActiveEntitlements,
  getLastSubscription,
  getSubscriptionTier,
  hasActiveEntitlement,
  hasPaidSubscription,
  hasPlusAccess,
  hasProAccess,
  hasStarterAccess,
  PLUS_ENTITLEMENT_IDENTIFIER,
  PREMIUM_ENTITLEMENT_IDENTIFIER,
  PRO_ENTITLEMENT_IDENTIFIER,
  STARTER_ENTITLEMENT_IDENTIFIER,
  useSubscription,
  type LastSubscriptionInfo,
  type SubscriptionStatus,
  type SubscriptionTier,
} from "@/src/context/SubscriptionContext";
