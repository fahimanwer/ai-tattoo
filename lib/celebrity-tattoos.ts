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
    title: "Sports",
    short_description:
      "Bold, dynamic designs inspired by sports culture featuring motivational quotes, cultural symbols, powerful animals, and athletic imagery that embody dedication, strength, and competitive spirit.",
    description:
      "Many athletes choose tattoos as a way to represent their strength, resilience, and the meaning behind their athletic journey. Whether they're boxers, football players, runners, or fighters, these tattoos often reflect personal goals, motivational phrases, powerful animals like lions or tigers, cultural symbols, and important milestones in their careers. Athletes frequently get tattooed on muscular areas such as the chest, arms, or back, making a visible statement about their dedication and hard work. For most, the tattoo is more than just body art—it's a lasting reminder of sacrifice, pride, and the inspiration that drives them both on and off the field.",
    style: "Sports",
    image: {
      
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/cover_athletic.avif",
      blurhash: "L6F=dU-:00E1o$j@WAxa~AoJ01Ip",
    },
    gallery: [
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
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/box-arm.avif",
        blurhash: "",
        prompt: "Realistic action shot of a boxer mid‑strike with visible forearm patchwork tattoos, emphasizing power, precision, and focus. No face visible, cinematic natural lighting.",
        more_about: "Forearm tattoos revealed mid-boxing movement, symbolizing focus, power, and the mental precision behind every strike.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/box-shoulder.avif",
        blurhash: "",
        prompt: "Close‑up dynamic photo of a boxer preparing to strike, showcasing shoulder blackwork tattoos representing resilience and strength. No face shown, gritty environment.",
        more_about: "A shoulder tattoo inspired by combat and resilience, reflecting a fighter’s strength and the determination to endure.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/jump-full.avif",
        blurhash: "",
        prompt: "Athlete captured mid‑air jump with full patchwork tattoos visible on arms and legs, conveying elevation and confidence. Natural motion blur, no face included.",
        more_about: "Dynamic tattoos captured mid-jump, representing elevation, confidence, and breaking personal limits through movement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/lifting-arm.avif",
        blurhash: "",
        prompt: "Focused scene of athlete lifting weight with arm tattoos exposed, symbolizing discipline and transformation. Forearm and bicep ink highlighted, no face visible.",
        more_about: "Tattoos shown during a lifting moment, symbolizing discipline, power, and the dedication behind physical transformation.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/running-back.avif",
        blurhash: "",
        prompt: "Back‑view runner in motion with tattoos visible across shoulders and spine, representing progress and movement. Outdoor natural light, face not visible.",
        more_about: "Back tattoos in motion, capturing freedom, relentless progress, and the journey toward self-improvement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/athletes-urban.avif",
        blurhash: "",
        prompt: "Relaxed urban street moment with athletes showing patchwork tattoos in casual posture, blending ink with lifestyle. No faces shown, natural daylight.",
        more_about: "A relaxed urban photo highlighting how tattoos blend naturally with active street style and everyday movement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/box-forearm.avif",
        blurhash: "",
        prompt: "Realistic close‑up of boxing stance highlighting forearm tattoos, capturing intensity and mental focus. No facial identity, documentary style.",
        more_about: "Detailed forearm tattoos visible during boxing action, capturing precision, intensity, and focus.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/running-full.avif",
        blurhash: "",
        prompt: "Full‑body runner in stride with leg and arm tattoos prominent, symbolizing endurance and commitment. Natural environment, no face visible.",
        more_about: "Full leg and arm tattoos captured in stride, emphasizing endurance, momentum, and the commitment to keep going.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/athletes-urban-2.avif",
        blurhash: "",
        prompt: "Group of athletes in casual urban setting, diverse tattoos shown naturally as part of street culture. Faces not included.",
        more_about: "Athletes in a casual street moment, showcasing tattoos as identity, connection, and shared culture within movement.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/futbol-arm.avif",
        blurhash: "",
        prompt: "Close view of football player tying cleats, showcasing arm tattoo representing passion and pride for the game. No face, realistic field setting.",
        more_about: "A tattooed arm in a football setting, highlighting pride, passion, and the emotional fuel behind the game.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/skate-full.avif",
        blurhash: "",
        prompt: "Female skater performing trick at skatepark with blackwork tattoos visible on arms and legs, symbolizing freedom and creativity. No face shown, natural daylight.",
        more_about: "A skateboarding scene that blends tattoos with urban culture, symbolizing freedom, creativity, and the fearless mindset of street movement.",
      }
    ],
    prompt:
      "Create an athletic tattoo design inspired by sports culture. This style is characterized by bold, dynamic designs that reflect dedication, discipline, and competitive spirit across all sports disciplines including MMA, boxing, football, basketball, baseball, running, and endurance sports. Common motifs include motivational quotes and text reflecting determination and mental fortitude, cultural symbols and tribal patterns representing heritage and identity, powerful animals like tigers, lions, eagles, and wolves symbolizing strength and courage, sports-specific imagery and athletic iconography, numbers and dates marking achievements, and personal symbols including family tributes and meaningful iconography. The style emphasizes strong, confident linework with bold black outlines, often incorporating dynamic compositions that reflect movement and energy. Color choices vary from deep blacks and earth tones to vibrant team colors and selective use of color for emphasis. The designs are placed strategically on the body to complement athletic physiques, with chest pieces, forearm sleeves, leg designs, and back pieces being common. The overall aesthetic is powerful, meaningful, and reflects a combination of dedication, heritage, strength, and competitive spirit. The tattoo should be suitable for professional application, rendered with bold detail and clear symbolism that embodies athletic excellence and sports culture.",
  },
  {
    id: 101,
    title: "Lifestyle",
    short_description:
      "Tattoos that blend naturally into everyday life, capturing coffee moments, travel, work, love, and personal rituals—ink that feels like part of your daily story, not just a special occasion.",
    description:
      "Lifestyle Tattoos focus on how ink lives with you day to day. These designs appear in real-life moments: grabbing coffee, working on a laptop, traveling, training lightly, or spending time with friends and family. Rather than extreme poses or studio-perfect setups, Lifestyle Tattoos are about authenticity—how a sleeve looks with a hoodie, how a fine-line wrist tattoo pairs with a watch, or how a back piece appears when the sunlight hits it. Common themes include small meaningful symbols, travel motifs, quotes, delicate line work, minimal blackwork, and personal icons that reflect identity, growth, and experience. The focus is on a natural, cinematic, documentary-style look where tattoos feel like part of who you are, not a costume.",
    style: "Lifestyle",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/cover.avif",
      blurhash: "",
    },
    gallery: [
     
      // 1. woman-book-cafe.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/woman-book-cafe.avif",
        blurhash: "",
        prompt: "Realistic lifestyle photo of a woman reading a book at a café table, with tattoos visible on her forearms and hands as she holds the book and cup. Soft natural light, cozy atmosphere, focus on the ink and quiet moment, face not the main subject.",
        more_about: "A calm café scene where reading, coffee, and visible tattoos come together, showing how ink naturally fits into slow, reflective moments.",
      },
      // 2. urban-train.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/urban-train.avif",
        blurhash: "",
        prompt: "Candid shot of a tattooed person standing inside an urban train, one arm holding the rail while sleeve tattoos catch the window light. Documentary-style photography, city in motion outside, focus on the ink and everyday commute.",
        more_about: "A city commute moment where tattoos ride along with daily routines, turning a simple train ride into part of a larger personal journey.",
      },
      // 3. travel-arm.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/travel-arm.avif",
        blurhash: "",
        prompt: "Travel lifestyle photo of a tattooed arm resting on a railing or backpack strap, with a scenic city or nature view in the background. Golden hour light, focus on the arm tattoos as symbols of movement, exploration, and collected memories.",
        more_about: "A travel scene that highlights tattoos as marks collected along the way, tied to places, memories, and moments on the road.",
      },
      // 4. park-hands.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/park-hands.avif",
        blurhash: "",
        prompt: "Close-up of tattooed hands resting together in a park, holding a coffee cup or book, with soft greenery blurred in the background. Focus on fine-line and minimal tattoos, peaceful outdoor lifestyle vibe.",
        more_about: "A quiet park moment where small tattoos on the hands say more than accessories, adding character to simple, everyday gestures.",
      },
      // 5. cycling-sleeve-2.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/cycling-sleeve-2.avif",
        blurhash: "",
        prompt: "Realistic photo of a cyclist in motion wearing casual cycling gear, with a detailed tattoo sleeve visible as they grip the handlebars. Natural outdoor light, focus on the arm and bike, lifestyle rather than performance sport.",
        more_about: "A cycling scene where the tattoo sleeve moves with every turn of the handlebars, blending ink with an active, everyday lifestyle.",
      },
      // 6. cycling-sleeve.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/cycling-sleeve.avif",
        blurhash: "",
        prompt: "Side view of a tattooed person holding a bicycle or standing next to it, sleeve tattoos clearly visible on the forearm and bicep. Urban or park background, relaxed pose, modern lifestyle tone.",
        more_about: "A relaxed moment with a bike where tattoos and movement go together, showing ink as part of a modern, active routine.",
      },
      // 7. urban-train-2.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/urban-train-2.avif",
        blurhash: "",
        prompt: "Back or side view of a tattooed person walking along a train platform, with arm or neck tattoos catching the station light. Slight motion blur, everyday city life mood, focus on ink and environment rather than identity.",
        more_about: "A walk on the train platform that frames tattoos against concrete, tracks, and light, capturing how ink lives inside the rhythm of the city.",
      },
      // 8. coffee-shop.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/coffee-shop.avif",
        blurhash: "",
        prompt: "Indoor coffee shop scene where a tattooed person works or scrolls on a laptop, with tattoos visible on forearms and hands around the keyboard and cup. Warm tones, cozy atmosphere, lifestyle documentary feel.",
        more_about: "A coffee shop workspace where tattoos sit between laptop, cup, and notebook, blending creative work with personal style.",
      },
      // 9. rooftoop.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/rooftoop.avif",
        blurhash: "",
        prompt: "Rooftop lifestyle photo of a tattooed person leaning on a ledge or sitting on the edge, city skyline in the background. Golden hour or blue-hour light, ink on arms or neck visible, mood relaxed and reflective.",
        more_about: "A rooftop view moment where tattoos meet skyline and sky, expressing freedom, perspective, and time spent above the noise of the city.",
      },
      // 10. camera-street.avif
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/camera-street.avif",
        blurhash: "",
        prompt: "Street photography style image of a tattooed person holding a camera, mid-shot of torso and arms as they frame a shot. Urban background, focus on camera and tattoos, candid creative lifestyle vibe.",
        more_about: "A street photography scene where tattoos and camera work together, showing ink as part of a creative eye that’s always observing the city.",
      },
      // city-back-woman.avif
{
  uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/city-back-woman.avif",
  blurhash: "",
  prompt:
    "Realistic street photo of a tattooed woman walking through the city with her back to the camera, tattoos visible along her arms or neck. Urban background, soft natural light, focus on the ink and movement, face not visible.",
  more_about:
    "A city-walk moment from behind, where tattoos move through streets and crowds, showing how ink travels with you in everyday life.",
},

