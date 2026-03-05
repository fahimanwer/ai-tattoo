/**
 * useGenerationMutations -- encapsulates text-to-image and text+image-to-image
 * mutation logic, extracted from PlaygroundCoreContext to stay under 500 lines.
 */

import { promptToCombineTwoImages } from "@/lib/featured-tattoos";
import {
  cacheBase64Image,
  getCachedImageAsBase64,
} from "@/lib/image-cache";
import { clog } from "@/lib/log";
import {
  api,
  TextAndImageToImageInput,
  TextAndImageToImageResponse,
  TextToImageInput,
  TextToImageResponse,
} from "@/lib/nano";
import { addPromptToHistory } from "@/lib/prompt-history";
import { useUsageLimit } from "@/src/hooks/useUsageLimit";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import * as React from "react";
import { Keyboard } from "react-native";
import Purchases from "react-native-purchases";
import { customEvent } from "vexo-analytics";

export type ImageGenerationMutation =
  | UseMutationResult<TextToImageResponse | undefined, Error, string, unknown>
  | UseMutationResult<
      TextAndImageToImageResponse | undefined,
      Error,
      any,
      unknown
    >;

interface UseGenerationMutationsArgs {
  sessionGenerations: string[][];
  setSessionGenerations: React.Dispatch<React.SetStateAction<string[][]>>;
  activeGenerationIndex: number | undefined;
  setActiveGenerationIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  prompt: string;
  setPrompt: (text: string) => void;
  improvePrompt: boolean | undefined;
}

