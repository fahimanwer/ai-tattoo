import { ImageSourcePropType } from "react-native";

export interface FeaturedTattoo {
  id: number;
  title: string;
  short_description: string;
  style: string;
  gallery: ImageSourcePropType[];
  prompt: string;
  description: string;
  image: ImageSourcePropType | undefined;
}

export interface BodyPartVariant {
  id: string;
  name: string;
  image: ImageSourcePropType;
  imageUrl: string;
  description: string;
  tattooStyleId: number;
}

export interface BodyPartCategory {
  id: string;
  name: string;
  label: string;
  description: string;
  image: ImageSourcePropType;
  gallery: BodyPartVariant[];
  tattooStyleId: number;
}

export const featuredTattoos: FeaturedTattoo[] = [
  {
    id: 1,
    title: "Japanese",
    short_description: "A traditional style from the Edo period that tells stories on the skin through flowing designs inspired by myth and nature.",    description: "Japanese tattooing, known as Irezumi, has roots tracing back over 2,000 years in Japan. It evolved from early decorative markings and spiritual talismans into an art form deeply tied to folklore, mythology, and woodblock prints (ukiyo-e). During the Edo period (1603-1868), tattooing flourished despite being outlawed, becoming an underground culture of resistance and identity. Motifs such as koi fish represent perseverance, dragons symbolize wisdom and strength, and the Hannya mask reflects human emotion and transformation. Master artists like Horiyoshi III and Horimono traditions elevated Irezumi into a discipline of discipline, storytelling, and body-wide compositions. Historically associated with firemen, laborers, and later the Yakuza, today Japanese tattoos are recognized globally as one of the most sophisticated and narrative-driven styles of tattoo art.",
    style: "Traditional",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/hand-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/hand-female.png" },      
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/abdomen-male.png" },
    ],
    prompt: "A professional Traditional Japanese (irezumi) tattoo design, isolated on a transparent background. Bold black sumi outlines with tapered linework, clean closed shapes, and a flowing, asymmetrical composition. Include classic motifs such as koi fish, dragon, tiger, Hannya mask, cherry blossoms, peonies, chrysanthemums, dynamic waves (nami), clouds (kumo), wind bars, and smoke elements. Use flat, high-contrast color blocks inspired by irezumi palettes (deep indigo, vermilion red, jade green, gold ochre) layered beneath the black linework; minimal smooth gradients only to suggest depth. Maintain clear silhouette readability, strong negative space, and coherent hierarchy between primary motif and background. Lines must be continuous and connected, no broken paths; edges crisp and precise; allow solid black fills where appropriate. Unique single composition (not mirrored, not duplicated). Ultra detailed, high resolution, ready as a professional tattoo stencil/artwork."
  },
  {
    id: 2,
    title: "Realistic",
    short_description: "A style focused on lifelike imagery where shading, gradients, and depth bring portraits, objects, and scenes to the skin with striking fidelity.",
    description: "Realistic tattooing emerged in the late 20th century, heavily influenced by fine art, portraiture, and the advancement of modern tattoo machines and pigments. Unlike earlier traditional styles, realism aimed to replicate the exact look of photographs, paintings, or real-life objects on the skin. Common themes include human portraits, animals, and natural elements rendered with precise detail. The technique requires advanced skills in shading, contrast, and tonal transitions to create depth and texture. Major exponents include artists like Nikko Hurtado, Dmitriy Samohin, and Steve Butcher, who pushed realism into hyperrealism by capturing vivid likeness and emotional presence. Today, this style is recognized worldwide as a benchmark of technical mastery and artistic discipline in tattooing.",
    style: "Photorealism",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/hand-male.png" },
      { uri:  "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/hand-female.png" },      
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/abdomen-male.png" },
    ],
    prompt: "A professional realistic tattoo design, isolated on a transparent background. Hyper-detailed shading and gradients to replicate lifelike imagery, with smooth tonal transitions and precise contrast. Focus on natural depth, texture, and proportional accuracy. Suitable motifs include human portraits, animals, and natural elements. Ink work should appear embedded in the skin, with clear realism and no abstract distortion. Continuous smooth lines combined with fine dot shading, high resolution, ultra sharp details, unique single composition (not mirrored, not duplicated), professional tattoo artwork ready for application."
  },
  {
    id: 3,
    title: "Blackwork",
    short_description: "A bold style rooted in tribal and cultural traditions, using solid black ink and negative space for symbolic storytelling.",
    description: "Blackwork tattooing has its origins in ancient tribal practices, including Polynesian, Maori, and Celtic cultures. These tattoos were rich with symbolism, representing strength, ancestry, and spiritual protection. Over time, blackwork evolved into a modern graphic tattoo style known for its heavy contrast, solid black fills, and ornamental geometric patterns. This style emphasizes boldness and clarity, using negative space as a powerful design element to create striking visual narratives that honor cultural heritage and personal identity.",
    style: "Solid Black",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/hand-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/hand-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/abdomen-male.png" }
    ],
    prompt: "A professional Blackwork tattoo design rooted in tribal and cultural traditions. Heavy use of solid black fills, geometric and abstract motifs, sharp edges, clean negative space, high contrast. Inspired by Polynesian, Maori, and Celtic heritage, symbolizing strength, ancestry, and spiritual protection. The composition must be bold, ornamental, and harmonious, without gradients or shading. Ultra detailed, high resolution, suitable as a professional tattoo stencil/artwork."
  },
  {
    id: 4,
    title: "Watercolor",
    short_description: "A modern style that transforms tattoos into living paintings, with flowing brushstrokes, splashes, and vibrant color gradients inspired by watercolor art.",
    description: "Watercolor tattooing is a contemporary artistic style inspired by fine art watercolor painting. Emerging in the early 2000s, it challenged traditional tattoo conventions by moving away from rigid black outlines and instead embracing fluidity, transparency, and vibrant palettes. This technique recreates brushstrokes, splashes, and layered gradients, allowing tattoos to look like living paintings on the skin. The art form is influenced by abstract and impressionist painting, using diffusion and blending to mimic how pigment and water interact on paper. Although not rooted in ancient ritual, it represents a cultural shift: tattoos as expressive fine art. Watercolor tattoos celebrate individuality, creativity, and freedom, requiring advanced technical skill to preserve vibrancy and structure over time.",
    style: "Watercolor / Abstract Painting",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/hand-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/hand-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/abdomen-male.png" }
    ],
    prompt: "A hyper realistic 4K photo of human skin with a Watercolor tattoo. The tattoo features flowing brushstrokes, splashes of vibrant colors (blue, red, purple, green, yellow) and translucent gradients that look like watercolor paint absorbed into the skin. The ink follows the anatomy naturally, adapting to pores, veins, and fine skin texture. No harsh black outlines, only soft edges and blending colors. The photo should look like a professional studio shot, with cinematic lighting, ultra sharp focus, and natural shadows on the body. Background pure black, no external shadows, only the realistic shading and texture of the skin and tattoo."
  }
];

export const bodyParts = {
  arm: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-2.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-3.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-4.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-5.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-6.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-7.png",
    ],
  },
  back: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-1.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-2.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-3.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-4.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-female-1.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-female-2.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-female-3.png",
    ],
  },
  hand: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/hand-male-1.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/hand-male-2.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/hand-female-1.png",
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/hand-female-2.png",
    ],
  },
  thigh: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/thigh-male-1.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/thigh-female-1.png",
    ],
  },
  neck: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/neck-male-1.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/neck-female-1.png",
    ],
  },
  abdomen: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-male-1.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-female-1.png",
    ],
  },
  toe: {
    male: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-male-1.png",
    ],
    female: [
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-female-1.png",
    ],
  },
};

export const getTattooStyleById = (id: number): FeaturedTattoo | undefined => {
  return featuredTattoos.find(tattoo => tattoo.id === id);
};
