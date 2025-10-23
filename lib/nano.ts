import type { PlanTier } from "@/constants/plan-limits";
import { apiFetch } from "./api-client";
import { createJsonMutation } from "./mutations";

type TextToImageInput = { prompt: string };
type TextToImageResponse = { imageData: string };

export const textToImage = createJsonMutation<
  TextToImageInput,
  TextToImageResponse
>("/api/nano/text-to-image", "POST", ({ prompt }) => ({ prompt }));

/**
 * Text and Image to Image
 */
type TextAndImageToImageInput = { prompt: string; images_base64: string[] };
type TextAndImageToImageResponse = { imageData: string };

export const textAndImageToImage = createJsonMutation<
  TextAndImageToImageInput,
  TextAndImageToImageResponse
>("/api/nano/text-and-image-to-image", "POST", ({ prompt, images_base64 }) => ({
  prompt,
  images_base64,
}));

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

export const fetchUserUsage = (): Promise<UsageResponse> => {
  return apiFetch<UsageResponse>("/api/user/usage", { method: "POST" });
};
