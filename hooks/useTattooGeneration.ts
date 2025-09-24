import { useTattooHistory } from "@/context/TattooHistoryContext";
import { TattooGenerationData } from "@/types/tattoo";

export function useTattooGeneration() {
  const { addTattoo } = useTattooHistory();

  const saveGeneratedTattoo = (
    imageData: string,
    generationData: TattooGenerationData,
    prompt?: string
  ) => {
    // Add to local history
    addTattoo({
      imageData,
      style: generationData.style,
      bodyPart: generationData.bodyPart,
      prompt: prompt || "",
      isOwnData: generationData.isOwnData,
    });
  };

  return {
    saveGeneratedTattoo,
  };
}
