import type { PlanTier } from "@/src/constants/plan-limits";
import { apiFetch } from "./api-client";
import { createJsonMutation } from "./mutations";

export type TextToImageInput = {
  prompt: string;
  improvePrompt: boolean;
  revenuecatUserId?: string;
};
export type TextToImageResponse = { imageData: string };

export const textToImage = createJsonMutation<
  TextToImageInput,
  TextToImageResponse
>(
  "/api/nano/text-to-image",
  "POST",
  ({ prompt, improvePrompt, revenuecatUserId }) => ({
    prompt,
    improvePrompt,
    revenuecatUserId,
  })
);

/**
 * Text and Image to Image
 */
export type TextAndImageToImageInput = {
  prompt: string;
  images_base64: string[];
  improvePrompt?: boolean;
  revenuecatUserId?: string;
};
export type TextAndImageToImageResponse = { imageData: string };

export const textAndImageToImage = createJsonMutation<
  TextAndImageToImageInput,
  TextAndImageToImageResponse
>(
  "/api/nano/text-and-image-to-image",
  "POST",
  ({ prompt, images_base64, improvePrompt, revenuecatUserId }) => ({
    prompt,
    images_base64,
    improvePrompt,
    revenuecatUserId,
  })
);

/**
 * User Usage API
 */

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

export const fetchUserUsage = (
  revenuecatUserId?: string
): Promise<UsageResponse> => {
  return apiFetch<UsageResponse>("/api/user/usage", {
    method: "POST",
    body: revenuecatUserId ? { revenuecatUserId } : undefined,
  });
};

/**
 * Subscription Sync API
 * Call this after Purchases.restorePurchases() to ensure the server
 * has a usage record for the current RevenueCat user ID.
 */
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

export const syncSubscription = (
  input: SyncSubscriptionInput
): Promise<SyncSubscriptionResponse> => {
  return apiFetch<SyncSubscriptionResponse>("/api/user/sync-subscription", {
    method: "POST",
    body: input,
  });
};
