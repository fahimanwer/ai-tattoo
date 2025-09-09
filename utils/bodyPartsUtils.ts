import { featuredTattoos } from "@/lib/featured-tattoos";

export interface GalleryImage {
  uri: string;
  bodyPart: string;
  gender: string;
  styleId: number;
  styleTitle: string;
}

// Extract body part from URL (e.g., "arm-female.png" -> "arm")
export function extractBodyPartFromUrl(url: string): string {
  const filename = url.split('/').pop() || '';
  const parts = filename.replace('.png', '').split('-');
  return parts[0] || '';
}

// Extract gender from URL (e.g., "arm-female.png" -> "female") 
export function extractGenderFromUrl(url: string): string {
  const filename = url.split('/').pop() || '';
  const parts = filename.replace('.png', '').split('-');
  return parts[1] || '';
}

// Get all unique body parts from featured tattoos gallery
export function getAllBodyParts(): string[] {
  const bodyParts = new Set<string>();
  
  featuredTattoos.forEach(tattoo => {
    tattoo.gallery.forEach(image => {
      if (typeof image === 'object' && 'uri' in image) {
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
  
  featuredTattoos.forEach(tattoo => {
    tattoo.gallery.forEach(image => {
      if (typeof image === 'object' && 'uri' in image) {
        const bodyPart = extractBodyPartFromUrl(image.uri);
        const gender = extractGenderFromUrl(image.uri);
        
        images.push({
          uri: image.uri,
          bodyPart,
          gender,
          styleId: tattoo.id,
          styleTitle: tattoo.title
        });
      }
    });
  });
  
  return images;
}

// Filter gallery images by body part
export function filterImagesByBodyPart(bodyPart: string): GalleryImage[] {
  return getAllGalleryImages().filter(image => image.bodyPart === bodyPart);
}

// Get all images of a single style for a specific body part
export function getBodyPartImagesFromOneStyle(bodyPart: string): GalleryImage[] {
  const bodyPartImages = filterImagesByBodyPart(bodyPart);
  
  if (bodyPartImages.length === 0) return [];
  
  // Take the first available style for this body part
  const firstStyle = bodyPartImages[0];
  
  // Return all images from that style and body part
  return bodyPartImages.filter(image => image.styleId === firstStyle.styleId);
}

// Get body part display name
export function getBodyPartDisplayName(bodyPart: string): string {
  const displayNames: Record<string, string> = {
    'arm': 'Arms',
    'back': 'Back',
    'neck': 'Neck',
    'hand': 'Hands',
    'thigh': 'Thighs',
    'abdomen': 'Abdomen',
    'toe': 'Toes',
    'chest': 'Chest',
    'leg': 'Legs',
    'shoulder': 'Shoulders'
  };
  
  return displayNames[bodyPart] || bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1);
}
