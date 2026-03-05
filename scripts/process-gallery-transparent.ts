#!/usr/bin/env bun
/**
 * process-gallery-transparent.ts
 *
 * Processes gallery designs through Replicate birefnet background-removal
 * to generate transparent-background PNGs, then uploads them to R2.
 *
 * Usage:
 *   REPLICATE_API_TOKEN=r8_xxx bun run scripts/process-gallery-transparent.ts
 *   ... --dry-run                # preview only
 *   ... --style=dotwork          # process one style only
 *   ... --model=851-labs         # use 851-labs/background-remover instead
 *   ... --batch=5               # batch size (default 5)
 *   ... --limit=1               # only process first N images (for testing)
 *
 * Prerequisites:
 *   - REPLICATE_API_TOKEN env var
 *   - R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in .env.local
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { sketchDesigns } from "../lib/sketch-design";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { tmpdir } from "os";

// ── Config ────────────────────────────────────────────────────────────────
const R2_ACCOUNT_ID = "8a92a172f6ed803931fbce0a77e98cf5";
const R2_BUCKET = "tattodesign-a8";
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const R2_PUBLIC_URL = "https://pub-a8961674827a414595fcc4e9e08c2760.r2.dev";

// Load .env.local for R2 credentials
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1]!.trim();
      const val = match[2]!.trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!REPLICATE_TOKEN) {
  console.error("Missing REPLICATE_API_TOKEN in environment");
  process.exit(1);
}

// ── CLI args ──────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");
const MODEL_ARG = process.argv.find((a) => a.startsWith("--model="));
const MODEL = MODEL_ARG?.split("=")[1] || "birefnet";
const BATCH_ARG = process.argv.find((a) => a.startsWith("--batch="));
const BATCH_SIZE = BATCH_ARG ? parseInt(BATCH_ARG.split("=")[1]!) : 5;
const STYLE_ARG = process.argv.find((a) => a.startsWith("--style="));
const STYLE_FILTER = STYLE_ARG?.split("=")[1]?.toLowerCase();
const LIMIT_ARG = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split("=")[1]!) : Infinity;
const DELAY_MS = 2000;

// ── Replicate model versions ──────────────────────────────────────────────
const REPLICATE_MODELS: Record<string, { owner: string; version: string }> = {
  birefnet: {
    owner: "men1scus/birefnet",
    version:
      "f74986db0355b58403ed20963af156525e2891ea3c2d499bfbfb2a28cd87c5d7",
  },
  "851-labs": {
    owner: "851-labs/background-remover",
    version:
      "a029dff38972b5fda4ec5d75e9ffbfad3df0dbff6418e4e1ba04eeb54a5ed098",
  },
};

const modelConfig = REPLICATE_MODELS[MODEL] ?? REPLICATE_MODELS.birefnet!;

// ── S3 client for R2 ──────────────────────────────────────────────────────
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// ── Types ─────────────────────────────────────────────────────────────────
interface ProcessResult {
  originalUri: string;
  transparentUri: string;
  style: string;
  index: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Download AVIF, convert to PNG via sips (macOS), return base64 PNG */
async function downloadAndConvertToPng(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = await res.arrayBuffer();

  // Write to temp AVIF
  const tmpAvif = join(tmpdir(), `tattoo-${Date.now()}.avif`);
  const tmpPng = tmpAvif.replace(".avif", ".png");
  writeFileSync(tmpAvif, Buffer.from(buffer));

  // Convert AVIF → PNG using sips (macOS built-in)
  execSync(`sips -s format png "${tmpAvif}" --out "${tmpPng}"`, {
    stdio: "pipe",
  });

  // Read PNG as base64
  const pngBuffer = readFileSync(tmpPng);

  // Cleanup
  try {
    execSync(`rm -f "${tmpAvif}" "${tmpPng}"`, { stdio: "pipe" });
  } catch {}

  return pngBuffer.toString("base64");
}

/** Send base64 PNG to Replicate, wait for result, return output URL */
async function removeBackgroundViaReplicate(
  base64Png: string
): Promise<string> {
  const dataUri = `data:image/png;base64,${base64Png}`;

  // Create prediction with Prefer: wait (synchronous for fast models)
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      version: modelConfig.version,
      input: { image: dataUri },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Replicate API error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  if (data.status === "failed") {
    throw new Error(`Replicate prediction failed: ${data.error}`);
  }

  // birefnet returns output as a single URL string
  const output = data.output;
  if (!output) throw new Error("No output from Replicate");

  // Output can be a string URL or an array
  const outputUrl = Array.isArray(output) ? output[0] : output;
  if (typeof outputUrl !== "string") {
    throw new Error(`Unexpected output type: ${typeof outputUrl}`);
  }

  return outputUrl;
}

/** Download the result PNG from Replicate and return as Buffer */
async function downloadResultPng(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Failed to download result: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadToR2(
  pngBuffer: Buffer,
  r2Key: string
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: r2Key,
      Body: pngBuffer,
      ContentType: "image/png",
    })
  );

  return `${R2_PUBLIC_URL}/${r2Key}`;
}

