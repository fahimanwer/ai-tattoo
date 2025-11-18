/**
 * Example: How to use BlurHash with your featured tattoos
 *
 * This file shows different ways to integrate the generated BlurHash values
 * into your React Native components using Expo Image.
 */

import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { featuredTattoos } from "../lib/featured-tattoos";

// Import the generated BlurHash values
// (After running the script, you can import from the generated file)
import { getTattooBlurHash, tattooBlurHashes } from "./blurhash-code";

/**
 * Example 1: Using BlurHash with a cover image
 */
export function TattooCoverImage({ tattooId }: { tattooId: number }) {
  const tattoo = featuredTattoos.find((t) => t.id === tattooId);
  const blurHash = getTattooBlurHash(tattooId, "cover");

  if (!tattoo?.image) return null;

  return (
    <Image
      source={{ uri: tattoo.image.uri }}
      placeholder={{ blurhash: blurHash }}
      style={styles.coverImage}
      contentFit="cover"
      transition={200}
    />
  );
}

/**
 * Example 2: Using BlurHash with gallery images
 */
export function TattooGalleryImage({
  tattooId,
  galleryIndex,
}: {
  tattooId: number;
  galleryIndex: number;
}) {
  const tattoo = featuredTattoos.find((t) => t.id === tattooId);
  const blurHash = getTattooBlurHash(tattooId, "gallery", galleryIndex);
  const galleryItem = tattoo?.gallery[galleryIndex];

  if (!galleryItem) return null;

  return (
    <Image
      source={{ uri: galleryItem.uri }}
      placeholder={{ blurhash: blurHash }}
      style={styles.galleryImage}
      contentFit="cover"
      transition={200}
    />
  );
}

/**
 * Example 3: Using BlurHash directly from the object
 */
export function TattooImageDirect({ tattooId }: { tattooId: number }) {
  const tattoo = featuredTattoos.find((t) => t.id === tattooId);
  const hashes = tattooBlurHashes[tattooId];

  if (!tattoo?.image || !hashes) return null;

  return (
    <View style={styles.container}>
      {/* Cover Image */}
      <Image
        source={{ uri: tattoo.image.uri }}
        placeholder={{ blurhash: hashes.cover }}
        style={styles.coverImage}
        contentFit="cover"
        transition={200}
      />

      {/* Gallery Images */}
      {tattoo.gallery.map((item, index) => (
        <Image
          key={index}
          source={{ uri: item.uri }}
          placeholder={{ blurhash: hashes.gallery[index] }}
          style={styles.galleryImage}
          contentFit="cover"
          transition={200}
        />
      ))}
    </View>
  );
}

/**
 * Example 4: Alternative - Update your VerticalCard component
 *
 * In your existing VerticalCard component, you can add BlurHash support:
 */
export function VerticalCardWithBlurHash({
  uri,
  blurHash,
}: {
  uri: string;
  blurHash?: string;
}) {
  return (
    <Image
      source={{ uri }}
      // Use blurhash if provided, otherwise fallback to thumbhash or no placeholder
      placeholder={blurHash ? { blurhash: blurHash } : undefined}
      style={styles.card}
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
    />
  );
}

/**
 * Example 5: Update your featured-tattoos.ts data structure
 *
 * You can extend the data directly in featured-tattoos.ts:
 */
const exampleUpdatedFeaturedTattoos = [
  {
    id: 1,
    title: "Japanese",
    // ... other fields
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/cover.png",
      // Add the blurhash directly to the object
      blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/hand-male.png",
        blurhash: "L5F~8{xut7of~qIUfQj[4nIU%M%M",
      },
      // ... more gallery items
    ],
  },
  // ... more tattoos
];

/**
 * Example 6: Create a custom hook for BlurHash
 */
export function useTattooBlurHash(
  tattooId: number,
  type: "cover" | "gallery" = "cover",
  galleryIndex?: number
) {
  return getTattooBlurHash(tattooId, type, galleryIndex);
}

// Usage in component:
function MyComponent({ tattooId }: { tattooId: number }) {
  const blurHash = useTattooBlurHash(tattooId, "cover");

  return (
    <Image
      source={{ uri: "..." }}
      placeholder={{ blurhash: blurHash }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 300,
  },
  galleryImage: {
    width: 150,
    height: 150,
    margin: 4,
  },
  card: {
    width: 200,
    height: 300,
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

/**
 * RECOMMENDED APPROACH:
 *
 * 1. Run the script to generate blurhash-code.ts
 * 2. Move blurhash-code.ts to your lib/ directory
 * 3. Import the helper functions where needed
 * 4. Use with Expo Image's placeholder prop
 *
 * This provides the best user experience with smooth loading transitions
 * and minimal perceived loading time.
 */
