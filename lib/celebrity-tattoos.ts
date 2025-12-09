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
    id: 100,
    title: "Athletic Tattoos",
    short_description:
      "Bold, dynamic designs inspired by sports culture featuring motivational quotes, cultural symbols, powerful animals, and athletic imagery that embody dedication, strength, and competitive spirit.",
    description:
      "Athletic tattoos feature bold, recognizable designs inspired by sports culture and achievement. Popular among athletes of all kinds, these tattoos often include motivational text, cultural symbols, animals like lions or tigers symbolizing power, sports equipment, and personal milestones. Placement typically highlights muscular areas such as the chest, arms, or back. Styles favor strong outlines and dynamic forms, sometimes using color to emphasize team spirit or meaning. Athletic tattoos are chosen to represent commitment, strength, heritage, and accomplishment—serving as lasting reminders and personal motivation for athletes and those inspired by their drive.",
    style: "Athletic",
    image: {
      
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/cover_athletic.avif",
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
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/irish-fighter-back.avif",
        blurhash: "",
        prompt: "",
        more_about: "This back tattoo features a thorn design, symbolizing resilience, perseverance, and the strength to overcome obstacles.",
      },

      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/z11back.avif",
        blurhash: "",
        prompt: "",
        more_about:
          "This full back piece blends a roaring lion, koi fish, feather, sacred geometry, and fine-line symbols into one powerful story. The lion represents raw strength and leadership, the koi fish speaks to resilience and transformation, and the feather and geometric elements suggest freedom, balance, and a life guided by knowledge and intention.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/imfull.avif",
        blurhash: "",
        prompt: "",
        more_about:
          "The full chest lion with cubs symbolizes protection, loyalty, and pride in family. The central lion represents the wearer as a guardian and leader, while the cubs reflect legacy and love—reminding the wearer that true strength is measured by how well they protect and support the people they care about most.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/england7-arm.avif",
        blurhash: "",
        prompt: "",
        more_about:
          "The angelic sleeve filled with clouds, light rays, and flowing script is a tribute to faith, guidance, and memory. Angels and wings stand for protection and hope, while the handwritten text preserves promises, names, or personal mantras—turning the arm into a living reminder of spiritual support and emotional resilience.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/scizorshoulder.avif",
        blurhash: "",
        prompt: "",
        more_about:
          "The Polynesian-inspired chest and shoulder tattoo uses bold black patterns, masks, and geometric lines to honor identity, heritage, and life’s journey. Each shape—sun rays, curves, and sharp segments—represents protection, achievements, and the path forward, creating a strong, timeless armor across the upper body.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/m10sleeve.avif",
        blurhash: "",
        prompt: "",
        more_about:
          "The blackwork leg tattoo with a large sports number and child handprints mixes athletic pride with deep personal meaning. The solid black field and bold number echo focus and dedication, while the handprints in negative space symbolize family, presence, and the idea that every step is taken for someone special.",
      },
    ],
    prompt:
      "Create an athletic tattoo design inspired by sports culture. This style is characterized by bold, dynamic designs that reflect dedication, discipline, and competitive spirit across all sports disciplines including MMA, boxing, football, basketball, baseball, running, and endurance sports. Common motifs include motivational quotes and text reflecting determination and mental fortitude, cultural symbols and tribal patterns representing heritage and identity, powerful animals like tigers, lions, eagles, and wolves symbolizing strength and courage, sports-specific imagery and athletic iconography, numbers and dates marking achievements, and personal symbols including family tributes and meaningful iconography. The style emphasizes strong, confident linework with bold black outlines, often incorporating dynamic compositions that reflect movement and energy. Color choices vary from deep blacks and earth tones to vibrant team colors and selective use of color for emphasis. The designs are placed strategically on the body to complement athletic physiques, with chest pieces, forearm sleeves, leg designs, and back pieces being common. The overall aesthetic is powerful, meaningful, and reflects a combination of dedication, heritage, strength, and competitive spirit. The tattoo should be suitable for professional application, rendered with bold detail and clear symbolism that embodies athletic excellence and sports culture.",
  },
];

export const getTattooCategoryById = (id: number): TattooCategory | undefined => {
  return tattooCategories.find((category) => category.id === id);
};
