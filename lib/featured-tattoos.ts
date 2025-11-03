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
    prompt: "Create a Traditional Japanese (irezumi) style tattoo design. The style is characterized by bold black sumi ink outlines with tapered, flowing linework that creates clean, closed shapes in an asymmetrical, dynamic composition. Classic motifs include koi fish symbolizing perseverance, dragons representing wisdom and strength, tigers embodying courage, Hannya masks reflecting emotion and transformation, along with cherry blossoms, peonies, chrysanthemums, dynamic waves (nami), clouds (kumo), wind bars, and smoke elements. The color palette uses flat, high-contrast color blocks in traditional irezumi colors: deep indigo blue, vermilion red, jade green, and gold ochre, layered beneath the black linework with minimal smooth gradients only to suggest subtle depth. The composition emphasizes clear silhouette readability, strong negative space for balance, and a coherent visual hierarchy between primary motifs and background elements. All lines must be continuous and connected with no broken paths, edges must be crisp and precise, and solid black fills are used strategically for contrast. The design should be unique, well-proportioned, and suitable for professional tattoo application with ultra-detailed, high-resolution artwork quality."
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
    prompt: "Create a realistic (photorealistic) style tattoo design. This style focuses on achieving lifelike imagery through hyper-detailed shading, smooth gradients, and precise tonal transitions that create natural depth and texture. The technique emphasizes proportional accuracy and photographic fidelity, replicating the exact appearance of real subjects. Common motifs include human portraits capturing emotion and likeness, animals rendered with fur texture and anatomical precision, and natural elements like flowers, landscapes, or objects with realistic lighting and shadows. The tattoo work should appear naturally embedded in the skin, using continuous smooth lines combined with fine dot work (stippling) and subtle shading techniques. Color saturation and contrast must be carefully balanced to maintain realism without oversaturation. The design should avoid abstract distortion and maintain clear focus on the main subject with a soft, natural background that doesn't compete for attention. The composition should be unique, well-balanced, and rendered with ultra-sharp details suitable for professional tattoo application at high resolution."
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
    prompt: "Create a Blackwork style tattoo design rooted in tribal and cultural traditions. This style is characterized by heavy use of solid black ink fills with no gradients or shading, creating bold, high-contrast designs. The technique emphasizes geometric and abstract motifs with sharp, clean edges and strategic use of negative space (skin breaks) to create visual balance and intricate patterns. The style draws inspiration from Polynesian, Maori, and Celtic heritage, incorporating symbolic elements that represent strength, ancestry, and spiritual protection. Common design elements include geometric patterns, tribal symbols, mandalas, ornamental borders, and abstract shapes that flow with body contours. The composition must be bold, ornamental, and harmonious, using only solid black fills and white/negative space - no gray tones, gradients, or color. Line work should be precise and clean, with patterns that are both intricate and readable. The design should be ultra-detailed, high-resolution, and suitable for professional tattoo application, respecting cultural heritage while creating a modern, powerful visual statement."
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
    prompt: "Create a Watercolor style tattoo design. This contemporary style mimics fine art watercolor painting, featuring flowing brushstrokes, paint splashes, and vibrant translucent color gradients that appear to be absorbed into the skin. The palette uses vibrant, saturated colors including blues, reds, purples, greens, yellows, oranges, and pinks, often blending and bleeding into each other naturally. The style intentionally avoids harsh black outlines, instead using soft edges, color transitions, and organic shapes that suggest movement and fluidity. Common motifs include abstract compositions, nature scenes, flowers, animals, or any subject rendered with painterly techniques like color washes, drips, splatters, and blooms. The design should follow body anatomy naturally, with colors that appear to blend seamlessly with skin texture. Transparency and layering effects create depth, mimicking how watercolor pigments interact on paper. The composition should emphasize artistic expression and creativity, using diffused edges and color bleeding to create an impressionistic, living-painting effect. The design should be suitable for professional tattoo application while maintaining the vibrant, fluid aesthetic of watercolor art."
  },
  {
    id: 5,
    title: "Old School",
    short_description: "A classic tattoo style with bold outlines, flat colors, and iconic sailor motifs like anchors, roses, daggers, and swallows.",
    description: "Old School tattooing, also known as American Traditional, has its roots in the late 19th and early 20th centuries, flourishing among sailors, soldiers, and adventurers. It became the visual language of a generation that used tattoos as symbols of loyalty, love, bravery, and remembrance. This style is defined by bold black outlines, a restricted color palette (red, green, yellow, blue, and black), and simple yet powerful imagery that ensured tattoos remained readable even after years on the skin. Motifs such as anchors represented stability, swallows symbolized safe return, daggers embodied danger or betrayal, while roses and hearts expressed love and devotion. Legendary artists like Norman “Sailor Jerry” Collins shaped this movement, blending Western iconography with Asian influences. Today, Old School remains a timeless cultural icon of tattoo art, celebrated for its heritage, simplicity, and strength of design.",
    style: "Old School",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/hand-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/hand-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/abdomen-male.png" }
    ],
    prompt: "Create an Old School (American Traditional) style tattoo design. This classic style is defined by bold, thick black outlines that create strong, readable shapes. The color palette is strictly limited to a traditional five-color scheme: vibrant red, forest green, bright yellow, deep blue, and solid black. Colors are applied as flat fills with no gradients or shading - only solid, saturated color blocks. Iconic motifs include anchors symbolizing stability, roses representing love and beauty, daggers embodying danger or betrayal, hearts expressing devotion, swallows representing safe return home, eagles representing freedom, ships for adventure, and snakes for transformation. The design style emphasizes simplicity, boldness, and timeless appeal, with each element having clear symbolism. Composition follows traditional rules: strong contrast, minimal detail, and imagery that remains readable even after years on the skin. The design should be clean, well-balanced, and suitable for professional tattoo application, honoring the heritage of legendary artists like Sailor Jerry while maintaining the strength and clarity that makes Old School tattoos timeless."
  },
  {
    id: 6,
    title: "Neo Traditional",
    short_description: "A modern evolution of American Traditional that combines bold outlines with enhanced detail, expanded color palettes, and sophisticated shading for a contemporary classic look.",
    description: "Neo Traditional tattooing emerged in the 1990s as a modern evolution of American Traditional, building upon the foundation laid by Old School masters while pushing the boundaries of technical execution and artistic expression. This style maintains the bold black outlines and iconic motifs of its predecessor—roses, daggers, animals, and symbolic imagery—but elevates them with refined detail, expanded color palettes, and sophisticated shading techniques. Where Old School relied on flat color fills and a restricted palette, Neo Traditional introduces gradients, depth, and a wider spectrum of hues while preserving the strong readability and timeless appeal of traditional designs. Artists like Guy Aitchison, Mike Rubendall, and Valerie Vargas pioneered this movement, proving that tradition could evolve without losing its essence. Today, Neo Traditional represents the perfect fusion of classic American tattooing heritage with contemporary artistic innovation, creating tattoos that honor the past while embracing the future.",
    style: "Neo Traditional",
    image: { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/cover.png" },
    gallery: [
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/hand-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/abdomen-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/toe-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/arm-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/thigh-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/back-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/neck-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/hand-female.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/neck-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/back-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/thigh-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/arm-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/toe-male.png" },
      { uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/abdomen-male.png" }
    ],
    prompt: "Create a Neo Traditional style tattoo design. This modern evolution of American Traditional maintains the bold black outlines and iconic motifs of Old School (roses, daggers, animals, birds, flowers, skulls) but elevates them with enhanced detail, sophisticated shading techniques, and smooth color gradients. The style uses an expanded color palette beyond traditional limits, incorporating vibrant purples, oranges, teals, deep blues, magentas, and other contemporary hues while preserving the strong contrast and readability of classic designs. Unlike Old School's flat color fills, Neo Traditional introduces dimensional depth through smooth color transitions, subtle shading, and gradient work that adds realism without losing the bold graphic quality. The composition maintains traditional principles of strong contrast and clear hierarchy but allows for more intricate details, refined linework, and artistic expression. Motifs are rendered with greater complexity and nuance while staying true to symbolic meanings. The design should balance modern sophistication with classic appeal, using technical precision to create depth and dimension. The artwork should be suitable for professional tattoo application, honoring traditional roots while showcasing contemporary artistic innovation and expanded creative possibilities."
  }

];

export const bodyParts = {
  arm: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-3.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-4.png",
  ],
  back: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-male-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-female-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/back-female-2.png",
  ],
  hand: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-hand-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-hand-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-hand-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-hand-2.png",
  ],
  /* thigh: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-neck-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-neck-2.png",
  ], */
  neck: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/neck-female-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-neck-2.png",
  ],
 /*  abdomen: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-3.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/abdomen-4.png",
  ],
  toe: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-3.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/toe-4.png",
  ], */
};

export const getTattooStyleById = (id: number): FeaturedTattoo | undefined => {
  return featuredTattoos.find(tattoo => tattoo.id === id);
};
