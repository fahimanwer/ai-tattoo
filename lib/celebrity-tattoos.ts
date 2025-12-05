
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
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/celebrity/conor-mcgregor/tiger-chest.png",
        blurhash: "",
        prompt: "",
        more_about: "Chest tattoos featuring powerful animals, cultural symbols, or bold designs are popular among athletes across all sports. The chest placement symbolizes heart, courage, and determination—core qualities of athletic excellence. These designs serve as prominent statement pieces that reflect dedication and strength. Perfect for athletes in MMA, boxing, football, basketball, and other sports who want bold, meaningful body art that embodies their competitive spirit and personal values.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/celebrity/conor-mcgregor/celtic-forearm.png",
        blurhash: "",
        prompt: "",
        more_about: "Forearm tattoos featuring tribal patterns, cultural symbols, geometric designs, or sports-related imagery are highly visible and popular among athletes. These designs honor heritage, represent personal identity, or celebrate athletic achievements. The forearm placement makes the tattoo prominent during competition and training, serving as a constant reminder of goals and values. Ideal for athletes in any sport who want meaningful, symbolic designs that reflect their dedication and cultural pride.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/celebrity/conor-mcgregor/motivational-quote.png",
        blurhash: "",
        prompt: "",
        more_about: "Motivational quote and text tattoos are extremely popular among athletes across all sports disciplines. These words serve as daily reminders of goals, values, and the mental fortitude required to achieve greatness. Quote tattoos carry deep personal meaning and can inspire during training, competition, and everyday life. This style is perfect for athletes in MMA, boxing, football, basketball, baseball, running, and all sports who want to carry their personal mantras or motivational words as permanent reminders of what drives them forward.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/celebrity/conor-mcgregor/irish-symbols-back.png",
        blurhash: "",
        prompt: "",
        more_about: "Back pieces featuring cultural symbols, tribal patterns, intricate designs, or large-scale compositions create powerful statements of identity and personal narrative. The back provides a large canvas for complex designs that tell a complete story. This placement is popular among athletes who want to honor their heritage, celebrate achievements, or display meaningful imagery. The intricate detail work showcases artistic skill while carrying deep symbolic significance, making it a bold choice for athletes across all sports.",
      },
    ],
    prompt:
      "Create an athletic tattoo design inspired by sports culture. This style is characterized by bold, dynamic designs that reflect dedication, discipline, and competitive spirit across all sports disciplines including MMA, boxing, football, basketball, baseball, running, and endurance sports. Common motifs include motivational quotes and text reflecting determination and mental fortitude, cultural symbols and tribal patterns representing heritage and identity, powerful animals like tigers, lions, eagles, and wolves symbolizing strength and courage, sports-specific imagery and athletic iconography, numbers and dates marking achievements, and personal symbols including family tributes and meaningful iconography. The style emphasizes strong, confident linework with bold black outlines, often incorporating dynamic compositions that reflect movement and energy. Color choices vary from deep blacks and earth tones to vibrant team colors and selective use of color for emphasis. The designs are placed strategically on the body to complement athletic physiques, with chest pieces, forearm sleeves, leg designs, and back pieces being common. The overall aesthetic is powerful, meaningful, and reflects a combination of dedication, heritage, strength, and competitive spirit. The tattoo should be suitable for professional application, rendered with bold detail and clear symbolism that embodies athletic excellence and sports culture.",
  },
];

export const getTattooCategoryById = (id: number): TattooCategory | undefined => {
  return tattooCategories.find((category) => category.id === id);
};

