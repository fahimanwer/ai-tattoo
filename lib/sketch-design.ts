export interface SketchDesignImage {
  uri: string;
  blurhash?: string;
}

export interface SketchDesignStyle {
  id: number;
  title: string;
  style: string;
  description: string;
  prompt: string;
  gallery: SketchDesignImage[];
}

export const sketchDesigns: SketchDesignStyle[] = [
  {
    id: 15,
    title: "Dotwork",
    style: "Dotwork",
    description: "Intricate designs created entirely from dots, creating texture and depth through stippling techniques.",
    prompt: "Generate a realistic tattoo in dotwork style, using stippling technique with precise dots to create texture, shading, and depth",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/dotwork/sketch-design-dotwork-8.avif",
      },
    ],
  },
  {
    id: 14,
    title: "Patchwork",
    style: "Patchwork",
    description: "A collection of diverse tattoo styles combined together, creating a unique patchwork aesthetic.",
    prompt: "Generate a realistic patchwork tattoo design combining multiple different tattoo styles and elements in a cohesive composition",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/patchwork/sketch-design-patchwork-8.avif",
      },
    ],
  },
  {
    id: 7,
    title: "Couples",
    style: "Couples / Matching",
    description: "Matching or complementary tattoo designs perfect for couples, symbolizing connection and unity.",
    prompt: "Generate a realistic matching or complementary couple tattoo design that works as a pair, symbolizing connection and unity",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/couples/sketch-design-couples-9.avif",
      },
    ],
  },
  {
    id: 10,
    title: "Mini",
    style: "Mini",
    description: "Small, delicate tattoo designs perfect for subtle placement and minimal aesthetic.",
    prompt: "Generate a realistic mini tattoo design, small and delicate with fine details, perfect for subtle placement",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/mini/sketch-design-mini-9.avif",
      },
    ],
  },
  {
    id: 11,
    title: "Aesthetic",
    style: "Aesthetic",
    description: "Visually pleasing designs focused on beauty, harmony, and modern aesthetic appeal.",
    prompt: "Generate a realistic aesthetic tattoo design with visually pleasing composition, focusing on beauty, harmony, and modern appeal",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/aesthetic/sketch-design-aesthetic-9.avif",
      },
    ],
  },
  {
    id: 1,
    title: "Japanese",
    style: "Japanese",
    description: "Traditional Japanese tattoo art featuring iconic motifs like dragons, koi fish, and cherry blossoms.",
    prompt: "Generate a realistic Japanese tattoo design in traditional irezumi style, featuring iconic motifs like dragons, koi fish, cherry blossoms, or waves with bold lines and vibrant colors",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-9.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/japanese/sketch-design-japanese-10.avif",
      },
    ],
  },
  {
    id: 2,
    title: "Realistic",
    style: "Photorealism",
    description: "Hyper-realistic tattoo designs that look like photographs, with incredible detail and shading.",
    prompt: "Generate a realistic photorealistic tattoo design with incredible detail, precise shading, and lifelike appearance",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/realistic/sketch-design-realistic-9.avif",
      },
    ],
  },
  {
    id: 3,
    title: "Blackwork",
    style: "Solid Black",
    description: "Bold, solid black tattoo designs with strong contrast and geometric or organic patterns.",
    prompt: "Generate a realistic blackwork tattoo design with bold solid black ink, strong contrast, and geometric or organic patterns",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/blackwork/sketch-design-blackwork-8.avif",
      },
    ],
  },
  {
    id: 4,
    title: "Old School",
    style: "Old School",
    description: "Classic American traditional tattoos with bold outlines, limited color palette, and iconic designs.",
    prompt: "Generate a realistic old school American traditional tattoo design with bold black outlines, limited color palette, and classic iconic imagery",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/old-school/sketch-design-old-school-8.avif",
      },
    ],
  },
  {
    id: 5,
    title: "Neo Traditional",
    style: "Neo Traditional",
    description: "Modern take on traditional tattoos with expanded color palettes, more detail, and contemporary elements.",
    prompt: "Generate a realistic neo traditional tattoo design, modernizing classic American traditional style with expanded color palette, more detail, and contemporary elements",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/neo-traditional/sketch-design-neo-traditional-8.avif",
      },
    ],
  },
  {
    id: 6,
    title: "Watercolor",
    style: "Watercolor",
    description: "Tattoo designs that mimic watercolor paintings with flowing colors, splashes, and artistic brush strokes.",
    prompt: "Generate a realistic watercolor tattoo design mimicking watercolor painting style with flowing colors, splashes, and artistic brush stroke effects",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/watercolor/sketch-design-watercolor-9.avif",
      },
    ],
  },
  {
    id: 8,
    title: "Hindu Goddess",
    style: "Hindu Goddess / Mythological",
    description: "Sacred and powerful designs featuring Hindu deities and mythological figures with intricate details.",
    prompt: "Generate a realistic Hindu goddess or mythological tattoo design featuring sacred deities with intricate details, traditional iconography, and spiritual symbolism",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/hindu-goddess/sketch-design-hindu-goddess-7.avif",
      },
    ],
  },
  {
    id: 9,
    title: "Chicano",
    style: "Chicano",
    description: "Chicano style tattoos featuring religious imagery, portraits, and cultural symbols with fine linework.",
    prompt: "Generate a realistic Chicano style tattoo design featuring religious imagery, portraits, or cultural symbols with fine linework and detailed shading",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/chicano/sketch-design-chicano-9.avif",
      },
    ],
  },
  {
    id: 12,
    title: "Anime",
    style: "Anime",
    description: "Tattoo designs inspired by anime and manga, featuring characters, symbols, and vibrant anime aesthetics.",
    prompt: "Generate a realistic anime-inspired tattoo design featuring anime or manga characters, symbols, or elements with vibrant colors and distinctive anime aesthetic",
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-0.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-1.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-2.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-3.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-4.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-5.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-6.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-7.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-8.avif",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/designs/anime/sketch-design-anime-9.avif",
      },
    ],
  },
];

export const getSketchDesignByStyleId = (
  id: number
): SketchDesignStyle | undefined => {
  return sketchDesigns.find((design) => design.id === id);
};

export const getSketchDesignByStyle = (
  style: string
): SketchDesignStyle | undefined => {
  return sketchDesigns.find((design) => design.style === style);
};
