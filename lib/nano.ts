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
export interface UsageRecord {
  entitlement: string;
  periodStart: string;
  periodEnd: string;
  count: number;
  limit: number;
  revenuecatUserId: string;
}

export interface UsageResponse {
  usage: UsageRecord[];
  totalUsage: number;
}

export const fetchUserUsage = (): Promise<UsageResponse> => {
  return apiFetch<UsageResponse>("/api/user/usage", { method: "POST" });
};
