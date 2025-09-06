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

export const featuredTattoos: FeaturedTattoo[] = [
  {
    id: 1,
    title: "Japanese",
    short_description: "Irezumi clásico: bold sumi outlines, vibrant color blocks, motifs like koi, dragons, Hannya masks and waves.",
    description: "Japanese tattooing, known as Irezumi, has roots tracing back over 2,000 years in Japan. It evolved from early decorative markings and spiritual talismans into an art form deeply tied to folklore, mythology, and woodblock prints (ukiyo-e). During the Edo period (1603-1868), tattooing flourished despite being outlawed, becoming an underground culture of resistance and identity. Motifs such as koi fish represent perseverance, dragons symbolize wisdom and strength, and the Hannya mask reflects human emotion and transformation. Master artists like Horiyoshi III and Horimono traditions elevated Irezumi into a discipline of discipline, storytelling, and body-wide compositions. Historically associated with firemen, laborers, and later the Yakuza, today Japanese tattoos are recognized globally as one of the most sophisticated and narrative-driven styles of tattoo art.",
    style: "Irezumi (Traditional Japanese)",
    image: require("@/assets/tattoos/japanese/cover.png"),
    gallery: [
      require("@/assets/tattoos/japanese/abdomen-female.png"),
      require("@/assets/tattoos/japanese/abdomen-male.png"),
      require("@/assets/tattoos/japanese/arm-female.png"),
      require("@/assets/tattoos/japanese/arm-male.png"),
      require("@/assets/tattoos/japanese/back-female.png"),
      require("@/assets/tattoos/japanese/back-male.png"),
      require("@/assets/tattoos/japanese/hand-female.png"),
      require("@/assets/tattoos/japanese/hand-male.png"),
      require("@/assets/tattoos/japanese/neck-female.png"),
      require("@/assets/tattoos/japanese/neck-male.png"),
      require("@/assets/tattoos/japanese/thigh-female.png"),
      require("@/assets/tattoos/japanese/thigh-male.png"),
      require("@/assets/tattoos/japanese/toe-female.png"),
      require("@/assets/tattoos/japanese/toe-male.png")
    ],
    prompt: "A professional Traditional Japanese (irezumi) tattoo design, isolated on a transparent background. Bold black sumi outlines with tapered linework, clean closed shapes, and a flowing, asymmetrical composition. Include classic motifs such as koi fish, dragon, tiger, Hannya mask, cherry blossoms, peonies, chrysanthemums, dynamic waves (nami), clouds (kumo), wind bars, and smoke elements. Use flat, high-contrast color blocks inspired by irezumi palettes (deep indigo, vermilion red, jade green, gold ochre) layered beneath the black linework; minimal smooth gradients only to suggest depth. Maintain clear silhouette readability, strong negative space, and coherent hierarchy between primary motif and background. Lines must be continuous and connected, no broken paths; edges crisp and precise; allow solid black fills where appropriate. Unique single composition (not mirrored, not duplicated). Ultra detailed, high resolution, ready as a professional tattoo stencil/artwork."
  }
 /*  {
    id: 2,
    title: "Realistic",
    description: "Photorealistic tattoo with incredible detail and shading",
    image: require("@/assets/tattoos/realistic.png"),
  },
  {
    id: 3,
    title: "Blackwork",
    description: "Bold black ink tattoo with solid fills and strong contrast",
    image: require("@/assets/tattoos/blackwork.png"),
  },
  {
    id: 4,
    title: "Watercolor",
    description: "Artistic watercolor style with flowing colors and abstract elements",
    image: require("@/assets/tattoos/watercolor.png"),
  },
  {
    id: 5,
    title: "Geometric",
    description: "Clean geometric patterns with precise lines and shapes",
    image: require("@/assets/tattoos/geometric.png"),
  },
  {
    id: 6,
    title: "Tribal",
    description: "Traditional tribal designs with bold black patterns",
    image: require("@/assets/tattoos/tribal.png"),
  },
  {
    id: 7,
    title: "Neo-Traditional",
    description: "Modern take on traditional tattoo style with enhanced detail",
    image: require("@/assets/tattoos/neo-traditional.png"),
  },
  {
    id: 8,
    title: "Old School",
    description: "Classic American traditional tattoo with bold outlines",
    image: require("@/assets/tattoos/old_school.png"),
  },
  {
    id: 9,
    title: "New School",
    description: "Contemporary cartoon-like style with exaggerated features",
    image: require("@/assets/tattoos/new_school.png"),
  },
  {
    id: 10,
    title: "Minimal",
    description: "Simple, clean lines with minimalist aesthetic",
    image: require("@/assets/tattoos/minimal.png"),
  },
  {
    id: 11,
    title: "Fine Line",
    description: "Delicate single-needle work with thin, precise lines",
    image: require("@/assets/tattoos/fine_line.png"),
  },
  {
    id: 12,
    title: "Dotwork",
    description: "Intricate patterns created entirely with dots and stippling",
    image: require("@/assets/tattoos/dotwork.png"),
  },
  {
    id: 13,
    title: "Mandala",
    description: "Sacred geometric patterns inspired by spiritual symbols",
    image: require("@/assets/tattoos/mandala.png"),
  },
  {
    id: 14,
    title: "Celtic",
    description: "Ancient Celtic knots and interwoven patterns",
    image: require("@/assets/tattoos/celtic.png"),
  },
  {
    id: 15,
    title: "Maori",
    description: "Traditional Polynesian tribal art with cultural significance",
    image: require("@/assets/tattoos/maori.png"),
  },
  {
    id: 16,
    title: "Biomechanical",
    description: "Fusion of organic and mechanical elements",
    image: require("@/assets/tattoos/biomechanical.png"),
  },
  {
    id: 17,
    title: "Gothic",
    description: "Dark, dramatic designs with medieval and gothic elements",
    image: require("@/assets/tattoos/gothic.png"),
  },
  {
    id: 18,
    title: "Anime",
    description: "Japanese animation-inspired characters and artwork",
    image: require("@/assets/tattoos/anime.png"),
  },
  {
    id: 19,
    title: "Chicano",
    description: "Mexican-American cultural art with religious and street elements",
    image: require("@/assets/tattoos/chicano.png"),
  },
  {
    id: 20,
    title: "Surreal",
    description: "Dreamlike, fantastical designs that defy reality",
    image: require("@/assets/tattoos/surreal.png"),
  }, */
];
