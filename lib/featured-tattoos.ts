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
    title: "Wolf",
    description: "Wolf tattoo",
    image: require("@/assets/tattoos/wolf.png"),
  },
  {
    id: 2,
    title: "JJ Jordan",
    description: "JJ Jordan tattoo",
    image: require("@/assets/tattoos/jj-jordan.jpg"),
  },
  {
    id: 3,
    title: "Butterfly",
    description: "Butterfly tattoo",
    image: require("@/assets/tattoos/butterfly.png"),
  },
];
