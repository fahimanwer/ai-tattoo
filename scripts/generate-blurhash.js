/**
 * Script to generate BlurHash values for featured tattoo images
 *
 * Usage: node scripts/generate-blurhash.js
 *
 * This will fetch all images from the featured tattoos and generate BlurHash values
 * that can be used for placeholder images while the actual images are loading.
 */

const https = require("https");
const http = require("http");
const { encode } = require("blurhash");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Import the featured tattoos data
const featuredTattoos = [
  {
    id: 1,
    title: "Japanese",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese/abdomen-male.png",
      },
    ],
  },
  {
    id: 2,
    title: "Realistic",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/realistic/abdomen-male.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blackwork",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/blackwork/abdomen-male.png",
      },
    ],
  },
  {
    id: 4,
    title: "Watercolor",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor/abdomen-male.png",
      },
    ],
  },
  {
    id: 5,
    title: "Old School",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/oldschool/abdomen-male.png",
      },
    ],
  },
  {
    id: 6,
    title: "Neo Traditional",
    image: {
      uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/cover.png",
    },
    gallery: [
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/hand-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/abdomen-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/toe-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/arm-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/thigh-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/back-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/neck-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/hand-female.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/neck-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/back-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/thigh-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/arm-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/toe-male.png",
      },
      {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional/abdomen-male.png",
      },
    ],
  },
];

const bodyParts = {
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
  neck: [
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/male-neck-2.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/neck-female-1.png",
    "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/female-neck-2.png",
  ],
};

/**
 * Download an image from a URL
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Generate a BlurHash from an image buffer
 */