// computer-guy.avif
{
  uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/computer-guy.avif",
  blurhash: "",
  prompt:
    "Indoor workspace photo of a tattooed person using a computer at a desk, with forearm and hand tattoos visible while typing or using a mouse. Modern home or office environment, warm light, lifestyle documentary feel.",
  more_about:
    "A modern work setup where tattoos sit beside keyboard, screen, and coffee, blending professional life with personal identity.",
},
    ],
    prompt:
      "Create a lifestyle tattoo design that feels natural and integrated into everyday life. This style should focus on how tattoos look with real outfits and environments such as coffee shops, workspaces, streets, travel scenes, or casual hangouts. Prioritize authenticity over perfection: soft natural lighting, subtle textures, and relaxed poses that show tattoos on arms, hands, neck, or legs in a believable way. Common motifs include fine-line symbols, travel icons like compasses or mountains, minimal blackwork, meaningful quotes, dates, and personal icons that reflect identity and life experiences. The overall aesthetic should feel cinematic and documentary-like, as if capturing real moments where tattoos are simply part of who the person is. The design should be suitable for professional tattoo application with clear line work, readable shapes, and intentional placement that works both in motion and at rest.",
  },
  {
    id: 102,
    title: "Mythology",
    short_description:
      "Epic designs inspired by legends, and ancient myths—lions, gods, armor, and symbols that represent strength, destiny, and the battles you’ve faced and overcome.",
    description:
      "Warrior & Mythology Tattoos draw from powerful legends, ancient cultures, and timeless stories of struggle, courage, and honor. This category includes motifs like Spartan and gladiator warriors, samurai, Viking symbols, mythological gods, angels and demons, armor plates, shields, swords, dragons, and sacred animals. The designs often combine realistic figures with symbolic elements such as runes, halos, flames, laurels, or rays of light. Black and grey is common, but selective color accents can enhance certain details like blood, fire, or divine glow. Placement usually highlights strong areas like the chest, back, shoulders, and full sleeves, turning the body into armor and story at the same time. These tattoos are chosen by people who feel connected to inner battles, discipline, resilience, and the idea that their life is its own myth.",
    style: "Mythology",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/cover.avif",
      blurhash: "",
    },
    gallery: [
      
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arm-boxing.avif",
        blurhash: "",
        prompt:
          "Realistic side view of a boxer in guard stance with a detailed Greek and Roman mythology sleeve on the lead arm—Spartan helmet, laurel wreaths, marble statues, and columns worked into the tattoo. Gritty gym environment, focus on the arm and ink, face not visible.",
        more_about:
          "A myth-inspired warrior sleeve on a boxer’s arm, mixing Spartan helmets, laurel wreaths, and marble details to represent strength, discipline, and victory in modern combat.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/roman-females-arms.avif",
        blurhash: "",
        prompt:
          "Collection of female arms shown from the side, each with fine-line Roman mythology tattoos—goddess profiles, laurel wraps, delicate columns, and subtle stars. Soft natural light, clean background, no faces included.",
        more_about:
          "Several feminine Roman mythology designs in one frame, showing how goddesses, laurel wraps, and columns can look graceful and powerful on women’s arms.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arm-female-aphrodite.avif",
        blurhash: "",
        prompt:
          "Close-up of a woman’s forearm and hand featuring a black and grey Aphrodite-inspired tattoo—marble-style goddess face, seashells, flowing hair, and subtle roses. Soft studio or home lighting, focus on the tattoo, face out of frame.",
        more_about:
          "A feminine mythology forearm piece inspired by Aphrodite, blending a marble goddess profile, seashells, and floral elements to symbolize beauty, love, and self-worth.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arm-female-roman.avif",
        blurhash: "",
        prompt:
          "Realistic photo of a woman’s arm resting on her lap, covered in a Roman mythology sleeve with laurel wreaths, columns, Roman numerals, and a goddess or warrior statue. Neutral background, emphasis on elegant black and grey linework.",
        more_about:
          "A Roman-inspired sleeve on a woman’s arm, using laurel wreaths, stone statues, and numerals to express legacy, time, and inner strength with a refined, elegant feel.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arm-male-medusa.avif",
        blurhash: "",
        prompt:
          "Male arm tattoo inspired by Medusa mythology, black and grey realism with snakes and carved stone texture. No face, focus on the sleeve in a natural pose.",
        more_about:
          "A Medusa-inspired sleeve representing danger, seduction, and the consequences of power—beauty and curse intertwined.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arms-boots.avif",
        blurhash: "",
        prompt:
          "Street-style photo of a person walking in boots with both tattooed arms visible at their sides, covered in mixed Greek and Roman mythology motifs—statues, helmets, laurel bands, and small symbols. Urban pavement background, focus on arms and tattoos, no face visible.",
        more_about:
          "An urban look where mythology sleeves and boots meet, showing how Greek and Roman symbols can live naturally in a modern street outfit.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/back-gym.avif",
        blurhash: "",
        prompt:
          "Back view of a person training in the gym with a large mythology back piece—roaring lion or deity face emerging from smoke, surrounded by Roman or Greek symbols like columns, laurel, and sacred geometry. Dramatic gym lighting, focus on back and tattoo, head turned away.",
        more_about:
          "A mythic back tattoo revealed during training, combining a fierce central figure with classical symbols to represent inner power and the constant fight to improve.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/box-forearm.avif",
        blurhash: "",
        prompt:
          "Close-up of warrior-style forearm tattoo with boxing movement in a gritty environment, inspired by Roman battle discipline. No face, focus on arm and wrapped hands.",
        more_about:
          "A Roman-inspired forearm piece showcased mid-fight, symbolizing discipline, precision, and the mindset of battle beyond the arena.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/roman-mix-arms.avif",
        blurhash: "",
        prompt:
          "Group shot of several tattooed arms—both male and female—resting together, each with different Roman mythology designs like helmets, laurel bands, statues, and temple columns. Neutral background, focus on variety of ink, no faces visible.",
        more_about:
          "Multiple arms showcasing different Roman mythology tattoos side by side, highlighting how helmets, laurel bands, and statues can be adapted to different styles and bodies.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/full-arm-greek-male.avif",
        blurhash: "",
        prompt:
          "Realistic photo of a man with a full Greek mythology sleeve from shoulder to wrist—Zeus or Poseidon statue, lightning bolts, broken columns, and swirling clouds in black and grey. Slight three-quarter angle, focus on the entire arm, face cropped out.",
        more_about:
          "A complete Greek mythology sleeve built around powerful gods, storms, and ruins, symbolizing divine strength, chaos, and the will to stand firm through trials.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/katana-arm.avif",
        blurhash: "",
        prompt: "Arm tattoo featuring katana blade, museum‑style samurai etching, and warrior smoke effects. Natural stance, no face shown.",
        more_about: "A Katana‑focused design symbolizing precision, honor, and the silent strength of disciplined strategy.",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/roman-arm.avif",
        blurhash: "",
        prompt:
          "Masculine arm shot with a full Roman warrior tattoo—helmet, shield, laurel wreath, and broken columns woven into a realistic black and grey sleeve. Soft dramatic lighting, focus on muscle and ink details, no face shown.",
        more_about:
          "A Roman warrior sleeve that turns the arm into armor, featuring helmets, shields, and laurel wreaths to represent courage, honor, and the battles a person has overcome.",
      },
     
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/roman-males-arms.avif",
        blurhash: "",
        prompt:
          "Row of male forearms crossed or side by side, each covered in Roman-inspired tattoos—gladiator helmets, eagles, laurel wreaths, and Latin script. Realistic lighting, documentary feel, focus purely on the ink and texture of the skin.",
        more_about:
          "A lineup of male Roman mythology sleeves, emphasizing helmets, eagles, and Latin text as symbols of pride, discipline, and heritage.",
      },
      
    ],
    prompt:
      "Create a Warrior & Mythology tattoo design inspired by ancient warriors, legendary figures, and mythological stories. This style blends realistic and symbolic elements such as Spartan or gladiator warriors, samurai, Vikings, mythic gods, angels, demons, dragons, and sacred animals. Incorporate armor, shields, swords, runes, halos, flames, rays of light, laurel wreaths, or storm clouds to enhance the epic feel. The aesthetic should emphasize dramatic shading, strong contrasts, and dynamic compositions that feel like scenes frozen from a larger story. Common placements include full sleeves, chest plates, back pieces, and shoulder armor layouts that follow the natural flow of the muscles. Designs should be crafted for professional tattoo application with clear silhouettes, layered depth, and enough negative space to remain readable from a distance while still rich in detail up close.",
  },
];

export const getTattooCategoryById = (id: number): TattooCategory | undefined => {
  return tattooCategories.find((category) => category.id === id);
};
