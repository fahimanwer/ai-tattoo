export interface GeneratedTattoo {
  id: string;
  imageData: string; // base64 image data
  generationDate: Date;
  style: string;
  bodyPart: string;
  isFavorite: boolean;
  prompt?: string;
  isOwnData?: boolean; // true if user used their own photos
}

export interface TattooGenerationData {
  style: string;
  bodyPart: string;
  prompt?: string;
  isOwnData?: boolean;
}
