import { ImageSourcePropType } from "react-native";

export interface BodyPartVariant {
  id: string;
  name: string;
  image: ImageSourcePropType; // for display in Image component
  imageUrl: string; // URL for uriToBase64 conversion
  description: string;
}

export interface BodyPartCategory {
  id: string;
  name: string;
  description: string;
  image: ImageSourcePropType; // cover image for the category
  gallery: BodyPartVariant[]; // all variants in this category
}

// Create body part variants
const armVariants: BodyPartVariant[] = [
  {
    id: "arm_male_one",
    name: "Muscular Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
    description: "Male upper arm with muscular definition",
  },
  {
    id: "arm_male_two",
    name: "Athletic Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-2.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-2.png",
    description: "Male upper arm with athletic physique",
  },
  {
    id: "arm_male_three",
    name: "Lean Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-3.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-3.png",
    description: "Male upper arm with lean physique",
  },
  {
    id: "arm_male_four",
    name: "Broad Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-4.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-4.png",
    description: "Male upper arm with broad shoulders",
  },
  {
    id: "arm_male_five",
    name: "Standard Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-5.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-5.png",
    description: "Male upper arm with average build",
  },
  {
    id: "arm_male_six",
    name: "Defined Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-6.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-6.png",
    description: "Male upper arm with well-defined muscles",
  },
  {
    id: "arm_male_seven",
    name: "Strong Build",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-7.png",
    },
    imageUrl:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-7.png",
    description: "Male upper arm with strong build",
  },
];

// Main body part categories (similar to featured tattoos structure)
export const bodyPartCategories: BodyPartCategory[] = [
  {
    id: "arm",
    name: "Arms",
    description: "Upper arm area perfect for medium to large tattoos",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
    }, // Use first variant as cover
    gallery: armVariants,
  },
  // Add more categories here (legs, chest, back, etc.)
];

// Legacy compatibility - combine all variants from all categories
export const bodyParts: BodyPartVariant[] = bodyPartCategories.flatMap(
  (category) => category.gallery
);

export const getBodyPartById = (id: string): BodyPartVariant | undefined => {
  return bodyParts.find((part) => part.id === id);
};

export const getBodyPartCategoryById = (
  id: string
): BodyPartCategory | undefined => {
  return bodyPartCategories.find((category) => category.id === id);
};

export const getDefaultBodyPartCategory = (): BodyPartCategory => {
  return bodyPartCategories[0]; // Return arms as default
};

export const getDefaultBodyPart = (): BodyPartVariant => {
  return bodyParts[0]; // Return first arm variant as default
};
