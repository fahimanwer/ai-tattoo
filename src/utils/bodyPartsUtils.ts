import { featuredTattoos } from "@/lib/featured-tattoos";
import { moods } from "@/lib/moods";

export interface GalleryImage {
  uri: string;
  blurhash?: string;
  bodyPart: string;
  gender: string;
  styleId: number;
  styleTitle: string;
  moodId?: number;
  moodTitle?: string;
}

// Normalize body part names to handle plural/singular inconsistencies
function normalizeBodyPartName(bodyPart: string): string {
  const normalizationMap: Record<string, string> = {
    // Plural to singular
    hands: "hand",
    ribs: "rib",
    legs: "thigh", // Group legs with thighs
    arms: "arm",
    thighs: "thigh",
    toes: "toe",
    shoulders: "shoulder",
    // Keep singular as is
    hand: "hand",
    rib: "rib",
    leg: "thigh", // Group leg with thigh
    arm: "arm",
    thigh: "thigh",
    thight: "thigh", // Fix typo in mood URLs
    toe: "toe",
    shoulder: "shoulder",
    // Other body parts
    abdomen: "rib", // Group abdomen with ribs
    calf: "shin", // Group calf with shin
    shin: "shin",
    back: "back",
    neck: "neck",
    chest: "chest",
    forearm: "arm", // Group forearm with arm
  };

  return normalizationMap[bodyPart.toLowerCase()] || bodyPart.toLowerCase();
}

// Extract body part from URL (e.g., "arm-female.png" -> "arm", "arm-camera-female.avif" -> "arm", "female-arm-book.avif" -> "arm")
export function extractBodyPartFromUrl(url: string): string {
  const filename = url.split("/").pop() || "";
  // Remove file extensions (.png, .avif, .jpg, etc.)
  const nameWithoutExt = filename.replace(/\.(png|avif|jpg|jpeg|webp)$/i, "");
  const parts = nameWithoutExt.split("-");
  
  // Find the first part that is not "male" or "female" (gender can be first or last)
  for (const part of parts) {
    const lowerPart = part.toLowerCase();
    if (lowerPart !== "male" && lowerPart !== "female") {
      return normalizeBodyPartName(part);
    }
  }
  
  // Fallback: use first part if no valid body part found
  return normalizeBodyPartName(parts[0] || "");
}

// Extract gender from URL (e.g., "arm-female.png" -> "female", "arm-camera-female.avif" -> "female", "female-arm-book.avif" -> "female")
export function extractGenderFromUrl(url: string): string {
  const filename = url.split("/").pop() || "";
  // Remove file extensions (.png, .avif, .jpg, etc.)
  const nameWithoutExt = filename.replace(/\.(png|avif|jpg|jpeg|webp)$/i, "");
  const parts = nameWithoutExt.split("-");
  
  // Find "male" or "female" in any position
  for (const part of parts) {
    const lowerPart = part.toLowerCase();
    if (lowerPart === "male" || lowerPart === "female") {
      return lowerPart;
    }
  }
  
  // Fallback: return last part if no gender found
  return parts[parts.length - 1] || "";
}

// Get all unique body parts from featured tattoos gallery and moods
export function getAllBodyParts(): string[] {
  const bodyParts = new Set<string>();

  // Add body parts from styles
  featuredTattoos.forEach((tattoo) => {
    tattoo.gallery.forEach((image) => {
      if (typeof image === "object" && "uri" in image) {
        const bodyPart = extractBodyPartFromUrl(image.uri || "");
        if (bodyPart) {
          bodyParts.add(bodyPart);
        }
      }
    });
  });

  // Add body parts from moods
  moods.forEach((mood) => {
    mood.gallery.forEach((image) => {
      if (typeof image === "object" && "uri" in image && image.uri) {
        const bodyPart = extractBodyPartFromUrl(image.uri);
        if (bodyPart) {
          bodyParts.add(bodyPart);
        }
      }
    });
  });

  return Array.from(bodyParts);
}

// Convert all gallery images to GalleryImage objects with metadata
export function getAllGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = [];

  featuredTattoos.forEach((tattoo) => {
    tattoo.gallery.forEach((image) => {
      if (typeof image === "object" && "uri" in image) {
        const bodyPart = extractBodyPartFromUrl(image.uri || "");
        const gender = extractGenderFromUrl(image.uri || "");

        images.push({
          uri: image.uri || "",
          blurhash: image.blurhash,
          bodyPart,
          gender,
          styleId: tattoo.id,
          styleTitle: tattoo.title,
        });
      }
    });
  });

  return images;
}

// Filter gallery images by body part (includes both styles and moods)
export function filterImagesByBodyPart(bodyPart: string): GalleryImage[] {
  const styleImages = getAllGalleryImages().filter(
    (image) => image.bodyPart === bodyPart
  );
  const moodImages = getAllMoodGalleryImages().filter(
    (image) => image.bodyPart === bodyPart
  );
  return [...styleImages, ...moodImages];
}

// Get all images of a single style for a specific body part
export function getBodyPartImagesFromOneStyle(
  bodyPart: string
): GalleryImage[] {
  const bodyPartImages = filterImagesByBodyPart(bodyPart);

  if (bodyPartImages.length === 0) return [];

  // Take the first available style for this body part
  const firstStyle = bodyPartImages[0];

  // Return all images from that style and body part
  return bodyPartImages.filter((image) => image.styleId === firstStyle.styleId);
}

// Get all images for a specific body part across all styles
export function getBodyPartImagesFromAllStyles(
  bodyPart: string
): GalleryImage[] {
  return filterImagesByBodyPart(bodyPart);
}

// Get all images when "all" category is selected
export function getAllBodyPartImages(): GalleryImage[] {
  return getAllGalleryImages();
}

// Get body part display name
export function getBodyPartDisplayName(bodyPart: string): string {
  if (bodyPart === "all") return "All";

  const displayNames: Record<string, string> = {
    arm: "Arms",
    back: "Back",
    neck: "Neck",
    hand: "Hands",
    rib: "Ribs & Abdomen",
    thigh: "Thighs & Legs",
    shin: "Calf & Shin",
    toe: "Toes",
    chest: "Chest",
    shoulder: "Shoulders",
  };

  return (
    displayNames[bodyPart] ||
    bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)
  );
}

// Convert all mood gallery images to GalleryImage objects with metadata
export function getAllMoodGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = [];

  moods.forEach((mood) => {
    mood.gallery.forEach((image) => {
      if (typeof image === "object" && "uri" in image && image.uri) {
        const bodyPart = extractBodyPartFromUrl(image.uri);
        const gender = extractGenderFromUrl(image.uri);

        images.push({
          uri: image.uri,
          blurhash: image.blurhash,
          bodyPart,
          gender,
          styleId: 0, // Moods don't have styleId, use 0 as placeholder
          styleTitle: mood.title,
          moodId: mood.id,
          moodTitle: mood.title,
        });
      }
    });
  });

  return images;
}

// Get all mood images filtered by moodId
export function getMoodImagesByMoodId(moodId: number): GalleryImage[] {
  return getAllMoodGalleryImages().filter((image) => image.moodId === moodId);
}
