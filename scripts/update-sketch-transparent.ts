#!/usr/bin/env bun
/**
 * update-sketch-transparent.ts
 *
 * Reads the transparent-manifest.json and updates lib/sketch-design.ts
 * to add `transparentUri` to each gallery entry.
 *
 * Usage:
 *   bun run scripts/update-sketch-transparent.ts
 *   bun run scripts/update-sketch-transparent.ts --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface ManifestEntry {
  originalUri: string;
  transparentUri: string;
  style: string;
  index: number;
}

const DRY_RUN = process.argv.includes("--dry-run");

const manifestPath = join(__dirname, "transparent-manifest.json");
const sketchPath = join(__dirname, "..", "lib", "sketch-design.ts");

// Load manifest
const manifest: ManifestEntry[] = JSON.parse(
  readFileSync(manifestPath, "utf-8")
);
console.log(`Loaded manifest: ${manifest.length} entries`);

// Build lookup: originalUri → transparentUri
const lookup = new Map<string, string>();
for (const entry of manifest) {
  lookup.set(entry.originalUri, entry.transparentUri);
}

// Read sketch-design.ts
let content = readFileSync(sketchPath, "utf-8");

let replacements = 0;

// For each manifest entry, find the uri line and add transparentUri after it
for (const [originalUri, transparentUri] of lookup) {
  // Match the uri line pattern (with possible existing transparentUri)
  const uriLine = `uri: "${originalUri}",`;

  if (!content.includes(uriLine)) {
    console.warn(`  WARNING: URI not found in source: ${originalUri}`);
    continue;
  }

  // Check if transparentUri already exists for this entry
  const existingPattern = new RegExp(
    `uri: "${originalUri.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\s*\\n\\s*transparentUri: "[^"]*",`
  );

  if (existingPattern.test(content)) {
    // Update existing transparentUri
    content = content.replace(
      existingPattern,
      `uri: "${originalUri}",\n        transparentUri: "${transparentUri}",`
    );
  } else {
    // Add transparentUri after uri line
    content = content.replace(
      `uri: "${originalUri}",`,
      `uri: "${originalUri}",\n        transparentUri: "${transparentUri}",`
    );
  }
  replacements++;
}

console.log(`Applied ${replacements}/${lookup.size} transparentUri entries`);

if (DRY_RUN) {
  console.log("Dry run — not writing file");
} else {
  writeFileSync(sketchPath, content);
  console.log(`Updated: ${sketchPath}`);
}