export function useGenerationMutations({
  sessionGenerations,
  setSessionGenerations,
  activeGenerationIndex,
  setActiveGenerationIndex,
  prompt,
  setPrompt,
  improvePrompt,
}: UseGenerationMutationsArgs) {
  const queryClient = useQueryClient();
  const { isLimitReached } = useUsageLimit();
  const textToImageAction = useAction(api.generation.textToImage);
  const textAndImageToImageAction = useAction(
    api.generation.textAndImageToImage
  );
  const cancelledRef = React.useRef(false);

  const textToImageMutation = useMutation({
    mutationFn: async ({
      prompt,
      improvePrompt: improve = improvePrompt ?? true,
    }: TextToImageInput) => {
      // Pre-check credits client-side for instant feedback
      if (isLimitReached) {
        throw new ConvexError({
          code: "LIMIT_REACHED",
          message: "Generation limit reached. Please upgrade your plan.",
        });
      }

      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID
      }
      return textToImageAction({
        prompt,
        improvePrompt: improve,
        revenuecatUserId,
      });
    },
    onSuccess: async (data) => {
      if (cancelledRef.current) {
        return;
      }
      if (data?.imageData) {
        const fileUri = await cacheBase64Image(data.imageData, "png");
        if (cancelledRef.current) {
          return;
        }
        setSessionGenerations((prev) => {
          const next = [...prev, [fileUri]];
          setActiveGenerationIndex(next.length - 1);
          return next;
        });
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
        customEvent("generation_completed", {
          type: "text_to_image",
          success: true,
        });
      }
    },
    onError: (error) => {
      if (cancelledRef.current) {
        return;
      }
      customEvent("generation_failed", {
        type: "text_to_image",
        error: error.message,
      });
    },
  });

  const textAndImageToImageMutation = useMutation({
    mutationFn: async ({
      prompt,
      images_base64,
      improvePrompt: improve,
    }: TextAndImageToImageInput) => {
      // Pre-check credits client-side for instant feedback
      if (isLimitReached) {
        throw new ConvexError({
          code: "LIMIT_REACHED",
          message: "Generation limit reached. Please upgrade your plan.",
        });
      }

      let revenuecatUserId: string | undefined;
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        revenuecatUserId = customerInfo.originalAppUserId;
      } catch {
        // Continue without RC ID
      }
      return textAndImageToImageAction({
        prompt,
        images_base64,
        improvePrompt: improve,
        revenuecatUserId,
      });
    },
    onSuccess: async (data) => {
      if (cancelledRef.current) {
        return;
      }
      if (data?.imageData) {
        const fileUri = await cacheBase64Image(data.imageData, "png");
        if (cancelledRef.current) {
          return;
        }
        setSessionGenerations((prev) => {
          const next = [...prev, [fileUri]];
          setActiveGenerationIndex(next.length - 1);
          return next;
        });
        queryClient.invalidateQueries({ queryKey: ["user", "usage"] });
        customEvent("generation_completed", {
          type: "image_to_image",
          success: true,
        });
      }
    },
    onError: (error) => {
      if (cancelledRef.current) {
        return;
      }
      customEvent("generation_failed", {
        type: "image_to_image",
        error: error.message,
      });
    },
  });

  const activeGenerationUris =
    activeGenerationIndex !== undefined
      ? sessionGenerations[activeGenerationIndex] || []
      : [];

  async function handleTattooGeneration() {
    if (prompt.trim().length === 0 && activeGenerationUris?.length !== 2) {
      return;
    }

    const activeImageGroup =
      activeGenerationIndex !== undefined
        ? sessionGenerations[activeGenerationIndex]
        : undefined;

    const isTextToImage = !activeImageGroup || activeImageGroup.length === 0;

    if (prompt.trim().length > 0) {
      addPromptToHistory(prompt);
    }
    setPrompt("");
    Keyboard.dismiss();
    cancelledRef.current = false;

    if (isTextToImage) {
      customEvent("generation_started", {
        type: "text_to_image",
        promptLength: prompt.length,
        imageCount: 0,
        improvePrompt: improvePrompt ?? true,
      });
      setActiveGenerationIndex(undefined);
      textToImageMutation.mutate({ prompt, improvePrompt: improvePrompt ?? true });
    } else {
      customEvent("generation_started", {
        type: "image_to_image",
        promptLength: prompt.length,
        imageCount: activeImageGroup.length,
        improvePrompt: improvePrompt ?? true,
      });
      const promptToUse =
        activeImageGroup.length === 2 ? promptToCombineTwoImages : prompt;

      const base64Images = await Promise.all(
        activeImageGroup.map((uri) => getCachedImageAsBase64(uri))
      );
      textAndImageToImageMutation.mutate({
        prompt: promptToUse,
        images_base64: base64Images,
        improvePrompt,
      });
    }
  }

  const activeMutation = textToImageMutation.isPending
    ? textToImageMutation
    : textAndImageToImageMutation.isPending
      ? textAndImageToImageMutation
      : textToImageMutation.isError
        ? textToImageMutation
        : textAndImageToImageMutation.isError
          ? textAndImageToImageMutation
          : textToImageMutation.isSuccess
            ? textToImageMutation
            : textAndImageToImageMutation.isSuccess
              ? textAndImageToImageMutation
      : activeGenerationUris.length > 0
                ? textAndImageToImageMutation
                : textToImageMutation;

  const textToImageMutationRef = React.useRef(textToImageMutation);
  const textAndImageToImageMutationRef = React.useRef(textAndImageToImageMutation);

  React.useEffect(() => {
    textToImageMutationRef.current = textToImageMutation;
    textAndImageToImageMutationRef.current = textAndImageToImageMutation;
  }, [textToImageMutation, textAndImageToImageMutation]);

  const resetMutations = () => {
    textToImageMutationRef.current.reset();
    textAndImageToImageMutationRef.current.reset();
  };

  const cancelGeneration = () => {
    cancelledRef.current = true;
    textToImageMutationRef.current.reset();
    textAndImageToImageMutationRef.current.reset();
    clog("PlaygroundCoreContext", "Generation cancelled by user");
  };

  return {
    textToImageMutation,
    textAndImageToImageMutation,
    handleTattooGeneration,
    activeMutation,
    activeGenerationUris,
    resetMutations,
    cancelGeneration,
  };
}
