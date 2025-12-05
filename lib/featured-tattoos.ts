import { ImageSourcePropType } from "react-native";

export interface ImageWithBlurHash {
  uri?: string;
  blurhash?: string;
  prompt?: string;
  more_about?: string;
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
        prompt: "",
        more_about: "The arm is the perfect canvas to tell your personal story. A Japanese tattoo here symbolizes strength and determination—motifs like koi fish represent perseverance and overcoming obstacles. It's visible yet discreet, ideal for expressing your identity with elegance. Every time you see it, you're reminded of your inner power and the journey you're on.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-female-3.png",
        blurhash: "",
        prompt: "",
        more_about: "Cherry blossoms on your arm symbolize the ephemeral beauty of life and constant renewal. This placement flows beautifully with your movements, reminding you daily to live in the present with grace. The arm is perfect for a design you want to see and share, becoming part of your visible identity and a conversation starter about beauty and impermanence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is your canvas of personal expression. A Japanese design here with peonies or chrysanthemums represents prosperity and longevity. This placement is ideal for a tattoo you want to see and share, becoming part of your visible identity. The flowing design moves with you, symbolizing growth and the continuous journey of life.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm represents strength and action. A dragon or tiger here symbolizes power, wisdom, and protection—perfect for a design you want to show with pride. This placement becomes a statement of your character and values, visible whenever you move, reminding you of your inner strength and the courage to face any challenge.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Waves and wind on your arm symbolize the constant flow of life and adaptability. This placement is ideal for a design that moves with you, reminding you that life is a constant journey and you must flow with change. The arm's visibility makes it perfect for carrying symbols of resilience and the ever-changing nature of existence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is the largest and most sacred canvas for telling your complete story. A Japanese horimono here represents spiritual protection and strength. This placement is perfect for a design that carries an entire narrative, becoming your personal armor and life story. It's intimate yet powerful, visible when you choose to reveal it, making it deeply personal.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is your personal shield and the most intimate place to express your essence. A Japanese design here with flowers symbolizes inner beauty and strength. Perfect for a tattoo you carry as spiritual protection, visible when you decide to show it. This placement allows for larger, more detailed designs that follow your body's natural curves, creating a powerful statement of grace and resilience.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shin-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin represents your foundation and grounding. A Japanese design here with waves or wind symbolizes stability and forward movement. Perfect for a tattoo that reminds you of your roots while you advance in life—always visible with every step you take. This placement is ideal for designs that inspire you to keep moving forward, symbolizing perseverance and the journey ahead.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin reflects your determination. A dragon or koi here represents perseverance and strength to keep going forward. This placement is ideal for a design that inspires you with every step, becoming a constant reminder of your ability to overcome. The shin's visibility makes it perfect for carrying symbols of resilience and the power to push through any obstacle.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shoulder-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is where you carry your responsibilities and dreams. A Japanese design here symbolizes strength and protection. Perfect for a tattoo that reminds you of your ability to bear any burden with grace, visible when you show confidence and determination. This placement is ideal for designs that represent your role as a protector and leader.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder represents your strength and leadership capacity. A dragon or tiger here symbolizes power and protection over what you love most. This placement is ideal for a design you want to show with pride, becoming a statement of your strong and noble character. The shoulder's prominence makes it perfect for carrying symbols of authority and guardianship.",
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
        prompt: "",
        more_about: "Your arm is the perfect place to carry a piece of art that looks so real it could be a photograph. A realistic tattoo here—whether a portrait of a loved one, a beloved pet, or a meaningful flower—becomes a permanent reminder of what matters most. The arm's visibility means you'll see this masterpiece daily, and its placement allows the design to flow naturally with your movements, making it feel like a part of you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-female-3.png",
        blurhash: "",
        prompt: "",
        more_about: "A photorealistic tattoo on your arm captures emotion and likeness with incredible detail. This placement is ideal for portraits or meaningful imagery you want to keep close—every glance reminds you of the person, memory, or moment it represents. The arm's natural curves enhance the three-dimensional effect, making the tattoo appear to come alive with every movement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm offers the perfect canvas for realistic art that tells your story. Whether it's a flower representing growth, an animal symbolizing your spirit, or a portrait capturing a moment in time, this placement makes your tattoo a visible part of your identity. The realistic style ensures it looks timeless and sophisticated, something you'll be proud to show for years to come.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is your statement piece—a realistic tattoo here showcases technical mastery and personal meaning. Whether it's a portrait, animal, or object that represents your values, this placement makes it part of your daily presence. The arm's visibility means this art becomes part of how others see you, while its realistic detail ensures it remains impressive and meaningful for a lifetime.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "A photorealistic tattoo on your arm is like carrying a masterpiece with you everywhere. This placement is perfect for designs that require detail and depth—the arm's natural shape enhances the three-dimensional effect. Whether it's a portrait, landscape, or meaningful object, this realistic style ensures your tattoo looks like fine art, something that will inspire admiration and conversation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is the ultimate canvas for a large-scale realistic masterpiece. This placement allows for intricate detail and complex compositions—perfect for portraits, landscapes, or scenes that tell your story. The back's flat surface showcases photorealistic work beautifully, and its intimate nature means this art is yours to reveal when you choose, making it deeply personal and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is your gallery wall—perfect for a realistic tattoo that demands attention and detail. This placement allows for larger, more complex designs that showcase the full potential of photorealistic art. Whether it's a portrait, landscape, or meaningful scene, your back provides the space and visibility to create something truly spectacular that represents your story and values.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shin-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is an ideal place for a realistic tattoo that moves with you. This placement is perfect for vertical designs like flowers, animals, or portraits—the shin's natural shape enhances the composition. Every step you take brings this art to life, making it a constant companion on your journey. The realistic style ensures it looks sophisticated and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "A realistic tattoo on your shin is like carrying art with every step. This placement is perfect for designs that represent your journey forward—whether it's an animal symbolizing strength, a flower representing growth, or a portrait of someone important. The shin's visibility means this meaningful art is always with you, inspiring you to keep moving forward.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shoulder-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is the perfect spot for a realistic tattoo that represents strength and protection. This placement is ideal for portraits, animals, or meaningful imagery you want to carry with pride. The shoulder's prominence makes it visible when you're confident and active, while the realistic style ensures your tattoo looks like a work of art that tells your story.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is where you carry your responsibilities—a realistic tattoo here symbolizes what matters most to you. This placement is perfect for portraits, animals, or scenes that represent your values. The shoulder's natural curve enhances the three-dimensional effect of realistic work, making your tattoo appear to come alive and reminding you daily of what you stand for.",
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
        prompt: "",
        more_about: "Your arm is the perfect canvas for bold, modern blackwork art. The flowing organic patterns—like swirling clouds or waves—create a striking contrast that moves beautifully with your arm's natural curves. This placement is ideal for designs that make a statement about your artistic side and modern sensibility. The bold black and negative space create a timeless look that's both powerful and elegant, something you'll love showing off.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is your statement piece—blackwork here creates dramatic visual impact with its bold contrast. The organic patterns flow naturally with your movements, making this art feel alive. This placement is perfect for expressing your bold personality and modern aesthetic. The striking black and negative space design ensures your tattoo stands out while remaining timeless and sophisticated.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-3.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is ideal for blackwork that showcases your artistic side. The fluid organic patterns create visual drama that flows with your body's natural shape. This placement makes your tattoo a conversation starter—the bold contrast and modern design reflect confidence and style. Every movement brings these patterns to life, making this art a constant part of your presence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male-4.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm offers the perfect space for intricate blackwork patterns. Whether it's waves, abstract shapes, or botanical elements, this placement allows the design to wrap beautifully around your arm. The bold black and negative space create a striking look that's both modern and timeless. This is perfect for expressing your unique style and artistic appreciation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is the ideal canvas for blackwork that makes a bold statement. The flowing organic patterns create visual harmony that moves with you, while the dramatic contrast ensures your tattoo stands out. This placement is perfect for designs that reflect your modern sensibility and artistic taste. The bold black and negative space create a powerful, timeless aesthetic.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is the ultimate canvas for large-scale blackwork art. This placement allows for dramatic compositions that wrap around your body, creating a powerful statement piece. The bold black and negative space patterns flow beautifully with your natural curves, making this art deeply personal and visually striking. Perfect for expressing your bold artistic side.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is perfect for blackwork that demands attention. This placement allows for larger, more complex designs that showcase the full power of bold contrast. The organic patterns wrap around your body, creating a striking visual impact. This is ideal for expressing your modern aesthetic and artistic appreciation—a statement piece that's yours to reveal when you choose.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is perfect for blackwork that moves with every step. The vertical placement enhances flowing patterns, creating a design that's both bold and elegant. This placement is ideal for expressing your modern style—the striking contrast and organic shapes make a statement while remaining sophisticated. Every step brings this art to life.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin offers the perfect vertical canvas for blackwork art. The bold black and negative space create dramatic contrast that flows beautifully with your leg's natural shape. This placement is ideal for designs that represent movement and forward progress. The striking patterns make a bold statement while maintaining elegance and sophistication.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is ideal for blackwork that represents strength and movement. The vertical placement enhances the flowing patterns, creating visual impact with every step. This placement is perfect for expressing your bold personality and modern aesthetic. The striking contrast ensures your tattoo stands out while remaining timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin is perfect for blackwork that moves with you. The organic patterns flow naturally with your leg's contours, creating a design that's both bold and harmonious. This placement is ideal for expressing your modern style and artistic appreciation. Every step brings these striking patterns to life, making this art a constant companion.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is the perfect spot for blackwork that represents strength and style. This placement allows the bold patterns to flow beautifully with your shoulder's natural curve. The dramatic contrast creates visual impact, making this art visible when you're confident and active. Perfect for expressing your bold personality and modern aesthetic.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is ideal for blackwork that makes a statement. The flowing organic patterns create visual drama that enhances your natural strength. This placement is perfect for designs that reflect your modern sensibility and artistic taste. The bold contrast ensures your tattoo stands out, while the organic shapes maintain harmony with your body.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is perfect for blackwork that represents power and style. The bold black and negative space create striking patterns that flow with your shoulder's natural shape. This placement is ideal for expressing your modern aesthetic and artistic appreciation. The dramatic contrast makes this art visible when you're confident, creating a powerful statement.",
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
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/cover.avif",
      blurhash: "LEBL;Un+0LNa~BbG57so%1Wp9us.",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-female.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is perfect for classic Old School art that tells a timeless story. An anchor here symbolizes stability and staying grounded, while roses represent love and beauty. Swallows mean safe return home—perfect for someone always on the move. This placement is ideal for designs you want to see daily, reminding you of your values and adventures. The bold colors and simple design ensure it stays beautiful for years.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-2.avif",
        blurhash: "",
        prompt: "",
        more_about: "The arm is your canvas for Old School symbols that speak to your character. A dagger represents courage and protection, an eagle means freedom, and ships symbolize adventure. This placement is perfect for showing your bold personality and honoring tattoo tradition. The classic design ensures it looks great for decades, becoming part of your story.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-3.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is ideal for Old School art that carries meaning. An anchor means stability, roses represent love, hearts show devotion, and swallows promise safe return. This placement makes your tattoo visible and meaningful—every glance reminds you of what matters. The bold design stands the test of time, just like the values it represents.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male-4.avif",
        blurhash: "",
        prompt: "",
        more_about: "The arm is perfect for timeless Old School symbols. An eagle represents freedom and strength, a dagger shows courage, ships mean adventure, and roses symbolize love. This placement is ideal for expressing your values through classic tattoo art. The bold design ensures it remains readable and beautiful for years, becoming part of your identity.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/arm-male.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is the ideal place for Old School art that honors tradition. Anchors symbolize stability, swallows mean safe return, hearts show love, and daggers represent protection. This placement makes your tattoo part of your daily presence, reminding you of your values. The classic design is timeless, just like the stories it tells.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/back-female.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your back is the perfect canvas for a large Old School piece that tells your complete story. This placement allows for multiple symbols that represent different aspects of your life—love, adventure, strength, and loyalty. The back's space lets you create a narrative that's deeply personal, visible when you choose to share it. Classic Old School art here becomes your personal statement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/back-male.avif",
        blurhash: "",
        prompt: "",
        more_about: "The back is ideal for Old School art that represents your journey. Eagles symbolize freedom, ships mean adventure, anchors show stability, and roses represent love. This placement allows for larger designs that tell your story. The classic style ensures it remains timeless and meaningful, becoming part of your identity and heritage.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shin-female.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is perfect for Old School art that moves with every step. Roses represent love and beauty, hearts show devotion, anchors mean stability, and swallows promise safe return. This placement is ideal for designs that inspire you forward. The classic style ensures it stays beautiful for years, reminding you of your values with every step.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shin-male.avif",
        blurhash: "",
        prompt: "",
        more_about: "The shin is ideal for Old School symbols that represent your journey. Anchors mean staying grounded, daggers show courage, ships symbolize adventure, and eagles represent freedom. This placement is perfect for designs that move with you, reminding you of your values. The classic design ensures it remains timeless and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shoulder-female.avif",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is perfect for Old School art that represents strength and values. This placement is ideal for classic motifs that remind you of what matters—love, adventure, loyalty, and freedom. The shoulder's prominence makes your tattoo visible when you're confident, while the timeless design ensures it stays beautiful for decades.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/shoulder-male.avif",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is ideal for Old School symbols that represent your character. Anchors mean stability, roses show love, hearts represent devotion, and swallows promise safe return. This placement is perfect for expressing your values through classic tattoo art. The bold design ensures it stands out while remaining timeless and meaningful.",
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
        prompt: "",
        more_about: "Your arm is perfect for Neo Traditional art that honors classic tattoo heritage while embracing modern innovation. This style takes timeless symbols—roses for love, daggers for courage, animals for strength—and elevates them with stunning detail and vibrant colors. The arm's visibility means you'll appreciate this art daily, and its placement allows the design to flow beautifully with your movements. Perfect for expressing your appreciation of tradition with a contemporary twist.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is ideal for Neo Traditional art that combines classic beauty with modern sophistication. Roses symbolize love and growth, daggers represent protection, and animals show your spirit. This placement makes your tattoo part of your daily presence, reminding you of your values. The enhanced detail and smooth gradients create depth that traditional styles can't match, making this art truly special.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is the perfect canvas for Neo Traditional art that showcases technical mastery. This style takes classic symbols and elevates them with sophisticated shading and vibrant colors. The arm's visibility means this art becomes part of your identity, while the enhanced detail ensures it remains impressive for years. Perfect for expressing your appreciation of tattoo tradition with modern innovation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm offers the ideal space for Neo Traditional art that honors the past while embracing the future. Traditional motifs like eagles, daggers, or flowers gain new life with dimensional depth and refined linework. This placement makes your tattoo visible and meaningful—every glance reminds you of your values. The smooth color transitions create depth that makes this art truly stand out.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Large Neo Traditional back piece on female back displaying classic American Traditional heritage with contemporary artistic innovation and expanded creative possibilities.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Neo Traditional back tattoo on male back showcasing modern evolution of traditional style with enhanced detail, sophisticated shading, and vibrant contemporary colors.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/chest-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Neo Traditional tattoo on female chest featuring bold outlines with refined detail, smooth gradients, and expanded color palette creating dimensional depth.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/chest-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Modern Neo Traditional chest piece on male chest displaying classic motifs elevated with sophisticated shading techniques and contemporary color palette.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/hand-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Neo Traditional tattoo on female hand showcasing traditional heritage with modern innovation, featuring enhanced detail and expanded color possibilities.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/hand-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your hand is perfect for Neo Traditional art that honors tradition with modern innovation. This placement makes your tattoo visible in every gesture, reminding you of your values. The refined detail and smooth color transitions create depth that traditional styles can't match. Perfect for expressing your appreciation of classic tattoo art with a contemporary twist.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your neck is ideal for Neo Traditional art that combines classic beauty with modern sophistication. This placement is perfect for designs that represent your values—love, strength, protection. The sophisticated shading and vibrant colors create depth that makes this art truly special. The neck's visibility means this meaningful art is always with you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The neck is perfect for Neo Traditional art that honors tradition while embracing innovation. Roses symbolize love and growth, flowers represent beauty. This placement makes your tattoo visible and meaningful—every glance reminds you of your values. The enhanced detail and dimensional depth create art that's both timeless and modern.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/neck-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your neck is ideal for Neo Traditional art that showcases your appreciation of tattoo heritage. This placement is perfect for designs that represent your character and values. The refined linework and expanded colors create depth that traditional styles can't match. The neck's visibility means this meaningful art is always part of your presence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shin-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is perfect for Neo Traditional art that moves with every step. This placement is ideal for designs that represent your journey forward—strength, love, protection. The enhanced detail and vibrant colors create depth that makes this art truly special. Every step brings this meaningful art to life.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin is ideal for Neo Traditional art that honors classic tattoo tradition with modern innovation. This placement is perfect for designs that represent your values—freedom, courage, adventure. The refined detail and smooth gradients create depth that makes this art stand out. Every step reminds you of what matters.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is perfect for Neo Traditional art that represents strength and values. This placement is ideal for designs that remind you of what matters—love, protection, freedom. The dimensional depth and expanded colors create art that's both timeless and modern. The shoulder's prominence makes this meaningful art visible when you're confident.",
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
        prompt: "",
        more_about: "Your arm is the perfect canvas for watercolor art that looks like a living painting. The flowing brushstrokes and vibrant colors create an impressionistic effect that moves with you. This placement is ideal for expressing your artistic side and creativity—the colors blend beautifully, creating a unique piece of art that's truly yours. Every movement brings these colors to life, making your tattoo feel alive and dynamic.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is ideal for watercolor art that transforms your skin into a canvas. The painterly techniques—color washes, drips, and splatters—create an impressionistic effect that's both bold and beautiful. This placement makes your tattoo visible and meaningful, while the flowing colors ensure it's always unique. Perfect for expressing your creative spirit and artistic appreciation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is the ultimate canvas for large-scale watercolor art. The vibrant colors blend naturally, creating a masterpiece that flows with your body's natural curves. This placement allows for complex compositions that showcase the full beauty of watercolor technique. The diffused edges and flowing colors make this art deeply personal and visually stunning—perfect for expressing your artistic soul.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is perfect for watercolor art that tells your story through color and movement. The flowing brushstrokes and layered gradients create depth and beauty that's truly unique. This placement allows for larger designs that showcase the full potential of watercolor technique. The vibrant colors blend beautifully, creating art that's both personal and powerful—yours to reveal when you choose.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/rib-female.png",
        blurhash: "LIA+:GxG0KNH~Bs.9aR+%LoeIpR*",
        prompt: "",
        more_about: "Your rib is perfect for watercolor art that flows with your body's natural curves. Abstract compositions or nature scenes create movement and beauty that's truly unique. This placement is ideal for expressing your artistic side and creativity—the flowing colors and transparency effects make your tattoo feel alive. The rib's intimate nature makes this art deeply personal and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/rib-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "The rib is ideal for watercolor art that creates a fluid aesthetic inspired by fine art painting. The vibrant colors blend naturally, creating depth and movement. This placement is perfect for expressing your creative spirit—the flowing gradients and color bleeding make your tattoo truly unique. The rib's natural curve enhances the composition beautifully.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shin-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "Your shin is perfect for watercolor art that moves with every step. The painterly techniques create soft edges and seamless color blending that makes your tattoo feel alive. This placement is ideal for expressing your artistic side—the vibrant colors flow beautifully, creating art that's both bold and elegant. Every step brings these colors to life.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shin-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "The shin is ideal for watercolor art that appears to be absorbed into your skin like a living painting. The flowing brushstrokes and vibrant colors create movement and beauty. This placement is perfect for expressing your creative spirit—the colors blend seamlessly, making your tattoo truly unique. Every step brings this art to life.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shoulder-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "Your shoulder is perfect for watercolor art that represents your creative spirit. Abstract or nature-inspired designs create impressionistic effects that are both bold and beautiful. This placement is ideal for expressing your artistic side—the color washes, drips, and blooms make your tattoo feel alive. The shoulder's prominence makes this art visible when you're confident.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/shoulder-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "The shoulder is ideal for watercolor art that mimics fine art painting techniques. The vibrant colors blend naturally, creating depth and movement. This placement is perfect for expressing your artistic appreciation—the flowing gradients make your tattoo truly unique. The shoulder's natural curve enhances the composition beautifully.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/thigh-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "Your thigh is perfect for watercolor art that flows with your body's natural shape. The flowing brushstrokes and paint splashes create organic fluidity that's both bold and beautiful. This placement is ideal for expressing your creative spirit—the vibrant colors and soft edges make your tattoo feel alive. The thigh's space allows for larger, more complex designs.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/thigh-female.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "The thigh is ideal for watercolor art that showcases painterly techniques. Layered gradients and transparency effects create depth and movement. This placement is perfect for expressing your artistic side—the vibrant color saturation makes your tattoo truly unique. The thigh's natural curve enhances the composition beautifully.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/wrist-male.png",
        blurhash: "LHA+{hWX0Ke-~CS39Zn$xtWVRke:",
        prompt: "",
        more_about: "Your wrist is perfect for watercolor art that creates an impressionistic living-painting aesthetic. The vibrant colors blend naturally with diffused edges, making your tattoo feel alive. This placement is ideal for expressing your creative spirit—the flowing colors are always visible, reminding you of your artistic side. Perfect for designs that represent movement and creativity.",
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
        prompt: "",
        more_about: "Your arm is perfect for a couples tattoo that tells your love story. This placement makes your matching design visible daily, reminding you of your partner and the bond you share. Whether it's puzzle pieces that fit together, split designs that complete each other, or matching symbols, your arm is ideal for expressing unity and commitment. Every glance reminds you of the love you've chosen to honor permanently.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/feet-couple-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "Your feet are perfect for matching couples tattoos that celebrate your shared journey. When you stand together, your complementary designs create a complete picture of unity and love. This placement is ideal for expressing that you're walking through life together—every step forward is taken side by side. The feet's intimate nature makes this art deeply personal and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
        prompt: "",
        more_about: "Your arms are perfect for couples tattoos that create a complete visual narrative when viewed together. Interconnected patterns or split designs tell your shared story—when you're apart, each piece stands alone beautifully, but together they form something greater. This placement is ideal for expressing unity and partnership, visible whenever you're together.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/shin-couple-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
        prompt: "",
        more_about: "Your shins are perfect for matching couples tattoos that celebrate partnership and commitment. Puzzle pieces that fit together, split designs that complete each other, or matching symbols express your unity. This placement is ideal for expressing that you're moving forward together—every step reminds you of the journey you're sharing. Perfect for designs that represent your bond.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/shoulder-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
        prompt: "",
        more_about: "Your shoulder is perfect for a couples tattoo that expresses love and unity. Hearts symbolize your love, infinity symbols represent forever, and complementary designs show your connection. This placement is ideal for expressing commitment—the shoulder's prominence makes your matching art visible when you're together, reminding you of the bond you share.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/wrist-couple-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
        prompt: "",
        more_about: "Your wrists are perfect for matching couples tattoos that symbolize shared identity. Complementary designs work independently but create harmony when viewed together. This placement is ideal for expressing unity—every gesture reminds you of your partner. The wrist's visibility means your matching art is always with you, celebrating the love you've chosen to honor permanently.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-2.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
        prompt: "",
        more_about: "Your arms are ideal for couples tattoos that reflect your unique bond. Matching symbols with personal variations—coordinates of special places, important dates, meaningful quotes, or custom designs—tell your story. This placement is perfect for expressing what makes your relationship special. Every glance reminds you of the moments and places that define your love.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-3.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
        prompt: "",
        more_about: "Your arms are perfect for couples tattoos that tell your shared story. Complementary puzzle pieces, split designs, or interconnected patterns express partnership and unity. This placement is ideal for expressing commitment—when you're together, your designs create something beautiful. The arm's visibility means your matching art is always part of your presence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/arm-couple-4.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
        prompt: "",
        more_about: "Your arms are ideal for couples tattoos that celebrate love, commitment, and your shared journey. Matching or complementary designs express romantic symbolism that's deeply personal. This placement is perfect for expressing unity—every gesture reminds you of your partner and the bond you share. The arm's visibility means your matching art is always meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/calf-couple-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
        prompt: "",
        more_about: "Your calves are perfect for matching couples tattoos that express partnership through body art. Complementary motifs work both independently and as a unified pair, celebrating your bond. This placement is ideal for expressing unity—every step forward reminds you of the journey you're sharing. Perfect for designs that represent your commitment to each other.",
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
        prompt: "",
        more_about: "Your arm is perfect for honoring the divine feminine through Hindu Goddess art. Lakshmi brings prosperity, Saraswati represents knowledge, Durga symbolizes strength, Kali embodies transformation, and Parvati shows devotion. This placement makes your spiritual connection visible daily, reminding you of the divine qualities you carry. The intricate detail and vibrant colors create art that's both sacred and beautiful, honoring ancient traditions while expressing your personal devotion.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-female-3.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "Your arm is ideal for sacred Hindu Goddess art that honors spiritual traditions. Multiple arms represent divine power, lotus flowers symbolize purity, conch shells mean protection, and ornate jewelry shows reverence. This placement makes your spiritual connection visible and meaningful—every gesture reminds you of the divine qualities you honor. The intricate detail creates art that's both powerful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
        prompt: "",
        more_about: "Your arm is perfect for Hindu Goddess art that honors divine deities and spiritual traditions. Mandalas represent the universe, Sanskrit symbols carry sacred meaning, and sacred animals show connection to nature. This placement makes your spiritual appreciation visible daily, reminding you of the rich heritage you honor. The traditional iconography creates art that's both meaningful and visually stunning.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-2.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
        prompt: "",
        more_about: "The arm is ideal for traditional Hindu Goddess art that showcases intricate detail work. Ornate jewelry represents devotion, flowing garments show grace, divine halos symbolize enlightenment, and elaborate crowns mean reverence. This placement makes your spiritual connection visible and meaningful—every gesture reminds you of the divine qualities you honor. The detail work creates art that's truly special.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/arm-male-3.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
        prompt: "",
        more_about: "Your arm is perfect for Hindu Goddess art that honors spiritual traditions with vibrant colors. Deep blues represent the divine, rich reds symbolize power, golden yellows mean prosperity, emerald greens show nature, and royal purples represent spirituality. This placement makes your spiritual appreciation visible daily, reminding you of the rich heritage you honor. The vibrant colors create art that's both sacred and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/back-female-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
        prompt: "",
        more_about: "Your back is the ultimate canvas for large-scale Hindu Goddess art that tells a complete spiritual narrative. This placement allows for intricate compositions featuring divine goddesses, sacred symbols, and traditional Hindu art elements. The back's space lets you honor multiple aspects of the divine feminine, creating art that's deeply personal and powerful. Perfect for expressing your spiritual connection and cultural appreciation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/back-male-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
        prompt: "",
        more_about: "The back is perfect for sacred Hindu Goddess art that honors divine deities and spiritual traditions. Multiple arms represent divine power, divine attributes show reverence, and traditional iconography honors ancient heritage. This placement allows for larger, more complex designs that showcase the full beauty of Hindu art. The back's space lets you create art that's both meaningful and visually stunning.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/chest-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
        prompt: "",
        more_about: "Your chest is ideal for Hindu Goddess art that honors the divine feminine and spiritual traditions. Ornate details show reverence, sacred symbols carry meaning, and vibrant colors represent spirituality. This placement is perfect for expressing your spiritual connection—the chest's prominence makes your devotion visible. The intricate detail creates art that's both powerful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/neck-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
        prompt: "",
        more_about: "Your neck is perfect for Hindu Goddess art that honors divine goddesses and spiritual traditions. Traditional iconography represents reverence, mandalas symbolize the universe, and spiritual symbolism shows devotion. This placement makes your spiritual connection visible and meaningful—every glance reminds you of the divine qualities you honor. The intricate detail creates art that's both sacred and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-female-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
        prompt: "",
        more_about: "Your shoulder is ideal for sacred Hindu Goddess art that celebrates divine deities and spiritual traditions. Multiple arms represent divine power, divine halos symbolize enlightenment, ornate jewelry shows reverence, and vibrant colors honor ancient heritage. This placement makes your spiritual connection visible when you're confident, reminding you of the divine qualities you carry. Perfect for expressing devotion.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-female-2.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
        prompt: "",
        more_about: "The shoulder is perfect for traditional Hindu Goddess art that showcases intricate detail work. Sacred attributes like lotus flowers represent purity, tridents symbolize power, veenas mean music and arts, and Sanskrit symbols carry sacred meaning. This placement makes your spiritual appreciation visible and meaningful. The detail work creates art that's both powerful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
        prompt: "",
        more_about: "Your shoulder is ideal for Hindu Goddess art that honors divine goddess imagery and spiritual traditions. Traditional iconography represents reverence, vibrant colors symbolize spirituality, and ornate details show devotion. This placement makes your spiritual connection visible when you're confident, reminding you of the rich heritage you honor. Perfect for expressing your appreciation of Hindu mythology.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/shoulder-male-3.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
        prompt: "",
        more_about: "The shoulder is perfect for sacred Hindu Goddess art that honors divine deities and spiritual traditions. Multiple arms represent divine power, divine attributes show reverence, and traditional Hindu art elements honor ancient heritage. This placement makes your spiritual appreciation visible and meaningful. The intricate detail creates art that's both powerful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/thigh-female-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "Your thigh is ideal for Hindu Goddess art that honors the divine feminine and spiritual traditions. Ornate jewelry represents devotion, flowing garments show grace, divine halos symbolize enlightenment, and vibrant colors honor ancient heritage. This placement allows for larger designs that showcase the full beauty of Hindu art. Perfect for expressing your spiritual connection.",
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
        prompt: "",
        more_about: "Your arm is perfect for Chicano art that honors cultural heritage and tells your personal story. Beautiful women (cholas) represent strength and beauty, roses symbolize love and the fleeting nature of life, and religious imagery shows faith and devotion. This placement makes your cultural pride visible daily, reminding you of your roots and values. The fine-line work and sophisticated shading create art that's both meaningful and visually stunning.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/arm-male-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "The arm is ideal for Chicano art that honors barrio culture and personal stories. Roses represent love and beauty, skulls (calaveras) reflect Day of the Dead traditions and mortality, and gothic lettering shows artistic expression. This placement makes your cultural appreciation visible daily, reminding you of your heritage. The fine-line work and selective red accents create art that's both powerful and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-female-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
        prompt: "",
        more_about: "Your back is perfect for Chicano art that honors faith and cultural heritage. The Virgin of Guadalupe represents protection and devotion, crucifixes show faith, and praying hands mean spiritual connection. This placement allows for larger designs that tell your complete story. The fine-line work and sophisticated shading create art that's deeply personal and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-female-2.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
        prompt: "",
        more_about: "The back is ideal for Chicano art that tells personal stories of faith, family, and cultural pride. Beautiful women represent strength, roses symbolize love, and religious symbols show devotion. This placement allows for larger compositions that honor your heritage. The fine-line work creates art that's both meaningful and visually stunning.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
        prompt: "",
        more_about: "Your back is perfect for large-scale Chicano art that honors cultural heritage and personal stories. Clocks symbolize time and mortality, skulls reflect Day of the Dead traditions, gothic lettering shows artistic expression, and family portraits honor loved ones. This placement allows for complex compositions that tell your complete story. The fine-line work and precise detail create art that's deeply meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-2.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
        prompt: "",
        more_about: "The back is ideal for Chicano art that honors faith and cultural heritage. Religious imagery shows devotion, roses represent love, and symbolic motifs tell personal stories. This placement allows for larger designs that showcase the full beauty of Chicano art. The sophisticated shading and fine-line precision create art that's both powerful and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/back-male-3.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
        prompt: "",
        more_about: "Your back is perfect for Chicano art that honors iconic cultural motifs. Beautiful women represent strength and beauty, roses symbolize love, skulls reflect traditions, and gothic lettering shows artistic expression. This placement allows for larger compositions that honor your heritage. The fine-line work creates art that's both meaningful and visually stunning.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/chest-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
        prompt: "",
        more_about: "The chest is ideal for Chicano art that honors faith and cultural heritage. Religious imagery shows devotion, symbolic motifs tell personal stories, and selective red accents add meaning. This placement is perfect for expressing your cultural pride—the chest's prominence makes your devotion visible. The fine-line work creates art that's both powerful and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
        prompt: "",
        more_about: "Your shoulder is perfect for Chicano art that honors cultural heritage and personal stories. Beautiful women represent strength, roses symbolize love, and religious symbols show devotion. This placement makes your cultural appreciation visible when you're confident, reminding you of your roots. The fine-line work and sophisticated shading create art that's both meaningful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-female-2.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
        prompt: "",
        more_about: "The shoulder is ideal for Chicano art that honors cultural heritage with fine-line precision. Roses represent love, skulls reflect traditions, and religious imagery shows devotion. This placement makes your cultural pride visible and meaningful. The fine-line work creates art that's both powerful and beautiful, honoring Chicano cultural heritage.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-male-1.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
        prompt: "",
        more_about: "Your shoulder is perfect for Chicano art that honors cultural heritage and personal stories. Roses represent love, clocks symbolize time, and gothic lettering shows artistic expression. This placement makes your cultural appreciation visible when you're confident, reminding you of your roots. The fine-line work and selective red accents create art that's both meaningful and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/shoulder-male-2.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
        prompt: "",
        more_about: "The shoulder is ideal for Chicano art that honors faith and cultural heritage. Religious imagery shows devotion, symbolic motifs tell personal stories, and sophisticated shading creates depth. This placement makes your cultural pride visible and meaningful. The fine-line work creates art that's both powerful and beautiful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/thigh-female-1.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
        prompt: "",
        more_about: "Your thigh is perfect for Chicano art that honors cultural heritage and personal stories. Beautiful women represent strength, roses symbolize love, and religious symbols show devotion. This placement allows for larger designs that showcase the full beauty of Chicano art. The fine-line work and precise detail create art that's both meaningful and visually stunning.",
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
        prompt: "",
        more_about: "Your arm is perfect for a delicate mini tattoo that's subtle yet meaningful. Hearts represent love, flowers symbolize growth, ribbons add elegance, and script lettering carries personal meaning. This placement is ideal for your first tattoo or a design you want to see daily—the ultra-thin lines create art that's both elegant and discreet. Perfect for expressing your romantic side and personal values.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/arm-male-2.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "The arm is ideal for a mini tattoo that's perfect for first-time clients. The minimalist design with clean lines and generous breathing room creates art that's both subtle and meaningful. This placement makes your tattoo visible daily, reminding you of what matters. The delicate style ensures it's professional and timeless—perfect for expressing your values without overwhelming your look.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/feet-female-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
        prompt: "",
        more_about: "Your feet are perfect for a delicate mini tattoo that's both subtle and romantic. Small flowers represent beauty, hearts symbolize love, and geometric shapes carry personal meaning. This placement is ideal for expressing your feminine side—the ultra-thin lines create art that's elegant and discreet. Perfect for designs that remind you of beauty and love with every step.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/feet-male-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
        prompt: "",
        more_about: "The feet are ideal for a mini tattoo that's perfect for first-time clients. The minimalist fine-line work creates clean compositions that are both subtle and meaningful. This placement is perfect for expressing your values—every step reminds you of what matters. The delicate style ensures it's professional and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/neck-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
        prompt: "",
        more_about: "Your neck is perfect for a delicate mini tattoo that's both romantic and discreet. Small hearts represent love, flowers symbolize beauty, and delicate script carries personal meaning. This placement is ideal for expressing your romantic side—the ultra-thin lines create art that's elegant and subtle. Perfect for designs that remind you of love and beauty.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/neck-male-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
        prompt: "",
        more_about: "The neck is ideal for a mini tattoo that's perfect for discreet body art. The minimalist design with clean lines creates art that's both subtle and meaningful. This placement is perfect for expressing your values—every glance reminds you of what matters. The delicate style ensures it's professional and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-female-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
        prompt: "",
        more_about: "Your shoulder is perfect for a delicate mini tattoo that's both romantic and elegant. Ribbons and bows add a feminine touch, small floral elements represent beauty, and the ultra-thin lines create art that's subtle yet meaningful. This placement is ideal for expressing your romantic side—the shoulder's prominence makes your art visible when you're confident.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-female-2.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
        prompt: "",
        more_about: "The shoulder is ideal for a mini tattoo that's inspired by modern social media trends. The minimalist fine-line work creates clean compositions that are both romantic and aesthetic. This placement is perfect for expressing your contemporary style—the delicate design ensures it's professional and timeless. Perfect for designs that remind you of beauty and elegance.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/shoulder-male-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
        prompt: "",
        more_about: "Your shoulder is perfect for a mini tattoo that's subtle yet meaningful. The ultra-thin single-needle work creates art that's both elegant and discreet. This placement is ideal for expressing your values—the shoulder's prominence makes your art visible when you're confident. The clean minimalist design ensures it's professional and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-female-1.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
        prompt: "",
        more_about: "Your wrist is perfect for a delicate mini tattoo that's always visible and meaningful. Hearts represent love, flowers symbolize beauty, and delicate script carries personal meaning. This placement is ideal for expressing your romantic side—every gesture reminds you of what matters. The ultra-thin lines create art that's both elegant and discreet.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-female-2.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
        prompt: "",
        more_about: "The wrist is ideal for a mini tattoo that's perfect for subtle body art. The minimalist design with clean lines and generous breathing room creates art that's both romantic and aesthetic. This placement is perfect for expressing your values—every gesture reminds you of what matters. The delicate style ensures it's professional and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/wrist-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
        prompt: "",
        more_about: "Your wrist is perfect for a mini tattoo that's subtle yet meaningful. The ultra-thin single-needle work creates art that's both elegant and discreet. This placement is ideal for expressing your values—every gesture reminds you of what matters. The clean minimalist composition ensures it's professional and timeless.",
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
        prompt: "",
        more_about: "Your arm is perfect for aesthetic art that prioritizes visual beauty and harmony. Clean geometric patterns create rhythm, stylized natural elements add elegance, and ornamental compositions ensure balance. This placement makes your modern design sensibility visible daily, reminding you of your appreciation for contemporary art. The refined appearance ensures your tattoo looks sophisticated and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/arm-male-1.png",
        blurhash: "LVH1}P?b9vtR~WxuIpt79ZNGnhjZ",
        prompt: "",
        more_about: "The arm is ideal for aesthetic art that celebrates modern design. Clean lines create elegance, geometric shapes add structure, and decorative patterns show your contemporary taste. This placement makes your artistic appreciation visible daily, reminding you of your modern sensibility. The design elements ensure your tattoo looks refined and sophisticated.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/back-male-1.png",
        blurhash: "L7CPV3E100-:00?G~B9a01EM?asl",
        prompt: "",
        more_about: "Your back is perfect for large-scale aesthetic art that creates visual harmony. Abstract shapes add rhythm, botanical illustrations bring nature, and celestial motifs represent the universe. This placement allows for complex compositions that showcase the full beauty of modern design. The ornamental compositions ensure your tattoo looks sophisticated and timeless.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/feet-male-1.png",
        blurhash: "LEDSBy=|0Kbb%M0L0K~B={WB%2~V",
        prompt: "",
        more_about: "The feet are ideal for aesthetic art that's both refined and sophisticated. Clean geometric patterns create structure, stylized natural elements add elegance, and decorative borders frame the design beautifully. This placement is perfect for expressing your modern design appreciation—every step reminds you of your contemporary taste.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/neck-female-1.png",
        blurhash: "L5CiUA~W0000Ekxu~AV?tQ?G4:s9",
        prompt: "",
        more_about: "Your neck is perfect for aesthetic art that prioritizes beauty and balance. Clean lines create elegance, geometric patterns add structure, and ornamental compositions ensure harmony. This placement makes your modern design sensibility visible and meaningful—every glance reminds you of your appreciation for contemporary art.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/neck-male-1.png",
        blurhash: "L8E_y~~V^i^%E+bIsloe009Z02E1",
        prompt: "",
        more_about: "The neck is ideal for aesthetic art inspired by Art Deco, Bauhaus principles, or Scandinavian minimalism. Contemporary design elements show your modern taste, while clean lines ensure sophistication. This placement makes your artistic appreciation visible and meaningful. Perfect for expressing your appreciation of modern design movements.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/shoulder-female-1.png",
        blurhash: "LCCPFh%LV@0fRj01%2xu~AEL$*WC",
        prompt: "",
        more_about: "Your shoulder is perfect for aesthetic art that functions as decorative art. Clean geometric patterns create structure, stylized botanical elements add nature, and ornamental compositions ensure balance. This placement makes your modern design sensibility visible when you're confident, reminding you of your appreciation for contemporary art.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/shoulder-male-1.png",
        blurhash: "L29?]|~V009ZBW9a4T?H00D%.8XT",
        prompt: "",
        more_about: "The shoulder is ideal for aesthetic art that celebrates contemporary artistic expression. Geometric shapes create structure, abstract patterns add interest, and visual harmony ensures balance. This placement makes your modern design appreciation visible and meaningful. Perfect for expressing your contemporary taste.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-1.png",
        blurhash: "LCCFn$j[WAIV}@56?GS4={0LNHt7",
        prompt: "",
        more_about: "Your wrist is perfect for aesthetic art that prioritizes visual beauty. Clean lines create elegance, geometric patterns add structure, and decorative designs ensure harmony. This placement makes your modern design sensibility visible daily—every gesture reminds you of your appreciation for contemporary art.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-2.png",
        blurhash: "L4B3A}~B0KIoFfkD9Gsn4.NG0f9u",
        prompt: "",
        more_about: "The wrist is ideal for aesthetic art with ornamental compositions. Stylized natural elements add elegance, celestial motifs represent the universe, and decorative borders frame the design beautifully. This placement makes your modern design appreciation visible and meaningful. Perfect for expressing your contemporary taste.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-female-3.png",
        blurhash: "L4AJKB9u0000PV?G01^O~V?G01WB",
        prompt: "",
        more_about: "Your wrist is perfect for aesthetic art inspired by contemporary visual culture. Clean geometric patterns create structure, while the refined appearance ensures sophistication. This placement makes your modern design sensibility visible daily—every gesture reminds you of your appreciation for contemporary art.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-male-1.png",
        blurhash: "LGE30V00_ND%xaM{ofadM{t7WBt7",
        prompt: "",
        more_about: "The wrist is ideal for aesthetic art that celebrates modern design sensibilities. Clean lines create elegance, geometric shapes add structure, and decorative patterns ensure harmony. This placement makes your contemporary taste visible and meaningful. Perfect for expressing your appreciation of modern design.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/wrist-male-2.png",
        blurhash: "L29Ziy=K00tR~qIo0K?H000fWExu",
        prompt: "",
        more_about: "Your wrist is perfect for aesthetic art with contemporary graphic design aesthetics. Ornamental compositions create structure, abstract shapes add interest, and stylized elements ensure sophistication. This placement makes your modern design appreciation visible daily—every gesture reminds you of your contemporary taste.",
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
        prompt: "",
        more_about: "Your arm is perfect for anime art that celebrates your love for Japanese animation. Expressive characters with large eyes represent emotion and connection, dynamic action lines show energy, and vibrant colors bring your favorite series to life. This placement makes your fandom visible daily, reminding you of the stories and characters that inspire you. Perfect for expressing your passion for anime culture.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is perfect for anime art that celebrates iconic imagery from your favorite series. The clean bold outlines create clarity, vibrant color saturation brings energy, and precise detail work ensures your tattoo looks amazing. This placement makes your anime appreciation visible daily, reminding you of the characters and stories that inspire you. Perfect for expressing your fandom.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-female-3.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is perfect for anime art that captures the distinctive aesthetic of Japanese animation. Character portraits represent your favorites, iconic symbols show your fandom, and action scenes with speed lines bring energy. This placement makes your passion visible daily, reminding you of the anime that inspires you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is ideal for anime art inspired by your favorite genres. Shonen shows action and adventure, shojo represents romance, mecha means technology, and fantasy brings magic. This placement makes your anime appreciation visible daily, reminding you of the stories that inspire you. The vibrant colors and expressive style create art that's truly special.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-3.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is perfect for anime art that celebrates your fandom. Chibi versions add cuteness, magical elements bring wonder, and anime-inspired original designs show creativity. This placement makes your passion visible daily, reminding you of the anime that matters to you. The bold outlines and vibrant colors create art that's both fun and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/arm-male-4.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is ideal for anime art that showcases the distinctive cel-shading style. Vibrant color saturation brings energy, precise detail work ensures quality, and dynamic energy captures the spirit of anime. This placement makes your anime appreciation visible daily, reminding you of the characters and stories that inspire you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is perfect for large-scale anime art that tells your complete fandom story. Expressive characters represent your favorites, iconic symbols show your passion, and action scenes bring energy. This placement allows for complex compositions that showcase the full beauty of anime art. Perfect for expressing your deep love for Japanese animation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is ideal for anime art that celebrates anime culture with dynamic imagery. Speed lines show movement, vibrant colors bring energy, and expressive characters represent your favorites. This placement allows for larger designs that showcase the full potential of anime art. Perfect for expressing your passion for Japanese animation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/chest-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your chest is perfect for anime art that captures the distinctive anime art style. Character portraits with large expressive eyes show emotion, stylized hair adds personality, and emotional expressions bring characters to life. This placement makes your fandom visible and meaningful—the chest's prominence ensures your passion is always part of your presence.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/chest-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The chest is ideal for anime art that celebrates your favorite series. Iconic symbols show your fandom, magical elements bring wonder, and action scenes create energy. This placement makes your anime appreciation visible and meaningful. The vibrant colors and dynamic composition create art that's both fun and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is perfect for anime art that moves with every step. Expressive characters represent your favorites, iconic imagery shows your fandom, and anime-inspired designs bring creativity. This placement is ideal for expressing your passion—every step reminds you of the anime that inspires you. The clean bold outlines and vibrant colors create art that's both fun and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin is ideal for anime art that captures the distinctive aesthetic of Japanese animation. Dynamic action lines show movement, speed effects bring energy, and character motifs represent your favorites. This placement is perfect for expressing your fandom—every step reminds you of the anime that matters to you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is perfect for anime art that celebrates anime culture. Expressive characters represent your favorites, magical elements bring wonder, and iconic symbols show your fandom. This placement is ideal for expressing your passion—every step reminds you of the anime that inspires you. The vibrant imagery creates art that's both fun and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shoulder-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is ideal for anime art that showcases your favorite characters. Character portraits represent your favorites, chibi designs add cuteness, and anime-inspired motifs show creativity. This placement makes your fandom visible when you're confident, reminding you of the anime that matters to you. The vibrant colors and precise detail create art that's truly special.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is perfect for anime art that celebrates anime fandom. Dynamic imagery with speed lines shows movement, vibrant color saturation brings energy, and expressive style captures the spirit of anime. This placement makes your passion visible when you're confident, reminding you of the anime that inspires you.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/thigh-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The thigh is ideal for anime art that showcases your favorite series. Iconic symbols show your fandom, action scenes create energy, and character designs represent your favorites. This placement allows for larger designs that showcase the full beauty of anime art. The clean cel-shading and vibrant colors create art that's both fun and powerful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/wrist-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your wrist is perfect for anime art that's always visible and meaningful. Expressive characters represent your favorites, magical elements bring wonder, and anime-inspired designs show creativity. This placement is ideal for expressing your fandom—every gesture reminds you of the anime that inspires you. The bold outlines and vibrant colors create art that's both fun and meaningful.",
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
        prompt: "",
        more_about: "Your arm is perfect for geometric animal art that combines nature with modern design. Animals rendered with bold geometric shapes represent your connection to nature, while clean lines and patterns create movement and energy. This placement makes your appreciation for both animals and geometry visible daily, reminding you of the balance between nature and structure. Perfect for expressing your modern aesthetic and love for animals.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is ideal for geometric animal art that honors nature through geometry. Simple geometric shapes and lines create bold patterns inspired by animals and geometry. This placement makes your appreciation for both nature and design visible daily, reminding you of the harmony between organic and structured forms. Perfect for expressing your modern sensibility.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is perfect for large-scale geometric animal art that creates striking visual impact. Animals rendered with geometric patterns, bold shapes, and clean lines showcase the beauty of combining nature with structure. This placement allows for larger designs that showcase the full potential of geometric animal art. Perfect for expressing your appreciation for both animals and modern design.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shin-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shin is ideal for geometric animal art that moves with every step. Bold geometric patterns, simple clean lines, and shapes inspired by nature create movement and energy. This placement is perfect for expressing your appreciation for animals and geometry—every step reminds you of the harmony between nature and structure.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shin-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shin is perfect for geometric animal art that emphasizes movement and energy. Animals rendered with geometric shapes and lines create patterns that flow beautifully. This placement is ideal for expressing your modern aesthetic—every step reminds you of the balance between nature and structure. The geometric patterns create art that's both bold and harmonious.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is ideal for geometric animal art that creates striking visual compositions. Bold geometric patterns, clean lines, and shapes showcase the beauty of combining animals with geometry. This placement makes your appreciation for both nature and design visible when you're confident, reminding you of the harmony between organic and structured forms.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is perfect for geometric animal art inspired by nature and geometric design. Simple geometric shapes and lines create art that's both elegant and meaningful. This placement makes your appreciation for animals and geometry visible and meaningful. Perfect for expressing your modern sensibility and love for nature.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is ideal for geometric animal art that creates movement and energy. Bold geometric patterns, clean lines, and shapes showcase the harmony between animals and structure. This placement makes your modern aesthetic visible when you're confident, reminding you of the balance between nature and design.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/shoulder-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The shoulder is perfect for geometric animal art that honors nature through geometry. Animals rendered with geometric shapes, simple clean lines, and patterns create art that's both meaningful and visually striking. This placement makes your appreciation for both animals and design visible and meaningful.",
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
        prompt: "",
        more_about: "Your abdomen is perfect for patchwork art that builds your tattoo collection over time. Individual traditional-inspired motifs like flowers represent beauty, snakes symbolize transformation, daggers show courage, and hearts mean love. This placement allows you to add pieces gradually, creating a personal collection. The bold black linework and negative space create a sticker-like collage effect that's both bold and meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is ideal for a patchwork sleeve that tells your story through multiple standalone pieces. Flowers represent beauty, script shows personal meaning, hearts symbolize love, flames mean passion, and dice represent chance. This placement allows you to build your collection gradually, with each piece remaining distinct while contributing to an overall cohesive look. Perfect for expressing your unique journey.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The arm is perfect for patchwork art that creates a sticker-like collage effect. A collection of distinct tattoos with bold black linework, dotwork shading, and intentional spacing allows each piece to stand alone while contributing to the whole. This placement is ideal for building your tattoo collection over time—every piece tells part of your story.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/arm-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your arm is ideal for a patchwork sleeve that honors classic tattoo tradition. Individual motifs like snakes represent transformation, daggers show courage, eyes mean awareness, and classic symbols carry meaning. This placement allows you to build your collection gradually, with open skin between pieces creating balance. Perfect for expressing your appreciation of tattoo culture.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/back-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your back is perfect for large-scale patchwork art that builds your collection over time. Multiple standalone tattoos with bold black linework and negative space create a cohesive patchwork composition. This placement allows for larger pieces that tell your complete story. The intentional spacing ensures each piece remains distinct while contributing to the whole.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/back-male.png",
        blurhash: "",
        prompt: "",
        more_about: "The back is ideal for patchwork art that honors traditional tattoo culture. A collection of distinct traditional-inspired motifs with solid black fills and dotwork shading creates a cohesive composition. This placement allows for larger designs that showcase the full beauty of patchwork art. Perfect for building your tattoo collection over time.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your chest is perfect for patchwork art that creates a sticker-sleeve aesthetic. Individual motifs like flowers represent beauty, snakes symbolize transformation, script shows personal meaning, and hearts mean love. This placement allows you to build your collection gradually, with bold linework ensuring each piece stands out. Perfect for expressing your unique journey.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male-3.png",
        blurhash: "",
        prompt: "",
        more_about: "The chest is ideal for patchwork art that creates a collage effect. Multiple standalone pieces with strong contrast, clean silhouettes, and negative space allow each tattoo to remain distinct while contributing to the whole. This placement is perfect for building your collection over time—every piece tells part of your story.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/chest-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your chest is perfect for patchwork art that honors traditional tattoo culture. Traditional-inspired motifs with bold black linework, solid fills, and intentional spacing create a cohesive composition. This placement allows you to build your collection gradually, with each piece remaining meaningful. Perfect for expressing your appreciation of classic tattoo art.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/hands-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your hands are ideal for patchwork art that builds your collection over time. Individual motifs like small flowers represent beauty, symbols carry meaning, and script shows personal expression. This placement allows you to add pieces gradually, with bold black linework ensuring each piece stands out. Perfect for expressing your unique journey.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/leg-male.png",
        blurhash: "",
        prompt: "",
        more_about: "Your leg is perfect for patchwork art that creates a cohesive composition. Multiple standalone tattoos with traditional-inspired motifs, bold linework, and intentional spacing allow each piece to remain distinct while contributing to the whole. This placement is ideal for building your collection over time—every piece tells part of your story.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/neck-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your neck is ideal for patchwork art that creates a sticker-like effect. Individual motifs with bold black linework, solid fills, and intentional negative space allow each piece to stand alone while contributing to the whole. This placement is perfect for building your collection gradually—every piece remains meaningful.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/ribs-female-2.png",
        blurhash: "",
        prompt: "",
        more_about: "Your ribs are perfect for patchwork art that builds your collection over time. Multiple standalone pieces including flowers, hearts, or symbols with bold linework and negative space create a cohesive composition. This placement allows you to add pieces gradually, with each tattoo remaining distinct. Perfect for expressing your unique journey.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/ribs-female.png",
        blurhash: "",
        prompt: "",
        more_about: "The ribs are ideal for patchwork art that honors traditional tattoo culture. A collection of distinct traditional-inspired motifs with solid black fills and dotwork shading creates a cohesive composition. This placement allows for larger designs that showcase the full beauty of patchwork art. Perfect for building your tattoo collection over time.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/shoulder-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your shoulder is perfect for patchwork art that builds your collection over time. Individual motifs like flowers represent beauty, snakes symbolize transformation, and classic symbols carry meaning. This placement allows you to add pieces gradually, with bold black linework ensuring each piece stands out. Perfect for expressing your unique journey.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/thigh-female.png",
        blurhash: "",
        prompt: "",
        more_about: "Your thigh is ideal for patchwork art that creates a sticker-sleeve collage aesthetic. Multiple standalone pieces with strong lines, solid blacks, and negative space allow each tattoo to remain distinct while contributing to the whole. This placement is perfect for building your collection over time—every piece tells part of your story.",
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
