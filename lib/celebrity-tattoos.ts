
export interface ImageWithBlurHash {
  uri?: string;
  blurhash?: string;
  prompt?: string;
  more_about?: string;
}

export interface TattooCategory {
  id: number;
  title: string;
  short_description: string;
  style: string;
  gallery: ImageWithBlurHash[];
  prompt: string;
  description: string;
  image: ImageWithBlurHash | undefined;
}

export const tattooCategories: TattooCategory[] = [
  {
    id: 1,
    title: "Athletic Tattoos",
    short_description:
      "Bold, dynamic designs inspired by sports culture featuring motivational quotes, cultural symbols, powerful animals, and athletic imagery that embody dedication, strength, and competitive spirit.",
    description:
      "Athletic tattoos represent a popular genre of body art embraced by athletes across all sports disciplines, from combat sports like MMA and boxing to team sports like football, basketball, and baseball, as well as individual pursuits like running and endurance sports. This style is characterized by bold, confident designs that reflect dedication, discipline, and competitive spirit. Common elements include motivational quotes and text that serve as daily reminders of goals and values, cultural symbols and tribal patterns that honor heritage and identity, powerful animals like tigers, lions, eagles, and wolves representing strength and determination, sports-specific imagery and iconography, numbers and dates marking significant achievements or milestones, and personal symbols including family tributes and meaningful iconography. The designs are strategically placed to complement athletic physiques, with chest pieces, forearm sleeves, leg designs, and back pieces being popular choices. The style emphasizes strong linework with bold black outlines, often incorporating dynamic compositions that reflect movement and energy. Color palettes vary widely, from deep blacks and earth tones to vibrant team colors and selective use of color for emphasis. Athletic tattoos tell a story of perseverance, achievement, and personal identity, making them a powerful form of self-expression for athletes and sports enthusiasts who want to celebrate their dedication, heritage, and competitive spirit.",
    style: "Athletic",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/irish-fighter-back.avif",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/chest-irish-fighter.avif",
        blurhash: "",
        prompt: "",
        more_about: "The crowned gorilla biting a heart symbolizes raw power, leadership, and taking control rather than waiting for it. The tattoo portrays strength, aggression, and emotion all at once—a reminder that victory comes with risk and instinct.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/abdomen-irish-fighter.avif",
        blurhash: "",
        prompt: "",
        more_about: "The tiger represents strength, instinct, and survival. Placed at the center of the body, it reflects power from within—an inner beast that stays alert and ready. It’s a symbol of determination, dominance, and fearlessness.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/arm-irish-fighter.avif",
        blurhash: "",
        prompt: "",
        more_about: "The arm tattoo combines a dagger, roses, a clock, and a heart, symbolizing the balance between love and pain, the passing of time, and the acceptance of life and death. The vintage style and bold lines give it a classic, timeless look that reflects resilience and experience.",
      },
    
    ],
    prompt:
      "Create an athletic tattoo design inspired by sports culture. This style is characterized by bold, dynamic designs that reflect dedication, discipline, and competitive spirit across all sports disciplines including MMA, boxing, football, basketball, baseball, running, and endurance sports. Common motifs include motivational quotes and text reflecting determination and mental fortitude, cultural symbols and tribal patterns representing heritage and identity, powerful animals like tigers, lions, eagles, and wolves symbolizing strength and courage, sports-specific imagery and athletic iconography, numbers and dates marking achievements, and personal symbols including family tributes and meaningful iconography. The style emphasizes strong, confident linework with bold black outlines, often incorporating dynamic compositions that reflect movement and energy. Color choices vary from deep blacks and earth tones to vibrant team colors and selective use of color for emphasis. The designs are placed strategically on the body to complement athletic physiques, with chest pieces, forearm sleeves, leg designs, and back pieces being common. The overall aesthetic is powerful, meaningful, and reflects a combination of dedication, heritage, strength, and competitive spirit. The tattoo should be suitable for professional application, rendered with bold detail and clear symbolism that embodies athletic excellence and sports culture.",
  },
];

export const getTattooCategoryById = (id: number): TattooCategory | undefined => {
  return tattooCategories.find((category) => category.id === id);
};

