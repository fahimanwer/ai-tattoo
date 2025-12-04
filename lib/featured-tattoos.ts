import { ImageSourcePropType } from "react-native";

export interface ImageWithBlurHash {
  uri?: string;
  blurhash?: string;
}

export interface FeaturedTattoo {
  id: number;
  title: string;
  short_description: string;
  style: string;
  gallery: ImageWithBlurHash[];
  prompt: string;
  description: string;
  image: ImageWithBlurHash | undefined;
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
    short_description:
      "A traditional style from the Edo period that tells stories on the skin through flowing designs inspired by myth and nature.",
    description:
      "Japanese tattooing, known as Irezumi, has roots tracing back over 2,000 years in Japan. It evolved from early decorative markings and spiritual talismans into an art form deeply tied to folklore, mythology, and woodblock prints (ukiyo-e). During the Edo period (1603-1868), tattooing flourished despite being outlawed, becoming an underground culture of resistance and identity. Motifs such as koi fish represent perseverance, dragons symbolize wisdom and strength, and the Hannya mask reflects human emotion and transformation. Master artists like Horiyoshi III and Horimono traditions elevated Irezumi into a discipline of discipline, storytelling, and body-wide compositions. Historically associated with firemen, laborers, and later the Yakuza, today Japanese tattoos are recognized globally as one of the most sophisticated and narrative-driven styles of tattoo art.",
    style: "Japanese",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/cover.png",
      blurhash: "LAExeIib01TK~BE257?GjDEMEl-U",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-female-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shin-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shoulder-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a Traditional Japanese (irezumi) style tattoo design. The style is characterized by bold black sumi ink outlines with tapered, flowing linework that creates clean, closed shapes in an asymmetrical, dynamic composition. Classic motifs include koi fish symbolizing perseverance, dragons representing wisdom and strength, tigers embodying courage, Hannya masks reflecting emotion and transformation, along with cherry blossoms, peonies, chrysanthemums, dynamic waves (nami), clouds (kumo), wind bars, and smoke elements. The color palette uses flat, high-contrast color blocks in traditional irezumi colors: deep indigo blue, vermilion red, jade green, and gold ochre, layered beneath the black linework with minimal smooth gradients only to suggest subtle depth. The composition emphasizes clear silhouette readability, strong negative space for balance, and a coherent visual hierarchy between primary motifs and background elements. All lines must be continuous and connected with no broken paths, edges must be crisp and precise, and solid black fills are used strategically for contrast. The design should be unique, well-proportioned, and suitable for professional tattoo application with ultra-detailed, high-resolution artwork quality.",
  },
  {
    id: 2,
    title: "Realistic",
    short_description:
      "A style focused on lifelike imagery where shading, gradients, and depth bring portraits, objects, and scenes to the skin with striking fidelity.",
    description:
      "Realistic tattooing emerged in the late 20th century, heavily influenced by fine art, portraiture, and the advancement of modern tattoo machines and pigments. Unlike earlier traditional styles, realism aimed to replicate the exact look of photographs, paintings, or real-life objects on the skin. Common themes include human portraits, animals, and natural elements rendered with precise detail. The technique requires advanced skills in shading, contrast, and tonal transitions to create depth and texture. Major exponents include artists like Nikko Hurtado, Dmitriy Samohin, and Steve Butcher, who pushed realism into hyperrealism by capturing vivid likeness and emotional presence. Today, this style is recognized worldwide as a benchmark of technical mastery and artistic discipline in tattooing.",
    style: "Photorealism",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/cover.png",
      blurhash: "LCDI2pxa00I:~BE256-VkWWV$*s:",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-female-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shoulder-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a realistic (photorealistic) style tattoo design. This style focuses on achieving lifelike imagery through hyper-detailed shading, smooth gradients, and precise tonal transitions that create natural depth and texture. The technique emphasizes proportional accuracy and photographic fidelity, replicating the exact appearance of real subjects. Common motifs include human portraits capturing emotion and likeness, animals rendered with fur texture and anatomical precision, and natural elements like flowers, landscapes, or objects with realistic lighting and shadows. The tattoo work should appear naturally embedded in the skin, using continuous smooth lines combined with fine dot work (stippling) and subtle shading techniques. Color saturation and contrast must be carefully balanced to maintain realism without oversaturation. The design should avoid abstract distortion and maintain clear focus on the main subject with a soft, natural background that doesn't compete for attention. The composition should be unique, well-balanced, and rendered with ultra-sharp details suitable for professional tattoo application at high resolution.",
  },
  {
    id: 3,
    title: "Blackwork",
    short_description:
      "A bold modern style using solid black ink and negative space to create striking organic patterns, flowing designs, and artistic compositions.",
    description:
      "Blackwork is a contemporary tattoo style characterized by the strategic use of solid black ink fills and negative space to create bold, high-contrast designs. This modern approach emphasizes organic, flowing patterns such as swirling clouds, wave-like motifs, floral and leaf patterns, and abstract compositions. The style uses negative space (natural skin tone) as a powerful design element within solid black areas, creating intricate and visually striking patterns. Unlike traditional geometric blackwork, this style focuses on fluid, organic shapes that flow naturally with body contours. The technique requires precise line work and careful planning of negative space to achieve balance and visual harmony. Designs can range from large-scale compositions covering entire body parts to smaller, more delicate patterns. The style emphasizes boldness, clarity, and artistic expression, using only solid black fills and negative space—no gradients, shading, or color. This creates a timeless, powerful aesthetic that stands out for its dramatic contrast and modern artistic sensibility.",
    style: "Solid Black",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-4.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a modern Blackwork style tattoo design characterized by bold, solid black ink fills and strategic use of negative space. This contemporary style emphasizes organic, flowing patterns such as swirling cloud-like formations, wave motifs, floral and leaf patterns, and abstract organic compositions. The technique uses negative space (natural skin tone) as a powerful design element within solid black areas, creating intricate and visually striking patterns that flow naturally with body contours. Designs should feature fluid, organic shapes rather than rigid geometric patterns, with smooth transitions between black fills and negative space. Common motifs include large-scale swirling patterns, wave-like designs, delicate floral and botanical elements, abstract organic shapes, and flowing compositions that wrap around body parts. The composition must be bold, harmonious, and visually balanced, using only solid black fills and negative space—no gray tones, gradients, shading, or color. Line work should be precise and clean, with patterns that are both intricate and readable. The design should emphasize artistic expression and modern aesthetics, creating a timeless, powerful visual statement suitable for professional tattoo application with ultra-detailed, high-resolution artwork quality.",
  },
 
  {
    id: 4,
    title: "Old School",
    short_description:
      "A classic tattoo style with bold outlines, flat colors, and iconic sailor motifs like anchors, roses, daggers, and swallows.",
    description:
      'Old School tattooing, also known as American Traditional, has its roots in the late 19th and early 20th centuries, flourishing among sailors, soldiers, and adventurers. It became the visual language of a generation that used tattoos as symbols of loyalty, love, bravery, and remembrance. This style is defined by bold black outlines, a restricted color palette (red, green, yellow, blue, and black), and simple yet powerful imagery that ensured tattoos remained readable even after years on the skin. Motifs such as anchors represented stability, swallows symbolized safe return, daggers embodied danger or betrayal, while roses and hearts expressed love and devotion. Legendary artists like Norman "Sailor Jerry" Collins shaped this movement, blending Western iconography with Asian influences. Today, Old School remains a timeless cultural icon of tattoo art, celebrated for its heritage, simplicity, and strength of design.',
    style: "Old School",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/cover.png",
      blurhash: "LEBL;Un+0LNa~BbG57so%1Wp9us.",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-4.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shoulder-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create an Old School (American Traditional) style tattoo design. This classic style is defined by bold, thick black outlines that create strong, readable shapes. The color palette is strictly limited to a traditional five-color scheme: vibrant red, forest green, bright yellow, deep blue, and solid black. Colors are applied as flat fills with no gradients or shading - only solid, saturated color blocks. Iconic motifs include anchors symbolizing stability, roses representing love and beauty, daggers embodying danger or betrayal, hearts expressing devotion, swallows representing safe return home, eagles representing freedom, ships for adventure, and snakes for transformation. The design style emphasizes simplicity, boldness, and timeless appeal, with each element having clear symbolism. Composition follows traditional rules: strong contrast, minimal detail, and imagery that remains readable even after years on the skin. The design should be clean, well-balanced, and suitable for professional tattoo application, honoring the heritage of legendary artists like Sailor Jerry while maintaining the strength and clarity that makes Old School tattoos timeless.",
  },
  {
    id: 5,
    title: "Neo Traditional",
    short_description:
      "A modern evolution of American Traditional that combines bold outlines with enhanced detail, expanded color palettes, and sophisticated shading for a contemporary classic look.",
    description:
      "Neo Traditional tattooing emerged in the 1990s as a modern evolution of American Traditional, building upon the foundation laid by Old School masters while pushing the boundaries of technical execution and artistic expression. This style maintains the bold black outlines and iconic motifs of its predecessor—roses, daggers, animals, and symbolic imagery—but elevates them with refined detail, expanded color palettes, and sophisticated shading techniques. Where Old School relied on flat color fills and a restricted palette, Neo Traditional introduces gradients, depth, and a wider spectrum of hues while preserving the strong readability and timeless appeal of traditional designs. Artists like Guy Aitchison, Mike Rubendall, and Valerie Vargas pioneered this movement, proving that tradition could evolve without losing its essence. Today, Neo Traditional represents the perfect fusion of classic American tattooing heritage with contemporary artistic innovation, creating tattoos that honor the past while embracing the future.",
    style: "Neo Traditional",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/cover.png",
      blurhash: "L48WT]-V00NG}@}[I;0L={$*$*R*",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/chest-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/chest-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/hand-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/hand-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a Neo Traditional style tattoo design. This modern evolution of American Traditional maintains the bold black outlines and iconic motifs of Old School (roses, daggers, animals, birds, flowers, skulls) but elevates them with enhanced detail, sophisticated shading techniques, and smooth color gradients. The style uses an expanded color palette beyond traditional limits, incorporating vibrant purples, oranges, teals, deep blues, magentas, and other contemporary hues while preserving the strong contrast and readability of classic designs. Unlike Old School's flat color fills, Neo Traditional introduces dimensional depth through smooth color transitions, subtle shading, and gradient work that adds realism without losing the bold graphic quality. The composition maintains traditional principles of strong contrast and clear hierarchy but allows for more intricate details, refined linework, and artistic expression. Motifs are rendered with greater complexity and nuance while staying true to symbolic meanings. The design should balance modern sophistication with classic appeal, using technical precision to create depth and dimension. The artwork should be suitable for professional tattoo application, honoring traditional roots while showcasing contemporary artistic innovation and expanded creative possibilities.",
  },
  {
      id: 6,
    title: "Watercolor",
    short_description:
      "A modern style that transforms tattoos into living paintings, with flowing brushstrokes, splashes, and vibrant color gradients inspired by watercolor art.",
    description:
      "Watercolor tattooing is a contemporary artistic style inspired by fine art watercolor painting. Emerging in the early 2000s, it challenged traditional tattoo conventions by moving away from rigid black outlines and instead embracing fluidity, transparency, and vibrant palettes. This technique recreates brushstrokes, splashes, and layered gradients, allowing tattoos to look like living paintings on the skin. The art form is influenced by abstract and impressionist painting, using diffusion and blending to mimic how pigment and water interact on paper. Although not rooted in ancient ritual, it represents a cultural shift: tattoos as expressive fine art. Watercolor tattoos celebrate individuality, creativity, and freedom, requiring advanced technical skill to preserve vibrancy and structure over time.",
    style: "Watercolor",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/cover.png",
      blurhash: "L8A9pORj0J-:oy0eWB~Cs*j]=|R%",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/rib-female.png",
        blurhash: "LIA+:GxG0KNH~Bs.9aR+%LoeIpR*",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/rib-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shin-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shin-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shoulder-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shoulder-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/thigh-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/thigh-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/wrist-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
      },
    ],
    prompt:
      "Create a Watercolor style tattoo design. This contemporary style mimics fine art watercolor painting, featuring flowing brushstrokes, paint splashes, and vibrant translucent color gradients that appear to be absorbed into the skin. The palette uses vibrant, saturated colors including blues, reds, purples, greens, yellows, oranges, and pinks, often blending and bleeding into each other naturally. The style intentionally avoids harsh black outlines, instead using soft edges, color transitions, and organic shapes that suggest movement and fluidity. Common motifs include abstract compositions, nature scenes, flowers, animals, or any subject rendered with painterly techniques like color washes, drips, splatters, and blooms. The design should follow body anatomy naturally, with colors that appear to blend seamlessly with skin texture. Transparency and layering effects create depth, mimicking how watercolor pigments interact on paper. The composition should emphasize artistic expression and creativity, using diffused edges and color bleeding to create an impressionistic, living-painting effect. The design should be suitable for professional tattoo application while maintaining the vibrant, fluid aesthetic of watercolor art.",
  },
  {
    id: 7,
    title: "Couples",
    short_description:
      "A romantic style designed for partners, featuring complementary designs, matching motifs, and interconnected symbols that celebrate love and unity through shared body art.",
    description:
      "Couples tattoos represent a modern expression of partnership, commitment, and shared identity through complementary body art. This style emerged from the tradition of matching tattoos but has evolved into sophisticated designs that work both independently and as a unified pair. Couples tattoos can feature complementary motifs like puzzle pieces that fit together, split designs that complete each other, matching symbols with personal variations, or interconnected patterns that tell a shared story. The art form celebrates relationships through meaningful imagery—hearts, infinity symbols, coordinates of special places, dates, quotes, or custom designs that reflect the unique bond between partners. Whether minimalist or elaborate, couples tattoos serve as permanent declarations of love, unity, and the journey shared between two people. This style emphasizes harmony, balance, and the beautiful way two separate pieces can create a complete visual narrative when viewed together.",
    style: "Couples / Matching",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-female-1.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/feet-couple-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/shin-couple-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/shoulder-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/wrist-couple-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-2.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-3.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-4.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/calf-couple-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
      },
    ],
    prompt:
      "Create a Couples tattoo design style, featuring complementary and matching designs designed for partners. This style emphasizes romantic symbolism, unity, and shared identity through interconnected body art. Common motifs include complementary puzzle pieces that fit together, split designs that complete each other when viewed together, matching symbols with personal variations (hearts, infinity symbols, coordinates, dates, quotes), or interconnected patterns that tell a shared story. The designs should work both independently as beautiful individual pieces and as a unified pair when viewed together. The style can range from minimalist and delicate to elaborate and detailed, but always maintains harmony and balance between the two pieces. Color choices should complement each other, using either matching palettes or complementary colors that create visual cohesion. The composition should emphasize the relationship between the designs—whether through symmetry, mirroring, or complementary elements—while ensuring each piece remains meaningful and aesthetically pleasing on its own. The tattoo should celebrate love, commitment, and partnership through meaningful imagery that reflects the unique bond between two people. The design should be suitable for professional tattoo application, creating a permanent declaration of unity and shared journey.",
  },
  {
    id: 8,
    title: "Hindu Goddess",
    short_description:
      "A sacred style inspired by Hindu mythology, featuring divine goddesses, deities, and spiritual symbols rendered with intricate detail, vibrant colors, and traditional iconography.",
    description:
      "Hindu Goddess tattoos draw from the rich spiritual and artistic traditions of Hinduism, celebrating the divine feminine and the powerful deities of Hindu mythology. This style features intricate depictions of goddesses like Lakshmi (goddess of wealth and prosperity), Saraswati (goddess of knowledge and arts), Durga (warrior goddess), Kali (goddess of time and transformation), and Parvati (goddess of love and devotion). The art form incorporates traditional iconography including multiple arms, divine attributes (lotus flowers, conch shells, tridents, veenas), sacred animals, mandalas, and Sanskrit symbols. The style emphasizes vibrant colors—deep blues, rich reds, golden yellows, and emerald greens—combined with detailed linework that captures the ornate jewelry, flowing garments, and divine halos characteristic of Hindu art. These tattoos serve as spiritual expressions, cultural connections, and personal devotions, honoring the divine feminine and the rich heritage of Hindu mythology. The designs balance intricate detail with clear composition, ensuring the sacred imagery remains powerful and readable on the skin.",
    style: "Hindu Goddess / Mythological",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-female-2.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-female-3.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-2.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-3.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/back-female-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/back-male-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/chest-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/neck-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-female-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-female-2.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-male-3.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/thigh-female-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
    ],
    prompt:
      "Create a Hindu Goddess style tattoo design inspired by Hindu mythology and spiritual traditions. This sacred style features intricate depictions of divine goddesses and deities, including Lakshmi (goddess of wealth and prosperity), Saraswati (goddess of knowledge and arts), Durga (warrior goddess), Kali (goddess of time and transformation), and Parvati (goddess of love and devotion). The design incorporates traditional Hindu iconography: multiple arms representing divine power, sacred attributes like lotus flowers, conch shells, tridents, veenas, and divine weapons, mandalas and geometric patterns, Sanskrit symbols and mantras, and sacred animals associated with each deity. The color palette uses vibrant, rich hues: deep blues, rich reds, golden yellows, emerald greens, and royal purples, often with metallic gold accents. The style emphasizes intricate detail work capturing ornate jewelry, flowing traditional garments, divine halos (prabhas), and elaborate crowns or headdresses. The composition should balance intricate detail with clear visual hierarchy, ensuring the sacred imagery remains powerful and readable. The design should honor the spiritual and cultural significance of Hindu mythology while creating a beautiful, meaningful tattoo that serves as both artistic expression and personal devotion. The artwork should be suitable for professional tattoo application, maintaining the ornate beauty and sacred symbolism of traditional Hindu art.",
  },
  {
      id: 9,
    title: "Chicano",
    short_description:
      "A distinctive style born from Mexican-American barrio culture, featuring fine-line black and gray work with iconic motifs like beautiful women, roses, religious imagery, and gothic lettering.",
    description:
      "Chicano tattooing emerged in the 1940s and 1950s from Mexican-American communities in Los Angeles, rooted in Pachuco culture and the zoot suit era. This style draws inspiration from Mexican muralism, Catholic iconography, lowrider culture, and prison art traditions. Characterized by fine-line black and gray work with selective red accents, Chicano tattoos feature iconic motifs including beautiful women (cholas), roses, religious imagery like the Virgin of Guadalupe and crucifixes, skulls (calaveras), clocks, gothic lettering, and family portraits. The style emphasizes realism with precise fine-line work and sophisticated shading techniques, creating compositions that tell personal stories of faith, family, and cultural pride. Master artists like Freddy Negrete, Mark Mahoney, and Jack Rudy elevated this style from underground barrio art to a globally recognized form of cultural expression.",
    style: "Chicano",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/arm-female-1.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/arm-male-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-female-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-female-2.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-2.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-3.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/chest-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-female-2.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-male-1.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-male-2.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/thigh-female-1.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
    ],
    prompt:
      "Create a Chicano style tattoo design rooted in Mexican-American barrio culture and traditions. This distinctive style is characterized by fine-line black and gray work with sophisticated shading techniques, though selective color accents (particularly red) may be used strategically. The technique emphasizes realism with precise fine-line work, smooth black and gray washes that create depth and dimension, and compositions that tell personal stories. Iconic Chicano motifs include beautiful women (cholas) with dramatic makeup, styled hair, and expressive features representing strength and beauty, roses symbolizing love, beauty, and the fleeting nature of life, religious imagery such as the Virgin of Guadalupe, crucifixes, and praying hands representing faith, devotion, and spiritual protection, skulls (calaveras) reflecting Day of the Dead traditions and mortality, clocks and pocket watches symbolizing time, mortality, and the passage of life, gothic lettering and script work with ornate typography, and portraits of family members, cultural icons, or loved ones. The color palette primarily uses black and gray tones with smooth gradients and shading, with selective use of red accents for roses, lettering, or symbolic elements. The style draws inspiration from Mexican muralism, Catholic iconography, lowrider culture, and prison art traditions. The composition should emphasize storytelling, cultural identity, and personal meaning, with each element carefully placed to create a cohesive narrative. The design should honor the rich heritage of Chicano culture while maintaining the distinctive fine-line aesthetic and symbolic power that makes this style unique. The artwork should be suitable for professional tattoo application, rendered with ultra-fine detail and sophisticated shading techniques that capture the depth and realism characteristic of master Chicano tattoo work.",
  },
  {
      id: 10,
    title: "Mini",
    short_description:
      "A delicate and minimalist fine-line style featuring ultra-thin single-needle work, romantic symbolism, and clean compositions perfect for first tattoos and subtle body art.",
    description:
      "Mini tattoos represent a modern, minimalist approach to body art that has gained immense popularity through social media platforms like Instagram and Pinterest. This style emerged in the 2010s as a response to the growing demand for subtle, elegant tattoos that are easy to wear and meaningful to the individual. Characterized by extremely fine lines created with single-needle techniques, mini tattoos emphasize simplicity, breathing room, and delicate aesthetics. The style draws inspiration from romantic flash art, featuring symbolic iconography like hearts, flowers, ribbons, Cupid motifs, and script lettering. These designs are particularly popular among first-time tattoo clients seeking small, discreet pieces with emotional significance. Common placement areas include the wrist, collarbone, fingers, inner forearm, ankle, and behind the ear—locations that allow for personal expression while maintaining professional discretion. The color palette is typically very soft or monochromatic, often using only black outlines with minimal or no color fills. Mini tattoos celebrate the beauty of simplicity, proving that meaningful body art doesn't require size or complexity to make a powerful statement.",
    style: "Mini",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/arm-male-1.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/arm-male-2.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/feet-female-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/feet-male-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/neck-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/neck-male-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-female-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-female-2.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-male-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-female-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-female-2.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
      },
    ],
    prompt:
      "Create a Mini (Fine-line / Minimalist) style tattoo design. This delicate and modern style is characterized by extremely fine lines created with single-needle techniques, creating ultra-thin, precise linework that appears delicate and elegant. The composition emphasizes clean, minimal designs with generous breathing room between elements, allowing each motif to stand out clearly. The style features romantic and symbolic iconography including hearts representing love and emotion, flowers (roses, daisies, small blossoms) symbolizing beauty and growth, ribbons and bows adding a feminine, decorative touch, Cupid motifs representing romance and affection, script lettering with delicate typography for words, quotes, or names, and small geometric shapes or symbols with personal meaning. The color palette is very soft and minimal, typically using only black outlines with no fills, or very subtle, muted color accents if any color is used at all. The designs are small, simple, and easy to tattoo, perfect for first-time clients or those seeking subtle, discreet body art. The aesthetic is inspired by modern social media trends (Pinterest/Instagram style), featuring a romantic flash sheet aesthetic that feels contemporary and feminine. The composition should emphasize simplicity, elegance, and emotional meaning, with each element carefully placed to create a harmonious, balanced design. The linework must be ultra-fine and precise, with clean edges and no unnecessary complexity. The design should be suitable for professional tattoo application, rendered with delicate detail that maintains clarity even at small sizes. The overall feel should be romantic, aesthetic, and universally appealing, perfect for placement on the wrist, collarbone, fingers, inner forearm, ankle, or behind the ear.",
  },
  {
      id: 11,
    title: "Aesthetic",
    short_description:
      "A modern visual style prioritizing beauty, harmony, and decorative design through clean geometric patterns, stylized natural elements, and ornamental compositions.",
    description:
      "Aesthetic tattooing represents a contemporary movement that emerged in the 2010s, heavily influenced by digital design, modern art, and social media visual culture. This style prioritizes visual beauty and harmonious composition over traditional symbolism, creating tattoos that function as decorative art pieces on the skin. The aesthetic movement draws inspiration from Art Deco, Bauhaus design principles, Scandinavian minimalism, and contemporary graphic design. Characterized by clean lines, geometric patterns, stylized natural elements, and ornamental compositions, aesthetic tattoos emphasize balance, symmetry, and visual appeal. The style often incorporates abstract shapes, botanical illustrations, celestial motifs, and decorative borders that create cohesive, visually pleasing designs. Unlike traditional tattoo styles rooted in cultural heritage, aesthetic tattoos focus on universal beauty and modern design sensibilities, making them popular among younger generations who value visual harmony and contemporary artistic expression. The color palette ranges from monochromatic black work to soft pastels and muted tones, always maintaining a refined, sophisticated appearance. Aesthetic tattoos celebrate the intersection of body art and modern design, proving that tattoos can be both meaningful personal expressions and beautiful decorative elements.",
    style: "Aesthetic",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/arm-female-4.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/arm-male-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/back-male-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/feet-male-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/neck-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/neck-male-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/shoulder-female-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/shoulder-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-2.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-3.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-male-2.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
    ],
    prompt:
      "Create an Aesthetic style tattoo design that prioritizes visual beauty, harmony, and decorative composition. This modern style emerged from contemporary design culture, drawing inspiration from Art Deco, Bauhaus principles, Scandinavian minimalism, and contemporary graphic design. The design should emphasize clean, precise lines, geometric patterns, and ornamental compositions that create visual balance and harmony. Common aesthetic motifs include abstract geometric shapes and patterns that create rhythm and flow, stylized botanical elements like leaves, flowers, and plants rendered with clean lines and simplified forms, celestial motifs such as moons, stars, and constellations in decorative arrangements, ornamental borders and frames that add structure and elegance, minimalist line art that creates elegant silhouettes, and decorative patterns inspired by modern design movements. The composition should prioritize visual harmony, balance, and aesthetic appeal over traditional symbolism, creating designs that function as beautiful decorative art on the skin. The color palette can range from monochromatic black work to soft pastels, muted tones, or selective color accents, always maintaining a refined and sophisticated appearance. The style emphasizes clean execution, precise linework, and thoughtful use of negative space to create designs that are both modern and timeless. The aesthetic should feel contemporary, visually pleasing, and universally appealing, celebrating the intersection of body art and modern design. The design should be suitable for professional tattoo application, rendered with clean detail and careful attention to composition, balance, and visual harmony.",
  },
  {
    id: 12,
    title: "Anime",
    short_description:
      "A vibrant style inspired by Japanese animation, featuring dynamic lines, expressive characters, bold colors, and iconic imagery from anime culture.",
    description:
      "Anime tattooing celebrates the distinctive visual language of Japanese animation, characterized by expressive characters with large eyes, dynamic action lines, and vibrant color palettes. This style emerged from the global popularity of anime since the 1960s, allowing fans to permanently display their love for beloved series and characters. The style draws from iconic anime genres including shonen (action-adventure), shojo (romance and drama), mecha (robots), and fantasy anime. Popular motifs include character portraits, iconic symbols from famous series, action scenes with speed lines, chibi versions of characters, and anime-inspired original designs. The technique emphasizes clean, bold outlines similar to cel-shading, vibrant color saturation, and precise detail work. Anime tattoos represent a fusion of pop culture, personal fandom, and artistic expression, reflecting the deep emotional connections fans form with anime narratives and characters.",
    style: "Anime",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-female-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-4.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/back-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/chest-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/chest-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shoulder-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shoulder-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/thigh-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/wrist-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create an Anime style tattoo design inspired by Japanese animation art. This vibrant style celebrates the distinctive visual language of anime and manga, characterized by expressive characters, dynamic action lines, and bold color palettes. The design should capture the essence of anime art with clean, bold outlines similar to cel-shading in animation, vibrant color saturation, and precise detail work. Common anime motifs include character portraits featuring the distinctive anime art style with large expressive eyes, stylized hair, and emotional expressions, iconic symbols and logos from famous anime series, action scenes with speed lines and dynamic movement suggesting motion and energy, chibi (super-deformed) versions of characters with exaggerated cute features, magical elements like sparkles, energy auras, and mystical symbols, and anime-inspired original designs that capture the aesthetic without directly copying specific characters. The color palette uses vibrant, saturated colors typical of anime: bright blues, vivid reds, electric greens, vibrant purples, and bold yellows, often with high contrast and clear color separation. The style draws from various anime genres including shonen (action-adventure with dynamic poses and power effects), shojo (romance and drama with delicate, emotional expressions), mecha (robots and technology with mechanical details), and fantasy anime (magical elements, mystical creatures, and enchanted settings). The composition should emphasize dynamic energy, emotional expression, and the distinctive visual style that makes anime instantly recognizable. Linework should be clean and bold, with clear definition between elements, similar to how anime is drawn with distinct outlines. The design should feel vibrant, energetic, and true to anime aesthetics, allowing fans to express their love for Japanese animation culture through body art. The tattoo should be suitable for professional application, rendered with attention to the characteristic anime art style while maintaining clarity and readability on the skin.",
  },
  {
    id: 13,
    title: "Geometric Animal",
    short_description: "A geometric style featuring bold shapes, lines, and patterns inspired by animals and nature.",
    description: "Create a Geometric Animal style tattoo design inspired by animals and nature. This style emphasizes bold shapes, lines, and patterns that create a sense of movement and energy. Common geometric animal motifs include animals rendered with simple geometric shapes and lines, animals with bold, geometric patterns, animals with simple, clean lines, animals with bold, geometric patterns, animals with simple, clean lines, animals with bold, geometric patterns, animals with simple, clean lines.",
    style: "Geometric Animal",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/cover.png",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/arm-female.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
      },
      
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shin-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shin-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-male.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a Geometric Animal style tattoo design inspired by animals and nature. This style emphasizes bold shapes, lines, and patterns that create a sense of movement and energy. Common geometric animal motifs include animals rendered with simple geometric shapes and lines, animals with bold, geometric patterns, animals with simple, clean lines, animals with bold, geometric patterns, animals with simple, clean lines, animals with bold, geometric patterns, animals with simple, clean lines.",
  },
  {
    id: 14,
    title: "Patchwork",
    short_description:
      "A bold black and grey patchwork sleeve made of individual traditional-inspired motifs with strong lines, solid blacks, and open skin between pieces for a sticker-like collage effect.",
    description:
      "Patchwork is a contemporary evolution of American Traditional and Neo Traditional tattooing, built from many individual standalone pieces that gradually accumulate across any part of the body. Instead of a single continuous mural, areas such as arms, legs, torso, or other body parts are covered over time with distinct tattoos—flowers, snakes, script, daggers, hearts, flames, dice, eyes, and other classic motifs—each with its own clear silhouette. The style is characterized by bold black linework, solid black fills, and dotwork shading, usually with little to no color. Negative space is left intentionally between the pieces so that the skin itself becomes part of the composition, resulting in a sticker-like collage effect on the body. Motifs are typically simplified for readability from a distance, but include enough texture and stippling for visual richness and detail. This approach is popular with those who collect tattoos gradually, allowing each piece to remain distinct while contributing to an overall cohesive look. Patchwork tattoos bridge the gap between classic flash tattoo culture and modern blackwork aesthetics, offering a flexible and highly personal way to build a unique tattoo collection over time.",
    style: "Patchwork",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/cover.png",
      blurhash: "",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/abdomen-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/back-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/back-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male-3.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/hands-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/leg-male.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/neck-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/ribs-female-2.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/ribs-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/shoulder-female.png",
        blurhash: "",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/thigh-female.png",
        blurhash: "",
      },
    ],
    prompt:
      "Create a Patchwork Blackwork Sleeve style tattoo design. This style is built from multiple individual motifs that together create a cohesive sleeve, rather than a single continuous mural. Each motif should have bold, consistent black linework, solid black fills, and dotwork (stippling) shading, using only black and grey—no color. Common motifs include flowers, snakes, daggers, hearts, flames, script lettering, eyes, classic symbols, and small decorative shapes, all rendered in a style that blends American Traditional and Neo Traditional influences. Designs must prioritize clean silhouettes, strong contrast, and high readability from a distance. Leave intentional negative space between motifs so the skin becomes part of the composition, creating a sticker-sleeve or collage aesthetic instead of one big blocked-out piece. All lines should be crisp and closed, with no broken paths, and black fills must be solid and even. The layout should feel like a collection of tattoos that belong together—balanced, harmonious, and flowing with the body—while still allowing each individual piece to stand alone. The artwork should be ultra-detailed, high resolution, and suitable for professional tattooing, with a clear patchwork blackwork sleeve identity.",
  },
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
  return featuredTattoos.find((tattoo) => tattoo.id === id);
};

