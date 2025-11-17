# BlurHash Generator Script

This script generates BlurHash values for all featured tattoo images and body part images used in the AI Tattoo app.

## What is BlurHash?

BlurHash is a compact representation of a placeholder for an image. It's a very small string that represents the visual appearance of an image, which can be decoded into a blurred placeholder while the actual image is loading.

## Prerequisites

You need to have Node.js installed. This script requires two npm packages:

- `blurhash` - For generating the BlurHash strings
- `sharp` - For image processing

## Installation

1. Navigate to the scripts directory:

```bash
cd scripts
```

2. Install the required dependencies:

```bash
npm install blurhash sharp
```

Or if you prefer using the project's package manager:

```bash
npm install --save-dev blurhash sharp
```

## Usage

Run the script from the project root:

```bash
node scripts/generate-blurhash.js
```

Or from within the scripts directory:

```bash
node generate-blurhash.js
```

## Output

The script will:

1. **Download and process all images** - It fetches all images from CloudFront and processes them
2. **Generate BlurHash values** - Creates a compact hash for each image
3. **Save results to JSON** - Creates `blurhash-results.json` with all the data
4. **Generate TypeScript code** - Creates `blurhash-code.ts` with ready-to-use TypeScript exports
5. **Print results to console** - Shows progress and final TypeScript code

### Output Files

- `scripts/blurhash-results.json` - Raw JSON data with all BlurHash values
- `scripts/blurhash-code.ts` - TypeScript file ready to import into your app

## Integrating the Results

After running the script, you can integrate the BlurHash values into your app:

### Option 1: Import the generated file

```typescript
import {
  tattooBlurHashes,
  bodyPartBlurHashes,
  getTattooBlurHash,
} from "./scripts/blurhash-code";

// Use in your component
const blurHash = getTattooBlurHash(1, "cover"); // Gets cover BlurHash for Japanese style
```

### Option 2: Add to existing featured-tattoos.ts

You can copy the generated code from `blurhash-code.ts` and add it to your existing `lib/featured-tattoos.ts` file.

First, update the interface:

```typescript
export interface FeaturedTattoo {
  // ... existing fields
  blurHash?: string;
  galleryBlurHashes?: string[];
}
```

Then add the BlurHash data and helper functions from the generated file.

### Option 3: Update the data inline

Alternatively, you can add the `blurHash` values directly to each tattoo object in the `featuredTattoos` array.

## Using BlurHash in React Native

If you're using Expo Image (which you are), you can use the blurhash like this:

```tsx
import { Image } from "expo-image";

<Image
  source={{ uri: tattoo.image.uri }}
  placeholder={{ blurhash: tattooBlurHashes[tattoo.id].cover }}
  style={styles.image}
  contentFit="cover"
  transition={200}
/>;
```

The image will show a blurred placeholder based on the BlurHash while loading, then smoothly transition to the full image.

## Troubleshooting

### "Cannot find module 'blurhash'"

Make sure you've installed the dependencies:

```bash
npm install blurhash sharp
```

### "Error downloading image"

Check your internet connection and verify that the image URLs are accessible.

### "Error generating BlurHash"

This might happen if an image is corrupted or in an unsupported format. The script will continue processing other images and mark failed ones in the output.

## Re-running the Script

You can safely re-run this script whenever:

- New images are added to featured tattoos
- Image URLs change
- You want to regenerate the BlurHash values with different parameters

The script will overwrite the previous output files.

## Customizing BlurHash Components

In the script, the BlurHash is generated with 4x3 components (in `generateBlurHash` function):

```javascript
const blurHash = encode(
  new Uint8ClampedArray(data),
  info.width,
  info.height,
  4, // X components
  3 // Y components
);
```

You can adjust these values:

- Lower values (3x3) = smaller hash, less detail, faster
- Higher values (5x4) = larger hash, more detail, slower

The default (4x3) is a good balance for most use cases.