async function generateBlurHash(imageBuffer) {
  try {
    // Resize image to a reasonable size for BlurHash encoding (32x32 is sufficient)
    const image = sharp(imageBuffer);
    const { data, info } = await image
      .resize(32, 32, { fit: "inside" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Generate BlurHash (4x3 components is a good balance)
    const blurHash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      3
    );

    return blurHash;
  } catch (error) {
    console.error("Error generating BlurHash:", error);
    throw error;
  }
}

/**
 * Process a single image URL
 */
async function processImage(url, label) {
  try {
    console.log(`Processing: ${label}`);
    const imageBuffer = await downloadImage(url);
    const blurHash = await generateBlurHash(imageBuffer);
    console.log(`✓ ${label}: ${blurHash}`);
    return { url, label, blurHash };
  } catch (error) {
    console.error(`✗ Failed to process ${label}:`, error.message);
    return { url, label, blurHash: null, error: error.message };
  }
}

/**
 * Main function to process all images
 */
async function main() {
  console.log("Starting BlurHash generation...\n");

  const results = {
    featuredTattoos: {},
    bodyParts: {},
  };

  // Process featured tattoos
  for (const tattoo of featuredTattoos) {
    console.log(`\n=== Processing ${tattoo.title} ===`);
    results.featuredTattoos[tattoo.id] = {
      title: tattoo.title,
      cover: null,
      gallery: [],
    };

    // Process cover image
    if (tattoo.image?.uri) {
      const result = await processImage(
        tattoo.image.uri,
        `${tattoo.title} - Cover`
      );
      results.featuredTattoos[tattoo.id].cover = result.blurHash;
    }

    // Process gallery images
    for (let i = 0; i < tattoo.gallery.length; i++) {
      const galleryItem = tattoo.gallery[i];
      const result = await processImage(
        galleryItem.uri,
        `${tattoo.title} - Gallery ${i + 1}`
      );
      results.featuredTattoos[tattoo.id].gallery.push({
        url: galleryItem.uri,
        blurHash: result.blurHash,
      });
    }
  }

  // Process body parts
  console.log("\n\n=== Processing Body Parts ===");
  for (const [bodyPart, urls] of Object.entries(bodyParts)) {
    console.log(`\n--- ${bodyPart} ---`);
    results.bodyParts[bodyPart] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const result = await processImage(url, `${bodyPart} - ${i + 1}`);
      results.bodyParts[bodyPart].push({
        url,
        blurHash: result.blurHash,
      });
    }
  }

  // Save results to file
  const outputPath = path.join(__dirname, "blurhash-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n\n✓ Results saved to: ${outputPath}`);

  // Generate TypeScript code
  console.log("\n\n=== Generated TypeScript Code ===\n");
  generateTypeScriptCode(results);
}

/**
 * Generate TypeScript code that can be added to featured-tattoos.ts
 */
function generateTypeScriptCode(results) {
  console.log("// Add this to your FeaturedTattoo interface:");
  console.log("export interface FeaturedTattoo {");
  console.log("  // ... existing fields");
  console.log("  blurHash?: string;");
  console.log("  galleryBlurHashes?: string[];");
  console.log("}\n");

  console.log("// BlurHash values for featured tattoos:");
  console.log(
    "export const tattooBlurHashes: Record<number, { cover: string; gallery: string[] }> = {"
  );

  for (const [id, data] of Object.entries(results.featuredTattoos)) {
    console.log(`  ${id}: { // ${data.title}`);
    console.log(`    cover: "${data.cover}",`);
    console.log(`    gallery: [`);
    data.gallery.forEach((item, index) => {
      console.log(
        `      "${item.blurHash}"${index < data.gallery.length - 1 ? "," : ""}`
      );
    });
    console.log(`    ]`);
    console.log(`  },`);
  }

  console.log("};\n");

  console.log("// BlurHash values for body parts:");
  console.log("export const bodyPartBlurHashes: Record<string, string[]> = {");

  for (const [bodyPart, items] of Object.entries(results.bodyParts)) {
    console.log(`  ${bodyPart}: [`);
    items.forEach((item, index) => {
      console.log(
        `    "${item.blurHash}"${index < items.length - 1 ? "," : ""}`
      );
    });
    console.log(`  ],`);
  }

  console.log("};");

  // Save TypeScript code to file
  const tsOutputPath = path.join(__dirname, "blurhash-code.ts");
  const tsCode = generateFullTypeScriptFile(results);
  fs.writeFileSync(tsOutputPath, tsCode);
  console.log(`\n✓ TypeScript code saved to: ${tsOutputPath}`);
}

/**
 * Generate a complete TypeScript file with the BlurHash data
 */
function generateFullTypeScriptFile(results) {
  let code = `// Auto-generated BlurHash values for featured tattoos
// Generated on: ${new Date().toISOString()}
// 
// To use these values, import them in your component and apply them to image components
// as placeholder hashes while the actual images are loading.

`;

  code += `export const tattooBlurHashes: Record<number, { cover: string; gallery: string[] }> = {\n`;

  for (const [id, data] of Object.entries(results.featuredTattoos)) {
    code += `  ${id}: { // ${data.title}\n`;
    code += `    cover: "${data.cover}",\n`;
    code += `    gallery: [\n`;
    data.gallery.forEach((item, index) => {
      code += `      "${item.blurHash}"${
        index < data.gallery.length - 1 ? "," : ""
      }\n`;
    });
    code += `    ]\n`;
    code += `  },\n`;
  }

  code += `};\n\n`;

  code += `export const bodyPartBlurHashes: Record<string, string[]> = {\n`;

  for (const [bodyPart, items] of Object.entries(results.bodyParts)) {
    code += `  ${bodyPart}: [\n`;
    items.forEach((item, index) => {
      code += `    "${item.blurHash}"${index < items.length - 1 ? "," : ""}\n`;
    });
    code += `  ],\n`;
  }

  code += `};\n\n`;

  code += `// Helper function to get BlurHash for a tattoo style
export function getTattooBlurHash(tattooId: number, type: 'cover' | 'gallery' = 'cover', galleryIndex?: number): string | undefined {
  const hashes = tattooBlurHashes[tattooId];
  if (!hashes) return undefined;
  
  if (type === 'cover') {
    return hashes.cover;
  } else if (type === 'gallery' && galleryIndex !== undefined) {
    return hashes.gallery[galleryIndex];
  }
  
  return undefined;
}

// Helper function to get BlurHash for a body part
export function getBodyPartBlurHash(bodyPart: string, index: number): string | undefined {
  const hashes = bodyPartBlurHashes[bodyPart];
  if (!hashes || index >= hashes.length) return undefined;
  return hashes[index];
}
`;

  return code;
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
