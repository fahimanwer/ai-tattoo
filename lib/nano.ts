import type { PlanTier } from "@/src/constants/plan-limits";

// Types stay the same - used by components and hooks
export type TextToImageInput = {
  prompt: string;
  improvePrompt: boolean;
  revenuecatUserId?: string;
};
export type TextToImageResponse = { imageData: string };

export type TextAndImageToImageInput = {
  prompt: string;
  images_base64: string[];
  improvePrompt?: boolean;
  revenuecatUserId?: string;
};
export type TextAndImageToImageResponse = { imageData: string };

export interface UsageResponse {
  used: number;
  limit: number;
  remaining: number;
  periodStart: string;
  periodEnd: string;
  isLimitReached: boolean;
  subscriptionTier: PlanTier;
  planInfo: {
    displayName: string;
    color: string;
    features: string[];
  };
}

export interface SyncSubscriptionInput {
  revenuecatUserId: string;
  activeEntitlements: string[];
  hasActiveSubscription: boolean;
  subscriptionInfo?: {
    productIdentifier: string | null;
    expiresDate: string | null;
    purchaseDate: string | null;
  };
}

export interface SyncSubscriptionResponse {
  success: boolean;
  message: string;
  synced: boolean;
  record?: {
    entitlement: string;
    count: number;
    limit: number;
    periodStart: string;
    periodEnd: string;
  };
}

// Re-export Convex API for use with hooks in components
// Components will use:
//   const generate = useAction(api.generation.textToImage);
//   const usage = useQuery(api.usage.getUserUsage, { revenuecatUserId });
//   const sync = useMutation(api.subscription.syncSubscription);
export { api } from "../convex/_generated/api";
