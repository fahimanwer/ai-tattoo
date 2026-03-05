#!/usr/bin/env bun
/**
 * migrate-cdn-to-r2.ts
 *
 * Downloads all static assets from CloudFront and uploads them to Cloudflare R2.
 * Preserves the `/ai-tattoo/...` path structure.
 *
 * Prerequisites:
 *   1. Enable "R2.dev subdomain" on your bucket in Cloudflare Dashboard
 *   2. Create an R2 API token with read/write permissions
 *   3. Set environment variables:
 *      - R2_ACCESS_KEY_ID
 *      - R2_SECRET_ACCESS_KEY
 *
 * Usage:
 *   bun run scripts/migrate-cdn-to-r2.ts
 *   bun run scripts/migrate-cdn-to-r2.ts --dry-run   # preview only
 */

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { readdir } from "node:fs/promises";
import { resolve, extname } from "node:path";

// ── Config ──────────────────────────────────────────────────────────────────
const CLOUDFRONT_ORIGIN = "https://d3ynb031qx3d1.cloudfront.net";
const R2_ACCOUNT_ID = "8a92a172f6ed803931fbce0a77e98cf5";
const R2_BUCKET = "tattodesign-a8";
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const R2_PUBLIC_URL =
  "https://pub-a8961674827a414595fcc4e9e08c2760.r2.dev";

const DRY_RUN = process.argv.includes("--dry-run");

// ── S3 client for R2 ───────────────────────────────────────────────────────
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// ── MIME types ──────────────────────────────────────────────────────────────
const MIME_MAP: Record<string, string> = {
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".json": "application/json",
};

function getContentType(path: string): string {
  const ext = extname(path).toLowerCase();
  return MIME_MAP[ext] || "application/octet-stream";
}

// ── Collect all CloudFront URLs from the codebase ───────────────────────────
async function collectUrlsFromCodebase(): Promise<Set<string>> {
  const urls = new Set<string>();
  const srcRoot = resolve(import.meta.dir, "..");

  // File extensions to scan
  const scanExtensions = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".swift",
  ]);

  async function scanDir(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name);
      // Skip node_modules, .git, etc
      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".git" ||
          entry.name === ".expo" ||
          entry.name === "android" ||
          entry.name === "ios"
        ) {
          continue;
        }
        await scanDir(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (!scanExtensions.has(ext)) continue;
        const content = await Bun.file(fullPath).text();
        // Match both old CloudFront and new R2 URLs (in case partially migrated)
        const regex =
          /https:\/\/(?:d3ynb031qx3d1\.cloudfront\.net|pub-a8961674827a414595fcc4e9e08c2760\.r2\.dev)(\/ai-tattoo\/[^\s"'`,)]+)/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(content)) !== null) {
          urls.add(match[1]); // Just the path part: /ai-tattoo/...
        }
      }
    }
  }

  await scanDir(srcRoot);
  return urls;
}

// ── Check if object already exists in R2 ────────────────────────────────────
async function existsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(
      new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key })
    );
    return true;
  } catch {
    return false;
  }
}

// ── Download from CloudFront and upload to R2 ───────────────────────────────
async function migrateAsset(
  path: string
): Promise<{ path: string; status: "uploaded" | "skipped" | "failed"; error?: string }> {
  // Strip leading slash for S3 key
  const key = path.startsWith("/") ? path.slice(1) : path;

  // Check if already uploaded
  if (await existsInR2(key)) {
    return { path, status: "skipped" };
  }

  if (DRY_RUN) {
    return { path, status: "skipped" };
  }

  try {
    // Download from CloudFront
    const sourceUrl = `${CLOUDFRONT_ORIGIN}${path}`;
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      return {
        path,
        status: "failed",
        error: `HTTP ${response.status} from CloudFront`,
      };
    }

    const body = await response.arrayBuffer();
    const contentType = getContentType(path);

    // Upload to R2
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: new Uint8Array(body),
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    return { path, status: "uploaded" };
  } catch (err: any) {
    return { path, status: "failed", error: err.message };
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Scanning codebase for CDN asset URLs...");
  const paths = await collectUrlsFromCodebase();
  console.log(`Found ${paths.size} unique asset paths.\n`);

  if (DRY_RUN) {
    console.log("DRY RUN — listing paths only:");
    for (const p of [...paths].sort()) {
      console.log(`  ${p}`);
    }
    return;
  }

  // Verify credentials
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error(
      "Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY env vars.\n" +
        "Create an R2 API token at:\n" +
        "  Cloudflare Dashboard → R2 → Manage R2 API Tokens\n"
    );
    process.exit(1);
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  const failures: { path: string; error?: string }[] = [];

  // Process in batches of 10 to avoid overwhelming the network
  const pathArray = [...paths].sort();
  const BATCH_SIZE = 10;

  for (let i = 0; i < pathArray.length; i += BATCH_SIZE) {
    const batch = pathArray.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(migrateAsset));

    for (const r of results) {
      switch (r.status) {
        case "uploaded":
          uploaded++;
          console.log(`  ✓ ${r.path}`);
          break;
        case "skipped":
          skipped++;
          break;
        case "failed":
          failed++;
          failures.push(r);
          console.log(`  ✗ ${r.path}: ${r.error}`);
          break;
      }
    }

    // Progress
    const done = Math.min(i + BATCH_SIZE, pathArray.length);
    process.stdout.write(
      `\r  Progress: ${done}/${pathArray.length} (${uploaded} uploaded, ${skipped} skipped, ${failed} failed)`
    );
  }

  console.log("\n\n── Summary ──");
  console.log(`  Total:    ${paths.size}`);
  console.log(`  Uploaded: ${uploaded}`);
  console.log(`  Skipped:  ${skipped} (already exist)`);
  console.log(`  Failed:   ${failed}`);

  if (failures.length > 0) {
    console.log("\n── Failures ──");
    for (const f of failures) {
      console.log(`  ${f.path}: ${f.error}`);
    }
  }

  // Verification: spot-check a few assets
  console.log("\n── Verification ──");
  const samplePaths = pathArray.slice(0, 3);
  for (const p of samplePaths) {
    const url = `${R2_PUBLIC_URL}${p}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      console.log(`  ${url} → ${res.status} ${res.ok ? "OK" : "FAIL"}`);
    } catch (err: any) {
      console.log(`  ${url} → ERROR: ${err.message}`);
    }
  }
}

main().catch(console.error);
