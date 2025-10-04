import { featuredTattoos, type FeaturedTattoo } from "@/lib/featured-tattoos";
import type { Asset } from "expo-media-library";
import {
  createContext,
  use,
  useCallback,
  useState,
  type ReactNode,
} from "react";

// Types for tattoo creation options
export type ColorOption = "color" | "blackwhite";

export interface TattooPlacement {
  bodyPart: string;
  side?: "left" | "right" | "center";
  size?: "small" | "medium" | "large" | "extra-large";
}

export interface TattooOptions {
  selectedTattoo?: FeaturedTattoo;
  colorOption?: ColorOption;
  placement?: TattooPlacement;
  artistNotes?: string;
  budget?: {
    min: number;
    max: number;
  };
  priority?: "quality" | "speed" | "budget";
  isPrivate?: boolean;
}

export interface TattooCreationState {
  // Selected photo from gallery
  selectedPhoto?: Asset;

  // Additional images (for future use)
  imageIds: string[];

  // Tattoo options
  options: TattooOptions;

  // Current step tracking (optional, for UI purposes)
  currentStep?: number;
  totalSteps?: number;

  // Body part selection
  selectedBodyPartCategory?: string;
  selectedBodyPartVariant?: string;
  customUserImage?: {
    uri: string;
    base64: string;
  };
  isUsingCustomImage?: boolean;

  // Tattoo style and image selection
  selectedTattooImage?: any; // ImageSourcePropType
  existingTattooImage?: {
    uri: string;
    base64: string;
  };
  isUsingExistingTattoo?: boolean;

  // Custom instructions
  customInstructions?: string;

  // Timestamps
  startedAt: Date;
  updatedAt: Date;
}

// Actions available in the context
export interface TattooCreationActions {
  // Photo management
  setSelectedPhoto: (photo: Asset | undefined) => void;

  // Image management
  addImage: (imageId: string) => void;
  removeImage: (imageId: string) => void;
  setImages: (imageIds: string[]) => void;
  clearImages: () => void;

  // Options management
  updateOptions: (options: Partial<TattooOptions>) => void;
  setOption: <K extends keyof TattooOptions>(
    key: K,
    value: TattooOptions[K]
  ) => void;
  clearOptions: () => void;

  // Body part management
  setSelectedBodyPartCategory: (category: string) => void;
  setSelectedBodyPartVariant: (variant: string) => void;
  setCustomUserImage: (
    image: { uri: string; base64: string } | undefined
  ) => void;
  setIsUsingCustomImage: (isUsing: boolean) => void;

  // Tattoo image management
  setSelectedTattooImage: (image: any) => void;
  setExistingTattooImage: (
    image: { uri: string; base64: string } | undefined
  ) => void;
  setIsUsingExistingTattoo: (isUsing: boolean) => void;

  // Custom instructions
  setCustomInstructions: (instructions: string) => void;

  // Step management
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Overall management
  reset: () => void;
  isComplete: () => boolean;
  getFormData: () => {
    selectedPhoto?: Asset;
    imageIds: string[];
    options: TattooOptions;
  };
}

// Combined context value
export interface TattooCreationContextValue
  extends TattooCreationState,
    TattooCreationActions {}

// Initial state
const initialState: TattooCreationState = {
  selectedPhoto: undefined,
  imageIds: [],
  options: {
    isPrivate: false,
  },
  currentStep: 1,
  totalSteps: 4, // 1) Body part/Photo, 2) Tattoo style, 3) Details, 4) Creation
  selectedBodyPartCategory: undefined,
  selectedBodyPartVariant: undefined,
  customUserImage: undefined,
  selectedTattooImage: featuredTattoos[0].image,
  existingTattooImage: undefined,
  isUsingCustomImage: false,
  isUsingExistingTattoo: false,
  customInstructions: "",
  startedAt: new Date(),
  updatedAt: new Date(),
};

// Create context with default values
export const TattooCreationContext = createContext<TattooCreationContextValue>({
  ...initialState,

  // Provide no-op functions as defaults
  setSelectedPhoto: () => {},
  addImage: () => {},
  removeImage: () => {},
  setImages: () => {},
  clearImages: () => {},
  updateOptions: () => {},
  setOption: () => {},
  clearOptions: () => {},
  setSelectedBodyPartCategory: () => {},
  setSelectedBodyPartVariant: () => {},
  setCustomUserImage: () => {},
  setIsUsingCustomImage: () => {},
  setSelectedTattooImage: () => {},
  setExistingTattooImage: () => {},
  setIsUsingExistingTattoo: () => {},
  setCustomInstructions: () => {},
  setCurrentStep: () => {},
  nextStep: () => {},
  previousStep: () => {},
  reset: () => {},
  isComplete: () => false,
  getFormData: () => ({ selectedPhoto: undefined, imageIds: [], options: {} }),
});

