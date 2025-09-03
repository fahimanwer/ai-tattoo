import { ImageSourcePropType } from "react-native";

export interface FeaturedTattoo {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType | undefined;
}

export const featuredTattoos: FeaturedTattoo[] = [
  {
    id: 1,
    title: "Japanese",
    description: "Traditional Japanese tattoo with bold lines and vibrant colors",
    image: require("@/assets/tattoos/tattoo-japanese.png"),
  },
  {
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
  },
];