export const promptToCombineTwoImages = `
You will receive two uploaded images.
Identify which image contains a tattoo on skin (Image A) and which image shows a body part without a tattoo (Image B), regardless of upload order.

Image A → Extract ONLY the tattoo design, removing all skin, lighting, or body context.
Image B → Use it as the target body photo.

Place the extracted tattoo onto the most visible, unobstructed, naturally exposed skin area of Image B.

From the first uploaded image, extract only the tattoo artwork, isolating the design and removing any skin, lighting, body shape, or photographic context. Treat this tattoo strictly as a clean, flat reference.

Then integrate the tattoo onto the most naturally visible and unobstructed skin area of the second uploaded photo, automatically detecting the region with the clearest surface exposure.

The tattoo must conform perfectly to the real anatomy of the selected skin:
	•	follow the exact slope and orientation of the underlying muscles,
	•	wrap around natural skin curvature and micro-folds,
	•	adapt to tension zones where skin stretches or compresses,
	•	subtly distort according to body geometry (never flat).

Blend the tattoo as a fresh but healed-looking piece:
	•	slight redness or mild irritation around edges (very subtle, natural),
	•	micro-diffusion of ink into pores,
	•	matte, low-shine ink finish (no gloss, no plastic look),
	•	slight desaturation on stretched areas,
	•	realistic ink opacity depending on light direction.

Maintain all real skin details from the second image:
pores, tiny hairs, natural uneven texture, micro-wrinkles, bumps, shadows, and color variation.
The tattoo must appear printed into the skin—not on top of it.

Match the exact lighting of the second image:
direction, softness, shadows, color temperature, and exposure.
No floating, no overlay artifacts, no mismatched shadows.

Output only the tattooed skin region in ultra-high resolution, with realistic depth, texture, and anatomy.
`;