// Provider component
export function TattooCreationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TattooCreationState>(initialState);

  // Photo management actions
  const setSelectedPhoto = useCallback((photo: Asset | undefined) => {
    setState((prev) => ({
      ...prev,
      selectedPhoto: photo,
      updatedAt: new Date(),
    }));
  }, []);

  // Image management actions
  const addImage = useCallback((imageId: string) => {
    setState((prev) => ({
      ...prev,
      imageIds: [...new Set([...prev.imageIds, imageId])], // Prevent duplicates
      updatedAt: new Date(),
    }));
  }, []);

  const removeImage = useCallback((imageId: string) => {
    setState((prev) => ({
      ...prev,
      imageIds: prev.imageIds.filter((id) => id !== imageId),
      updatedAt: new Date(),
    }));
  }, []);

  const setImages = useCallback((imageIds: string[]) => {
    setState((prev) => ({
      ...prev,
      imageIds: [...new Set(imageIds)], // Remove any duplicates
      updatedAt: new Date(),
    }));
  }, []);

  const clearImages = useCallback(() => {
    setState((prev) => ({
      ...prev,
      imageIds: [],
      updatedAt: new Date(),
    }));
  }, []);

  // Options management actions
  const updateOptions = useCallback((options: Partial<TattooOptions>) => {
    setState((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        ...options,
      },
      updatedAt: new Date(),
    }));
  }, []);

  const setOption = useCallback(
    <K extends keyof TattooOptions>(key: K, value: TattooOptions[K]) => {
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [key]: value,
        },
        updatedAt: new Date(),
      }));
    },
    []
  );

  const clearOptions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      options: initialState.options,
      updatedAt: new Date(),
    }));
  }, []);

  // Body part management actions
  const setSelectedBodyPartCategory = useCallback((category: string) => {
    setState((prev) => ({
      ...prev,
      selectedBodyPartCategory: category,
      selectedBodyPartVariant: undefined, // Reset variant when changing category
      updatedAt: new Date(),
    }));
  }, []);

  const setSelectedBodyPartVariant = useCallback((variant: string) => {
    setState((prev) => ({
      ...prev,
      selectedBodyPartVariant: variant,
      updatedAt: new Date(),
    }));
  }, []);

  const setCustomUserImage = useCallback(
    (image: { uri: string; base64: string } | undefined) => {
      setState((prev) => ({
        ...prev,
        customUserImage: image,
        updatedAt: new Date(),
      }));
    },
    []
  );

  const setIsUsingCustomImage = useCallback((isUsing: boolean) => {
    setState((prev) => ({
      ...prev,
      isUsingCustomImage: isUsing,
      updatedAt: new Date(),
    }));
  }, []);

  // Tattoo image management actions
  const setSelectedTattooImage = useCallback((image: any) => {
    setState((prev) => ({
      ...prev,
      selectedTattooImage: image,
      updatedAt: new Date(),
    }));
  }, []);

  const setExistingTattooImage = useCallback(
    (image: { uri: string; base64: string } | undefined) => {
      setState((prev) => ({
        ...prev,
        existingTattooImage: image,
        updatedAt: new Date(),
      }));
    },
    []
  );

  const setIsUsingExistingTattoo = useCallback((isUsing: boolean) => {
    setState((prev) => ({
      ...prev,
      isUsingExistingTattoo: isUsing,
      updatedAt: new Date(),
    }));
  }, []);

  // Custom instructions
  const setCustomInstructions = useCallback((instructions: string) => {
    setState((prev) => ({
      ...prev,
      customInstructions: instructions,
      updatedAt: new Date(),
    }));
  }, []);

  // Step management actions
  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, prev.totalSteps || 4)),
      updatedAt: new Date(),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min((prev.currentStep || 1) + 1, prev.totalSteps || 4),
      updatedAt: new Date(),
    }));
  }, []);

  const previousStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max((prev.currentStep || 1) - 1, 1),
      updatedAt: new Date(),
    }));
  }, []);

  // Overall management actions
  const reset = useCallback(() => {
    setState({
      ...initialState,
      startedAt: new Date(),
      updatedAt: new Date(),
    });
  }, []);

  const isComplete = useCallback(() => {
    // Check if minimum requirements are met
    // Need a tattoo selected, color option, and a photo
    return (
      state.options.selectedTattoo !== undefined &&
      state.options.colorOption !== undefined &&
      state.selectedPhoto !== undefined
    );
  }, [
    state.options.selectedTattoo,
    state.options.colorOption,
    state.selectedPhoto,
  ]);

  const getFormData = useCallback(() => {
    return {
      selectedPhoto: state.selectedPhoto,
      imageIds: state.imageIds,
      options: state.options,
    };
  }, [state.selectedPhoto, state.imageIds, state.options]);

  // Combine state and actions
  const contextValue: TattooCreationContextValue = {
    ...state,
    setSelectedPhoto,
    addImage,
    removeImage,
    setImages,
    clearImages,
    updateOptions,
    setOption,
    clearOptions,
    setSelectedBodyPartCategory,
    setSelectedBodyPartVariant,
    setCustomUserImage,
    setIsUsingCustomImage,
    setSelectedTattooImage,
    setExistingTattooImage,
    setIsUsingExistingTattoo,
    setCustomInstructions,
    setCurrentStep,
    nextStep,
    previousStep,
    reset,
    isComplete,
    getFormData,
  };

  return (
    <TattooCreationContext.Provider value={contextValue}>
      {children}
    </TattooCreationContext.Provider>
  );
}

// Custom hook using React 19's 'use' hook
export function useTattooCreation() {
  const context = use(TattooCreationContext);

  if (!context) {
    throw new Error(
      "useTattooCreation must be used within a TattooCreationProvider"
    );
  }

  return context;
}
