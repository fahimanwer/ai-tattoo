/**
 * Generates Google Play subscription JSON files for gplay CLI.
 * Creates 4 subscription configs + 2 offer configs (for annual plans).
 *
 * Run: bun scripts/generate-gplay-subs.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(import.meta.dir, "..", "tmp", "gplay-subs");
mkdirSync(OUT_DIR, { recursive: true });

// Google Play locale codes matching our Fastlane setup
const LOCALES = [
  "en-US", "en-GB", "ar", "cs-CZ", "da-DK", "de-DE", "el-GR",
  "es-ES", "es-419", "fi-FI", "fr-FR", "iw-IL", "hi-IN", "hr",
  "hu-HU", "id", "it-IT", "ja-JP", "ko-KR", "ms", "nl-NL",
  "no-NO", "pl-PL", "pt-BR", "pt-PT", "ro", "ru-RU", "sv-SE",
  "th", "tr-TR", "uk", "vi", "zh-CN", "zh-TW",
];

// Localized subscription titles and descriptions
const listings: Record<string, { title: string; description: string }> = {
  "en-US": { title: "Tattoo Design AI Pro", description: "Unlock AI tattoo generation, try-on, cover-up ideas & stencils" },
  "en-GB": { title: "Tattoo Design AI Pro", description: "Unlock AI tattoo generation, try-on, cover-up ideas & stencils" },
  "ar": { title: "Tattoo Design AI Pro", description: "افتح توليد التاتو بالذكاء الاصطناعي والتجربة وأفكار التغطية والاستنسل" },
  "cs-CZ": { title: "Tattoo Design AI Pro", description: "Odemkněte AI generování tetování, vyzkoušení, nápady na zakrytí a šablony" },
  "da-DK": { title: "Tattoo Design AI Pro", description: "Lås op for AI-tatoveringsgenerering, prøvning, cover-up idéer og skabeloner" },
  "de-DE": { title: "Tattoo Design AI Pro", description: "KI-Tattoo-Generierung, Anprobe, Cover-up-Ideen und Schablonen freischalten" },
  "el-GR": { title: "Tattoo Design AI Pro", description: "Ξεκλειδώστε AI δημιουργία τατουάζ, δοκιμή, ιδέες κάλυψης και στένσιλ" },
  "es-ES": { title: "Tattoo Design AI Pro", description: "Desbloquea generación de tatuajes IA, prueba, ideas de cobertura y plantillas" },
  "es-419": { title: "Tattoo Design AI Pro", description: "Desbloquea generación de tatuajes IA, prueba, ideas de cobertura y plantillas" },
  "fi-FI": { title: "Tattoo Design AI Pro", description: "Avaa AI-tatuointigenerointi, kokeilu, peittoideat ja kaavaimet" },
  "fr-FR": { title: "Tattoo Design AI Pro", description: "Débloquez la génération de tatouages IA, l'essai, les idées de couverture et les pochoirs" },
  "iw-IL": { title: "Tattoo Design AI Pro", description: "פתח יצירת קעקועים בAI, ניסיון, רעיונות כיסוי וסטנסילים" },
  "hi-IN": { title: "Tattoo Design AI Pro", description: "AI टैटू जनरेशन, ट्राई-ऑन, कवर-अप आइडिया और स्टेंसिल अनलॉक करें" },
  "hr": { title: "Tattoo Design AI Pro", description: "Otključajte AI generiranje tetovaža, isprobavanje, ideje za prekrivanje i šablone" },
  "hu-HU": { title: "Tattoo Design AI Pro", description: "AI tetoválás generálás, felpróbálás, fedési ötletek és sablonok feloldása" },
  "id": { title: "Tattoo Design AI Pro", description: "Buka generasi tato AI, coba di tubuh, ide cover-up & stensil" },
  "it-IT": { title: "Tattoo Design AI Pro", description: "Sblocca generazione tatuaggi IA, prova, idee di copertura e stencil" },
  "ja-JP": { title: "Tattoo Design AI Pro", description: "AIタトゥー生成、試着、カバーアップアイデア、ステンシルをアンロック" },
  "ko-KR": { title: "Tattoo Design AI Pro", description: "AI 타투 생성, 착용 미리보기, 커버업 아이디어 및 스텐실 잠금 해제" },
  "ms": { title: "Tattoo Design AI Pro", description: "Buka kunci penjanaan tatu AI, cubaan, idea penutupan & stensil" },
  "nl-NL": { title: "Tattoo Design AI Pro", description: "Ontgrendel AI-tatoeagegeneratie, uitproberen, cover-up ideeën en sjablonen" },
  "no-NO": { title: "Tattoo Design AI Pro", description: "Lås opp AI-tatoveringsgenerering, prøving, cover-up idéer og maler" },
  "pl-PL": { title: "Tattoo Design AI Pro", description: "Odblokuj generowanie tatuaży AI, przymierzanie, pomysły na zakrycie i szablony" },
  "pt-BR": { title: "Tattoo Design AI Pro", description: "Desbloqueie geração de tatuagens IA, experimentação, ideias de cobertura e estênceis" },
  "pt-PT": { title: "Tattoo Design AI Pro", description: "Desbloqueie geração de tatuagens IA, experimentação, ideias de cobertura e estênceis" },
  "ro": { title: "Tattoo Design AI Pro", description: "Deblocați generarea de tatuaje AI, încercare, idei de acoperire și șabloane" },
  "ru-RU": { title: "Tattoo Design AI Pro", description: "Разблокируйте ИИ-генерацию тату, примерку, идеи перекрытия и трафареты" },
  "sv-SE": { title: "Tattoo Design AI Pro", description: "Lås upp AI-tatueringsgenerering, provning, cover-up idéer och mallar" },
  "th": { title: "Tattoo Design AI Pro", description: "ปลดล็อกการสร้างรอยสัก AI ทดลอง ไอเดียปกปิด และสเตนซิล" },
  "tr-TR": { title: "Tattoo Design AI Pro", description: "AI dövme oluşturma, deneme, kapatma fikirleri ve şablonları açın" },
  "uk": { title: "Tattoo Design AI Pro", description: "Розблокуйте ШІ-генерацію тату, приміряння, ідеї перекриття та трафарети" },
  "vi": { title: "Tattoo Design AI Pro", description: "Mở khóa tạo hình xăm AI, thử nghiệm, ý tưởng che phủ và khuôn mẫu" },
  "zh-CN": { title: "Tattoo Design AI Pro", description: "解锁AI纹身生成、试穿、遮盖创意和模板" },
  "zh-TW": { title: "Tattoo Design AI Pro", description: "解鎖AI紋身生成、試穿、遮蓋創意和模板" },
};

function buildListings() {
  const result: Record<string, { title: string; description: string }> = {};
  for (const locale of LOCALES) {
    result[locale] = listings[locale] || listings["en-US"];
  }
  return result;
}

// Subscription definitions
const subscriptions = [
  {
    filename: "sub_pro_weekly.json",
    productId: "tattoodesignai_pro_weekly",
    basePlanId: "pro-weekly",
    priceMicros: "9990000",
    currency: "USD",
    period: "P1W",
  },
  {
    filename: "sub_pro_annual.json",
    productId: "tattoodesignai_pro_annual",
    basePlanId: "pro-annual",
    priceMicros: "59990000",
    currency: "USD",
    period: "P1Y",
  },
  {
    filename: "sub_offer_weekly.json",
    productId: "tattoodesignai_offer_weekly",
    basePlanId: "offer-weekly",
    priceMicros: "6990000",
    currency: "USD",
    period: "P1W",
  },
  {
    filename: "sub_offer_annual.json",
    productId: "tattoodesignai_offer_annual",
    basePlanId: "offer-annual",
    priceMicros: "39990000",
    currency: "USD",
    period: "P1Y",
  },
];

// Generate subscription JSONs
for (const sub of subscriptions) {
  const json = {
    productId: sub.productId,
    basePlans: [
      {
        basePlanId: sub.basePlanId,
        state: "ACTIVE",
        regionalConfigs: [
          {
            regionCode: "US",
            price: {
              priceMicros: sub.priceMicros,
              currency: sub.currency,
            },
          },
        ],
        autoRenewingBasePlanType: {
          billingPeriodDuration: sub.period,
        },
      },
    ],
    listings: buildListings(),
  };

  const path = join(OUT_DIR, sub.filename);
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`✓ ${sub.filename} (${sub.productId})`);
}

// Generate free trial offers for annual plans
const annualOffers = [
  {
    filename: "offer_pro_annual_trial.json",
    productId: "tattoodesignai_pro_annual",
    basePlanId: "pro-annual",
  },
  {
    filename: "offer_offer_annual_trial.json",
    productId: "tattoodesignai_offer_annual",
    basePlanId: "offer-annual",
  },
];

for (const offer of annualOffers) {
  const json = {
    offerId: "trial-7day",
    state: "ACTIVE",
    phases: [
      {
        duration: "P7D",
        pricingType: "FREE_TRIAL",
      },
    ],
    regionalConfigs: [
      {
        regionCode: "US",
      },
    ],
  };

  const path = join(OUT_DIR, offer.filename);
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`✓ ${offer.filename} (7-day trial for ${offer.productId})`);
}

console.log(`\nAll files written to ${OUT_DIR}`);
console.log("\nTo create subscriptions, run:");
console.log("  gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_pro_weekly.json");
console.log("  gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_pro_annual.json");
console.log("  gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_offer_weekly.json");
console.log("  gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_offer_annual.json");
console.log("\nTo create free trial offers on annual plans:");
console.log("  gplay offers create --package com.fahimanwer.tattooai --product-id tattoodesignai_pro_annual --base-plan pro-annual --json @tmp/gplay-subs/offer_pro_annual_trial.json");
console.log("  gplay offers create --package com.fahimanwer.tattooai --product-id tattoodesignai_offer_annual --base-plan offer-annual --json @tmp/gplay-subs/offer_offer_annual_trial.json");
