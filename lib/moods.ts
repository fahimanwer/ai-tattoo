export interface ImageWithBlurHash {
  uri?: string;
  blurhash?: string;
  prompt?: string;
  more_about?: string;
}

export interface Mood {
  id: number;
  title: string;
  short_description: string;
  style: string;
  gallery: ImageWithBlurHash[];
  prompt: string;
  description: string;
  image: ImageWithBlurHash | undefined;
}

export const moods: Mood[] = [
  {
    id: 200,
    title: "Vintage Soul",
    short_description:
      "Timeless designs inspired by retro aesthetics, classic objects, and nostalgic elements—cameras, vinyl records, books, coffee, and vintage motifs that capture the essence of a bygone era with modern tattoo artistry.",
    description:
      "Vintage Soul is that warm feeling of nostalgia—the crackle of a vinyl record, the smell of old books, your morning coffee ritual. It's wanting to slow down, appreciate the small moments, and connect with things that have history and soul. When this mood calls to you, you want to carry these feelings with you permanently. Vintage Soul tattoos capture that essence through timeless objects like vintage cameras, vinyl records, old books, and coffee cups. It's about honoring tradition while making it personal, turning everyday objects into meaningful art on your skin that tells your story of appreciating the classics.",
    style: "Vintage Soul",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/cover.avif",
      blurhash: "",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/abdomen-male.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL mood with warm amber light, faded muted tones. Close-up shot centered on male abdomen displaying blackwork patchwork tattoo style, consistent bold lines and solid black fill. Natural skin texture, subtle film grain, nostalgic analog tone. Tattoo as the primary focus.",
        more_about: "Some stories don’t age — they sharpen. Ink is how old souls stay loud.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-camera-female.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL mood expressed through warm amber light and subtle grain. Centered shot of female arm holding a vintage film camera, blackwork patchwork tattoo clearly visible as focal point. Faded muted colors, nostalgic analog environment, tattoo dominates the frame.",
        more_about: "We capture moments so they don’t escape. Ink makes sure they never run.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-coffe-female.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with muted tones, warm soft lighting. Centered shot of female forearm holding a ceramic coffee cup near window, blackwork patchwork tattoo style as main focus, natural skin texture, subtle film grain.",
        more_about: "Slow mornings, strong memories. Vintage is a rhythm you don’t rush.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-male-2.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography with VINTAGE SOUL mood, faded muted colors, warm ambient lighting. Centered close-up of male arm displaying blackwork patchwork tattoo style, tattoo sharply in focus, subtle film grain, nostalgic analog tone.",
        more_about: "Timeless isn’t a look — it’s a conviction. Some styles never retire.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-male-book.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL mood with soft warm light, faded muted colors. Centered shot of male hand holding an old book, blackwork patchwork tattoo in sharp focus as primary subject, natural texture, subtle grain.",
        more_about: "The past still has something to say. Ink keeps the conversation going.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-male-guitarr.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with amber lighting and film grain. Centered close-up of male arm tuning an acoustic guitar, blackwork patchwork tattoo as main focus, nostalgic environment blurred behind.",
        more_about: "Analog sound, analog life. The classics hit deeper when they’re permanent.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-male.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL vibe with warm tones and subtle grain. Centered shot of male arm featuring blackwork patchwork tattoo style, tattoo healed and clear, nostalgic analog background.",
        more_about: "You don’t grow out of the things that built you. Ink proves it.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-vinyl-male.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with muted tones and warm ambient light. Centered shot of male arm placing a vinyl record on a turntable, blackwork patchwork tattoo in sharp focus, nostalgic film grain aesthetic.",
        more_about: "Some eras weren’t better — they were real. Vinyl and ink don’t pretend.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/back-male-vinyl.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL lighting with amber hues and subtle grain. Centered shot focused on male upper back showing blackwork patchwork tattoo while interacting with vinyl record setup, nostalgic ambiance and analog textures.",
        more_about: "Nostalgia is rebellion against forgetting. Ink refuses to fade with time.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/back-male.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL mood with warm amber glow and soft film grain. Centered shot of male upper back with blackwork patchwork tattoo style, natural skin texture, emotional and nostalgic tone.",
        more_about: "Turn your back on trends — not history. Ink honors what mattered.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/chest-female.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with soft warm lighting and muted tones. Centered shot of female chest featuring blackwork patchwork tattoo style, tattoo healed, clear and dominant, subtle grain for nostalgic analog feel.",
        more_about: "Bold doesn’t apologize. Classic doesn’t ask permission to stay.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/female-arm-book.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL mood with warm muted lighting and soft grain. Centered shot of female arm holding an old book, blackwork patchwork tattoo as primary focus, nostalgic textures and colors.",
        more_about: "Pages turn but memories don’t. Ink locks the chapters that matter.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/forearm-female-coffee.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with amber warm light, muted tones and nostalgic grain. Centered close-up shot of female forearm holding a ceramic coffee mug, blackwork patchwork tattoo in focus.",
        more_about: "Slow moments are loud memories. Ink is proof you felt them.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/hand-male-book.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL vibe with warm textured lighting and faded colors. Centered shot of male hand holding an old worn book, blackwork tattoo on hand as main subject, subtle grain and analog feel.",
        more_about: "Hands carry stories nobody reads. Ink makes them visible.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/thight-female.avif",
        blurhash: "",
        prompt: "Ultra realistic 4K photography, VINTAGE SOUL atmosphere with soft warm light and cinematic grain, centered close-up of female upper thigh displaying blackwork patchwork tattoo style, tattoo healed and dominant in composition.",
        more_about: "Vintage isn’t old — it’s undefeated. Ink is the comeback every decade tries to copy.",
      },
    ],
    prompt:
      "Create a Vintage Soul tattoo design inspired by retro aesthetics, classic objects, and nostalgic elements. This style celebrates timeless motifs such as vintage cameras, vinyl records, old books, coffee cups, typewriters, film reels, and other objects that evoke memories of a bygone era. The aesthetic combines fine-line work with bold blackwork, creating pieces that feel both delicate and strong. Common elements include retro typography, film cameras, record players, vintage coffee cups, classic literature, nostalgic symbols, and objects that represent appreciation for craftsmanship and tradition. The style emphasizes warm tones, soft contrasts, and compositions that feel like pages from an old photo album. Designs should be suitable for professional tattoo application with clear line work, readable shapes, and intentional placement that honors both the vintage aesthetic and modern tattoo artistry. The overall feel should be nostalgic, warm, and personal—turning everyday objects into meaningful art that tells a story of appreciation for the classics.",
  },
  {
    id: 201,
    title: "Nature & Serenity",
    short_description:
      "Botanical linework, flowing organic forms, and elements inspired by earth’s calm rhythm — leaves, moons, florals, mountains, waves, and symbols of balance and renewal.",
    description:
      "Nature & Serenity is ink that breathes — quiet symbols with deep emotional roots. This mood captures the grounding stillness of nature through fine botanical linework, lunar phases, flowing plants, delicate florals, abstract mountains, and organic shapes that wrap and move with the body. These tattoos speak softly but remain powerful: reminders of cycles, healing, balance, and rebirth. Whether minimalist or full organic compositions, each piece reconnects skin to earth, like carrying a small ecosystem of meaning wherever you go.",
    style: "Nature & Serenity",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/cover.avif",
      blurhash: "",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/back-female-moon-phases.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY mood with soft natural daylight and muted earth tones. Centered close-up of female upper back showing fine-line botanical and lunar cycle tattoo composition; moons arranged vertically with small birds and delicate floral stems. No face visible, shoulders relaxed, natural indoor calm environment, subtle matte texture, tattoo as the clear primary focus.",
        more_about:
          "Ink that whispers, not shouts — cycles, growth, quiet strength carried in delicate lines.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/shoulder-female-quote.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY mood with warm outdoor overcast light. Centered shot of female shoulder featuring minimalist linework tattoos: small stars, curved quote text, and fine-line floral flame element. Soft textures, no face fully shown, subtle earthy tones, tattoo is the sharp focal point.",
        more_about:
          "Some flames burn loud — others keep you warm. Serenity is still fire.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/female-forearm-botanical.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY aesthetic with neutral warm light and soft gradients. Centered shot of inner forearm showing botanical fine line vines intertwined with an anatomical heart and small quote text. Slight grain for organic feel, skin texture natural, tattoo crisp and dominant in composition.",
        more_about:
          "Growth needs space — healing needs time. Ink marks both without rushing.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/arm-male-botanical.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY mood with soft earthy lighting. Centered close-up of female arm featuring full botanical tattoo wrap: stems, flowers, seeds flowing around the arm organically. Neutral textures, natural indoor studio feel, tattoo clearly the main focus.",
        more_about:
          "We are stitched together by roots we can’t see — ink gives them shape.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/legs-female-bed.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY tone with soft ambient natural room light. Centered shot of legs sitting casually on a bed, displaying multiple small botanical fine-line tattoos, sun symbol, leaves, and butterflies. Cozy textures, matte tones, tattoo as the main subject.",
        more_about:
          "Your calm is your rebellion — in a loud world, softness is power.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/hiking-female-arm.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K outdoor mountain photography, NATURE & SERENITY mood with natural daylight. Centered shot of female arm with large botanical and landscape tattoo elements while standing on rocky trail. Tattoo mixing mountains, flowers, and flowing lines. No face fully visible, scenery blurred, tattoo in focus.",
        more_about:
          "You are made of the same things you admire — wind, stone, and patience.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/female-full-body-couch.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY mood with warm indoor light and natural plant decor. Centered seated pose where full botanical tattoos on arms and legs are visible; fine-line flowers, vines, symbolic natural shapes. No face as focus, cozy organic textures, tattoo primary subject.",
        more_about:
          "When life grows wild, learn to grow with it — not against it.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/female-standing-minimal-legs.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY aesthetic with soft diffused window light. Centered shot of legs showing multiple small fine-line nature tattoos: leaves, moth, branch, moon text. Earthy tones, minimal setting, tattoo in focus.",
        more_about:
          "Small reminders carry big peace — ink makes them permanent passengers.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/neck-female-floral.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K photography, NATURE & SERENITY mood with soft cool tones. Centered shot of neck and chest showing bold floral linework wrapping around the collarbone and a star near the eye (face not focal). Natural indoor environment, matte texture, tattoo clear and dominant.",
        more_about:
          "The body blooms where confidence roots — ink waters both.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/nature-and-serenity/leg-lake-female.avif",
        blurhash: "",
        prompt:
          "Ultra realistic 4K outdoor photography by lakeside, NATURE & SERENITY ambience with reflection on water and calm landscape. Centered close-up of leg featuring full botanical tattoo design flowing like branches down the calf. Natural textures, water softly blurred, tattoo primary focus.",
        more_about:
          "Silence is a landscape too — sometimes the most honest one.",
      },
    ],
    prompt:
      "Create Nature & Serenity tattoo designs inspired by botanical linework, floral compositions, natural cycles, moon phases, plants, mountains, waves, and organic forms. The aesthetic uses fine lines, thin needle minimalism, and soft shading while keeping shapes readable and placement intentional. Common elements: florals, leaves, stems, moons, sun, stars, butterflies, abstract natural geometry, and symbolic compositions representing balance, healing, and inner peace. Designs should feel grounding, peaceful, and deeply personal — minimal yet meaningful.",
  },
];

export const getMoodById = (id: number): Mood | undefined => {
  return moods.find((mood) => mood.id === id);
};
