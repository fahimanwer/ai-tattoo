#!/usr/bin/env bun
/**
 * generate-flow-cards.ts
 *
 * Generates 8 card background images for the flow cards using Gemini,
 * then uploads them to Cloudflare R2.
 *
 * Usage:
 *   bun run scripts/generate-flow-cards.ts
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// ── Config ──────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_MODEL = "gemini-2.0-flash-exp-image-generation";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const R2_ACCOUNT_ID = "8a92a172f6ed803931fbce0a77e98cf5";
const R2_BUCKET = "tattodesign-a8";
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const R2_PUBLIC_URL = "https://pub-a8961674827a414595fcc4e9e08c2760.r2.dev";

// ── S3 client for R2 ───────────────────────────────────────────────────────
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// ── Card definitions ────────────────────────────────────────────────────────
interface CardDef {
  name: string;
  r2Key: string;
  prompt: string;
}

const CARDS: CardDef[] = [
  {
    name: "Generate",
    r2Key: "ai-tattoo/demos/1-generate.avif",
    prompt:
      "A stunning photorealistic close-up of a freshly done intricate tattoo on a person's forearm, depicting an ornate compass rose intertwined with roses. The tattoo has fine black linework with subtle gray shading. Soft warm studio lighting. Shallow depth of field with blurred background. The skin shows realistic texture. Shot like a professional tattoo portfolio photo. Landscape orientation, 16:9 aspect ratio, cinematic.",
  },
  {
    name: "Try On",
    r2Key: "ai-tattoo/demos/2-try-on.avif",
    prompt:
      "A photorealistic image of a person looking at their bare arm in a mirror, with a semi-transparent holographic tattoo overlay visible on the skin — a geometric wolf design glowing faintly. Modern minimalist bathroom setting. Soft natural daylight. The concept is 'trying on' a tattoo virtually before committing. Landscape orientation, 16:9 aspect ratio, cinematic moody lighting.",
  },
  {
    name: "Combine",
    r2Key: "ai-tattoo/demos/3-combine.avif",
    prompt:
      "An artistic double-exposure style composition showing two tattoo designs merging into one: a majestic lion head on the left seamlessly blending into an ornate mandala pattern on the right. Dark moody background. Gold and black ink tones. The fusion looks organic and intentional. Landscape orientation, 16:9 aspect ratio, studio quality, dramatic lighting.",
  },
  {
    name: "Erase",
    r2Key: "ai-tattoo/demos/4-erase.avif",
    prompt:
      "A photorealistic before-and-after concept image showing a person's shoulder. On the left half, there's an old faded tattoo. On the right half, the same skin area is clean and clear as if the tattoo was digitally erased, showing smooth natural skin. Split composition with a subtle dividing line. Soft clinical lighting. Landscape orientation, 16:9 aspect ratio.",
  },
  {
    name: "AI Portrait",
    r2Key: "ai-tattoo/demos/5-ai-portrait.avif",
    prompt:
      "A dramatic portrait of a person with elaborate full-sleeve tattoo artwork visible, shot in cinematic black and white with high contrast. The tattoo features Japanese-style waves and koi fish. Studio portrait lighting with one key light creating dramatic shadows. The person's face is partially visible, focus on the tattooed arm. Landscape orientation, 16:9 aspect ratio, fine art photography style.",
  },
  {
    name: "Pet Portrait",
    r2Key: "ai-tattoo/demos/6-pet-portrait.avif",
    prompt:
      "A beautiful tattoo design of a golden retriever dog rendered in fine-line realistic style on a person's inner forearm. The dog portrait is incredibly detailed with each fur strand visible. Warm amber tones in the ink. Soft natural lighting on the skin. The tattoo looks freshly done, crisp lines. Landscape orientation, 16:9 aspect ratio, close-up macro photography.",
  },
  {
    name: "Select & Edit",
    r2Key: "ai-tattoo/demos/7-select-edit.avif",
    prompt:
      "A close-up of a person's arm showing a tattoo with a glowing selection outline around a specific portion of the design, as if digitally selected for editing. The selected area has a subtle blue glow/highlight around its edges. Modern tech meets traditional tattoo art concept. Clean studio lighting. Landscape orientation, 16:9 aspect ratio, crisp and modern.",
  },
  {
    name: "Upscale",
    r2Key: "ai-tattoo/demos/8-upscale.avif",
    prompt:
      "A split-screen comparison of a small pixelated/blurry tattoo image on the left transforming into a crystal clear ultra-detailed HD version on the right, showing a beautiful phoenix tattoo in vibrant colors. The right side shows incredible detail in feathers and flames. Arrows or visual flow suggesting enhancement. Dark background. Landscape orientation, 16:9 aspect ratio.",
  },
];

// ── Generate image via Gemini ───────────────────────────────────────────────
async function generateImage(prompt: string): Promise<Buffer> {
  console.log("  Calling Gemini API...");

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const candidates = data.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates in Gemini response");
  }

  const parts = candidates[0]?.content?.parts;
  if (!parts) {
    throw new Error("No parts in Gemini response");
  }

  const imagePart = parts.find((p: any) => p.inlineData);
  if (!imagePart?.inlineData?.data) {
    throw new Error(
      "No image data in Gemini response. Parts: " +
        JSON.stringify(parts.map((p: any) => Object.keys(p)))
    );
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

// ── Upload to R2 ────────────────────────────────────────────────────────────
async function uploadToR2(key: string, data: Buffer): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: new Uint8Array(data),
      ContentType: "image/png",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return `${R2_PUBLIC_URL}/${key}`;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY env var");
    process.exit(1);
  }
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY env vars");
    process.exit(1);
  }

  console.log("Generating 8 flow card images via Gemini...\n");

  const results: { name: string; url: string; status: string }[] = [];

  for (const card of CARDS) {
    console.log(`[${card.name}] Generating...`);
    try {
      const imageBuffer = await generateImage(card.prompt);
      console.log(
        `  Got ${(imageBuffer.length / 1024).toFixed(0)}KB image, uploading to R2...`
      );

      const url = await uploadToR2(card.r2Key, imageBuffer);
      console.log(`  Uploaded: ${url}\n`);
      results.push({ name: card.name, url, status: "ok" });
    } catch (err: any) {
      console.error(`  FAILED: ${err.message}\n`);
      results.push({ name: card.name, url: "", status: err.message });
    }
  }

  console.log("\n── Results ──");
  for (const r of results) {
    const icon = r.status === "ok" ? "✓" : "✗";
    console.log(`  ${icon} ${r.name}: ${r.status === "ok" ? r.url : r.status}`);
  }

  const ok = results.filter((r) => r.status === "ok").length;
  console.log(`\n${ok}/${results.length} images generated and uploaded.`);
}

main().catch(console.error);