function getR2Key(style: string, index: number): string {
  const slug = style.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `ai-tattoo/designs-transparent/${slug}/sketch-design-${slug}-${index}.png`;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🎨 Gallery Transparent PNG Processor (Replicate)`);
  console.log(`  Model: ${MODEL} (${modelConfig.owner})`);
  console.log(`  Batch size: ${BATCH_SIZE}`);
  console.log(`  Dry run: ${DRY_RUN}`);
  if (STYLE_FILTER) console.log(`  Style filter: ${STYLE_FILTER}`);
  if (LIMIT < Infinity) console.log(`  Limit: ${LIMIT}`);
  console.log("");

  // Collect all images to process
  const designs = STYLE_FILTER
    ? sketchDesigns.filter(
        (s) => s.title.toLowerCase() === STYLE_FILTER
      )
    : sketchDesigns;

  if (designs.length === 0) {
    console.error(
      `No designs found${STYLE_FILTER ? ` for style "${STYLE_FILTER}"` : ""}`
    );
    process.exit(1);
  }

  const allItems: { style: string; uri: string; index: number }[] = [];
  for (const design of designs) {
    design.gallery.forEach((img, idx) => {
      allItems.push({ style: design.title, uri: img.uri, index: idx });
    });
  }

  // Apply limit
  const items = allItems.slice(0, LIMIT);

  console.log(
    `  Total images: ${items.length}${LIMIT < Infinity ? ` (limited from ${allItems.length})` : ""}\n`
  );

  const results: ProcessResult[] = [];
  const errors: { uri: string; error: string }[] = [];

  // Load existing manifest to resume
  const manifestPath = join(__dirname, "transparent-manifest.json");
  let existingManifest: ProcessResult[] = [];
  if (existsSync(manifestPath)) {
    try {
      existingManifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
      console.log(
        `  Loaded existing manifest: ${existingManifest.length} entries\n`
      );
    } catch {}
  }

  // Skip already-processed
  const processedUris = new Set(existingManifest.map((r) => r.originalUri));

  // Process in batches
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(items.length / BATCH_SIZE);

    console.log(
      `  Batch ${batchNum}/${totalBatches} (${batch.length} images)`
    );

    const batchResults = await Promise.allSettled(
      batch.map(async (item) => {
        const tag = `[${item.style}/${item.index}]`;

        // Skip if already processed
        if (processedUris.has(item.uri)) {
          const existing = existingManifest.find(
            (r) => r.originalUri === item.uri
          )!;
          console.log(`    ${tag} Already processed, skipping`);
          return existing;
        }

        try {
          const r2Key = getR2Key(item.style, item.index);

          if (DRY_RUN) {
            console.log(`    ${tag} Would upload to: ${r2Key}`);
            return {
              originalUri: item.uri,
              transparentUri: `${R2_PUBLIC_URL}/${r2Key}`,
              style: item.style,
              index: item.index,
            };
          }

          console.log(`    ${tag} Downloading & converting to PNG...`);
          const base64Png = await downloadAndConvertToPng(item.uri);

          console.log(
            `    ${tag} Removing background via ${MODEL}...`
          );
          const resultUrl =
            await removeBackgroundViaReplicate(base64Png);

          console.log(`    ${tag} Downloading result...`);
          const resultPng = await downloadResultPng(resultUrl);

          console.log(
            `    ${tag} Uploading to R2 (${(resultPng.length / 1024).toFixed(0)}KB)...`
          );
          const publicUrl = await uploadToR2(resultPng, r2Key);

          console.log(`    ${tag} ✓ ${publicUrl}`);
          return {
            originalUri: item.uri,
            transparentUri: publicUrl,
            style: item.style,
            index: item.index,
          };
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`    ${tag} FAILED: ${msg}`);
          throw err;
        }
      })
    );

    for (let j = 0; j < batchResults.length; j++) {
      const r = batchResults[j]!;
      if (r.status === "fulfilled") {
        results.push(r.value);
      } else {
        errors.push({
          uri: batch[j]!.uri,
          error:
            r.reason instanceof Error ? r.reason.message : String(r.reason),
        });
      }
    }

    // Save manifest incrementally
    const allResults = [...existingManifest, ...results].filter(
      (r, i, arr) =>
        arr.findIndex((x) => x.originalUri === r.originalUri) === i
    );
    writeFileSync(manifestPath, JSON.stringify(allResults, null, 2));

    // Delay between batches to avoid rate limits
    if (i + BATCH_SIZE < items.length) {
      console.log(
        `    Waiting ${DELAY_MS / 1000}s before next batch...\n`
      );
      await sleep(DELAY_MS);
    }
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Processed: ${results.length}/${items.length}`);
  console.log(`  Errors: ${errors.length}`);
  console.log(`  Manifest: ${manifestPath}`);

  if (errors.length > 0) {
    console.log(`\n  Failed images:`);
    for (const e of errors) {
      console.log(`    - ${e.uri}: ${e.error}`);
    }
  }

  console.log("");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
