/**
 * Re-export everything from SubscriptionContext for backward compatibility.
 * This allows existing code to continue using `import { useSubscription } from '@/hooks/useSubscription'`
 * without breaking changes.
 */
export {
  getActiveEntitlements,
  getSubscriptionTier,
  hasActiveEntitlement,
  hasPaidSubscription,
  hasPlusAccess,
  hasProAccess,
  hasStarterAccess,
  PLUS_ENTITLEMENT_IDENTIFIER,
  PRO_ENTITLEMENT_IDENTIFIER,
  STARTER_ENTITLEMENT_IDENTIFIER,
  useSubscription,
  type SubscriptionStatus,
  type SubscriptionTier,
} from "@/src/context/SubscriptionContext";
