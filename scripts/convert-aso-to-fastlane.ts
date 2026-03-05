/**
 * Converts ASO/android metadata.json files to Fastlane directory format.
 * Google Play locale codes differ from our folder names.
 *
 * Run: bun scripts/convert-aso-to-fastlane.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const ASO_DIR = join(import.meta.dir, "..", "ASO", "android");
const FASTLANE_DIR = join(import.meta.dir, "..", "fastlane", "metadata", "android");

// Map our ASO folder locale codes → Google Play locale codes
const LOCALE_MAP: Record<string, string> = {
  "en-US": "en-US",
  "en-GB": "en-GB",
  ar: "ar",
  cs: "cs-CZ",
  da: "da-DK",
  de: "de-DE",
  el: "el-GR",
  es: "es-ES",
  "es-MX": "es-419", // Google Play uses es-419 for Latin America
  fi: "fi-FI",
  fr: "fr-FR",
  he: "iw-IL", // Google uses legacy Java locale code
  hi: "hi-IN",
  hr: "hr",
  hu: "hu-HU",
  id: "id",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  ms: "ms",
  nl: "nl-NL",
  no: "no-NO",
  pl: "pl-PL",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  ro: "ro",
  ru: "ru-RU",
  sv: "sv-SE",
  th: "th",
  tr: "tr-TR",
  uk: "uk",
  vi: "vi",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
};

let converted = 0;
let errors: string[] = [];

for (const [asoLocale, gplayLocale] of Object.entries(LOCALE_MAP)) {
  const srcPath = join(ASO_DIR, asoLocale, "metadata.json");
  const destDir = join(FASTLANE_DIR, gplayLocale);

  try {
    const raw = readFileSync(srcPath, "utf-8");
    const data = JSON.parse(raw);

    mkdirSync(destDir, { recursive: true });

    writeFileSync(join(destDir, "title.txt"), data.title);
    writeFileSync(join(destDir, "short_description.txt"), data.short_description);
    writeFileSync(join(destDir, "full_description.txt"), data.full_description);

    converted++;
    console.log(`✓ ${asoLocale} → ${gplayLocale}`);
  } catch (e: any) {
    errors.push(`${asoLocale}: ${e.message}`);
  }
}

console.log(`\nConverted: ${converted}/${Object.keys(LOCALE_MAP).length}`);
if (errors.length) {
  console.log("\nErrors:");
  errors.forEach((e) => console.log(`  ✗ ${e}`));
}
