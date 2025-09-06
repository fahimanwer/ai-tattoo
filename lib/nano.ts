import { createJsonMutation } from "./mutations";

type TextToImageInput = { prompt: string };
type TextToImageResponse = { imageData: string };

export const textToImage = createJsonMutation<
  TextToImageInput,
  TextToImageResponse
>("/api/nano/text-to-image", "POST", ({ prompt }) => ({ prompt }));
