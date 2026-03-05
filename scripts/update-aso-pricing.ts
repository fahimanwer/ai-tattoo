/**
 * Updates all ASO/android metadata.json files from monthly to annual pricing.
 * Changes: $19.99/month → $59.99/year, 50% savings → 88% savings,
 * and updates free trial text to mention 7-day trial with annual plan.
 *
 * Run: bun scripts/update-aso-pricing.ts
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const ASO_DIR = join(import.meta.dir, "..", "ASO", "android");

// Each locale needs: old monthly line → new annual line, old trial → new trial
const replacements: Record<
  string,
  { oldMonthly: string; newAnnual: string; oldTrial: string; newTrial: string }
> = {
  "en-US": {
    oldMonthly:
      "• Monthly: $19.99/month — 80 AI generations (Save 50%)",
    newAnnual:
      "• Annual: $59.99/year — 80 AI generations (Save 88%)",
    oldTrial: "• Free trial includes 1 AI generation",
    newTrial: "• 7-day free trial available with annual plan",
  },
  "en-GB": {
    oldMonthly:
      "• Monthly: £15.99/month — 80 AI generations (Save 50%)",
    newAnnual:
      "• Annual: £47.99/year — 80 AI generations (Save 88%)",
    oldTrial: "• Free trial includes 1 AI generation",
    newTrial: "• 7-day free trial available with annual plan",
  },
  ar: {
    oldMonthly:
      "• شهري: $19.99/شهر — 80 توليد بالذكاء الاصطناعي (وفر 50%)",
    newAnnual:
      "• سنوي: $59.99/سنة — 80 توليد بالذكاء الاصطناعي (وفر 88%)",
    oldTrial:
      "• النسخة التجريبية المجانية تشمل توليد واحد بالذكاء الاصطناعي",
    newTrial:
      "• تجربة مجانية لمدة 7 أيام متاحة مع الاشتراك السنوي",
  },
  cs: {
    oldMonthly:
      "• Měsíční: $19.99/měsíc — 80 AI generací (Ušetřete 50%)",
    newAnnual:
      "• Roční: $59.99/rok — 80 AI generací (Ušetřete 88%)",
    oldTrial: "• Bezplatná zkušební verze zahrnuje 1 AI generaci",
    newTrial: "• 7denní bezplatná zkušební verze s ročním předplatným",
  },
  da: {
    oldMonthly:
      "• Månedligt: $19.99/måned — 80 AI-genereringer (Spar 50%)",
    newAnnual:
      "• Årligt: $59.99/år — 80 AI-genereringer (Spar 88%)",
    oldTrial: "• Gratis prøveversion inkluderer 1 AI-generering",
    newTrial: "• 7-dages gratis prøveversion med årligt abonnement",
  },
  de: {
    oldMonthly:
      "• Monatlich: 19,99 $/Monat — 80 KI-Generierungen (50 % sparen)",
    newAnnual:
      "• Jährlich: 59,99 $/Jahr — 80 KI-Generierungen (88 % sparen)",
    oldTrial: "• Kostenlose Testversion enthält 1 KI-Generierung",
    newTrial: "• 7-tägige kostenlose Testversion mit Jahresabo",
  },
  el: {
    oldMonthly:
      "• Μηνιαία: $19.99/μήνα — 80 AI δημιουργίες (Εξοικονομήστε 50%)",
    newAnnual:
      "• Ετήσια: $59.99/έτος — 80 AI δημιουργίες (Εξοικονομήστε 88%)",
    oldTrial: "• Η δωρεάν δοκιμή περιλαμβάνει 1 AI δημιουργία",
    newTrial: "• 7ημερη δωρεάν δοκιμή με ετήσια συνδρομή",
  },
  es: {
    oldMonthly:
      "• Mensual: $19.99/mes — 80 generaciones IA (Ahorra 50%)",
    newAnnual:
      "• Anual: $59.99/año — 80 generaciones IA (Ahorra 88%)",
    oldTrial: "• La prueba gratuita incluye 1 generación IA",
    newTrial: "• Prueba gratuita de 7 días con plan anual",
  },
  "es-MX": {
    oldMonthly:
      "• Mensual: $19.99/mes — 80 generaciones IA (Ahorra 50%)",
    newAnnual:
      "• Anual: $59.99/año — 80 generaciones IA (Ahorra 88%)",
    oldTrial: "• La prueba gratuita incluye 1 generación IA",
    newTrial: "• Prueba gratuita de 7 días con plan anual",
  },
  fi: {
    oldMonthly:
      "• Kuukausittain: $19.99/kuukausi — 80 AI-generointia (Säästä 50%)",
    newAnnual:
      "• Vuosittain: $59.99/vuosi — 80 AI-generointia (Säästä 88%)",
    oldTrial: "• Ilmainen kokeilu sisältää 1 AI-generoinnin",
    newTrial: "• 7 päivän ilmainen kokeilu vuosipaketilla",
  },
  fr: {
    oldMonthly:
      "• Mensuel : 19,99 $/mois — 80 générations IA (Économisez 50 %)",
    newAnnual:
      "• Annuel : 59,99 $/an — 80 générations IA (Économisez 88 %)",
    oldTrial: "• L'essai gratuit inclut 1 génération IA",
    newTrial: "• Essai gratuit de 7 jours avec l'abonnement annuel",
  },
  he: {
    oldMonthly:
      "• חודשי: $19.99/חודש — 80 יצירות AI (חיסכון 50%)",
    newAnnual:
      "• שנתי: $59.99/שנה — 80 יצירות AI (חיסכון 88%)",
    oldTrial: "• תקופת ניסיון חינם כוללת 1 יצירת AI",
    newTrial: "• תקופת ניסיון חינם של 7 ימים עם מנוי שנתי",
  },
  hi: {
    oldMonthly:
      "• मासिक: $19.99/माह — 80 AI जनरेशन (50% बचत)",
    newAnnual:
      "• वार्षिक: $59.99/वर्ष — 80 AI जनरेशन (88% बचत)",
    oldTrial: "• फ्री ट्रायल में 1 AI जनरेशन शामिल है",
    newTrial: "• वार्षिक प्लान के साथ 7 दिन का फ्री ट्रायल",
  },
  hr: {
    oldMonthly:
      "• Mjesečno: $19.99/mjesec — 80 AI generiranja (Uštedite 50%)",
    newAnnual:
      "• Godišnje: $59.99/godinu — 80 AI generiranja (Uštedite 88%)",
    oldTrial: "• Besplatna probna verzija uključuje 1 AI generiranje",
    newTrial: "• 7-dnevna besplatna probna verzija s godišnjom pretplatom",
  },
  hu: {
    oldMonthly:
      "• Havi: $19.99/hónap — 80 AI generálás (Spórolj 50%-ot)",
    newAnnual:
      "• Éves: $59.99/év — 80 AI generálás (Spórolj 88%-ot)",
    oldTrial: "• Az ingyenes próba 1 AI generálást tartalmaz",
    newTrial: "• 7 napos ingyenes próba az éves előfizetéssel",
  },
  id: {
    oldMonthly:
      "• Bulanan: $19.99/bulan — 80 generasi AI (Hemat 50%)",
    newAnnual:
      "• Tahunan: $59.99/tahun — 80 generasi AI (Hemat 88%)",
    oldTrial: "• Uji coba gratis termasuk 1 generasi AI",
    newTrial: "• Uji coba gratis 7 hari dengan paket tahunan",
  },
  it: {
    oldMonthly:
      "• Mensile: $19.99/mese — 80 generazioni IA (Risparmia 50%)",
    newAnnual:
      "• Annuale: $59.99/anno — 80 generazioni IA (Risparmia 88%)",
    oldTrial: "• La prova gratuita include 1 generazione IA",
    newTrial: "• Prova gratuita di 7 giorni con piano annuale",
  },
  ja: {
    oldMonthly:
      "• 月額：$19.99/月 — AIジェネレーション80回（50%お得）",
    newAnnual:
      "• 年額：$59.99/年 — AIジェネレーション80回（88%お得）",
    oldTrial: "• 無料トライアルにはAIジェネレーション1回が含まれます",
    newTrial: "• 年額プランで7日間の無料トライアル",
  },
  ko: {
    oldMonthly:
      "• 월간: $19.99/월 — AI 생성 80회 (50% 절약)",
    newAnnual:
      "• 연간: $59.99/년 — AI 생성 80회 (88% 절약)",
    oldTrial: "• 무료 체험에는 AI 생성 1회 포함",
    newTrial: "• 연간 요금제로 7일 무료 체험",
  },
  ms: {
    oldMonthly:
      "• Bulanan: $19.99/bulan — 80 penjanaan AI (Jimat 50%)",
    newAnnual:
      "• Tahunan: $59.99/tahun — 80 penjanaan AI (Jimat 88%)",
    oldTrial: "• Percubaan percuma termasuk 1 penjanaan AI",
    newTrial: "• Percubaan percuma 7 hari dengan pelan tahunan",
  },
  nl: {
    oldMonthly:
      "• Maandelijks: $19.99/maand — 80 AI-generaties (Bespaar 50%)",
    newAnnual:
      "• Jaarlijks: $59.99/jaar — 80 AI-generaties (Bespaar 88%)",
    oldTrial: "• Gratis proefversie bevat 1 AI-generatie",
    newTrial: "• 7 dagen gratis proefversie bij jaarabonnement",
  },
  no: {
    oldMonthly:
      "• Månedlig: $19.99/måned — 80 AI-genereringer (Spar 50%)",
    newAnnual:
      "• Årlig: $59.99/år — 80 AI-genereringer (Spar 88%)",
    oldTrial: "• Gratis prøveversjon inkluderer 1 AI-generering",
    newTrial: "• 7-dagers gratis prøveversjon med årsabonnement",
  },
  pl: {
    oldMonthly:
      "• Miesięczna: $19.99/miesiąc — 80 generacji AI (Oszczędź 50%)",
    newAnnual:
      "• Roczna: $59.99/rok — 80 generacji AI (Oszczędź 88%)",
    oldTrial: "• Bezpłatny okres próbny zawiera 1 generację AI",
    newTrial: "• 7-dniowy bezpłatny okres próbny z planem rocznym",
  },
  "pt-BR": {
    oldMonthly:
      "• Mensal: $19.99/mês — 80 gerações IA (Economize 50%)",
    newAnnual:
      "• Anual: $59.99/ano — 80 gerações IA (Economize 88%)",
    oldTrial: "• O teste gratuito inclui 1 geração IA",
    newTrial: "• Teste gratuito de 7 dias com plano anual",
  },
  "pt-PT": {
    oldMonthly:
      "• Mensal: $19.99/mês — 80 gerações IA (Poupe 50%)",
    newAnnual:
      "• Anual: $59.99/ano — 80 gerações IA (Poupe 88%)",
    oldTrial: "• A versão de teste gratuita inclui 1 geração IA",
    newTrial: "• Versão de teste gratuita de 7 dias com plano anual",
  },
  ro: {
    oldMonthly:
      "• Lunar: $19.99/lună — 80 generări AI (Economisește 50%)",
    newAnnual:
      "• Anual: $59.99/an — 80 generări AI (Economisește 88%)",
    oldTrial: "• Versiunea de probă gratuită include 1 generare AI",
    newTrial: "• Perioadă de probă gratuită de 7 zile cu planul anual",
  },
  ru: {
    oldMonthly:
      "• Ежемесячно: $19.99/месяц — 80 ИИ-генераций (Экономия 50%)",
    newAnnual:
      "• Ежегодно: $59.99/год — 80 ИИ-генераций (Экономия 88%)",
    oldTrial: "• Бесплатная пробная версия включает 1 ИИ-генерацию",
    newTrial: "• 7-дневная бесплатная пробная версия с годовой подпиской",
  },
  sv: {
    oldMonthly:
      "• Månadsvis: $19.99/månad — 80 AI-genereringar (Spara 50%)",
    newAnnual:
      "• Årsvis: $59.99/år — 80 AI-genereringar (Spara 88%)",
    oldTrial: "• Gratis provversion inkluderar 1 AI-generering",
    newTrial: "• 7 dagars gratis provversion med årsprenumeration",
  },
  th: {
    oldMonthly:
      "• รายเดือน: $19.99/เดือน — 80 การสร้าง AI (ประหยัด 50%)",
    newAnnual:
      "• รายปี: $59.99/ปี — 80 การสร้าง AI (ประหยัด 88%)",
    oldTrial: "• ทดลองใช้ฟรีรวม 1 การสร้าง AI",
    newTrial: "• ทดลองใช้ฟรี 7 วันกับแผนรายปี",
  },
  tr: {
    oldMonthly:
      "• Aylık: $19.99/ay — 80 AI oluşturma (%50 Tasarruf)",
    newAnnual:
      "• Yıllık: $59.99/yıl — 80 AI oluşturma (%88 Tasarruf)",
    oldTrial: "• Ücretsiz deneme 1 AI oluşturma içerir",
    newTrial: "• Yıllık planla 7 günlük ücretsiz deneme",
  },
  uk: {
    oldMonthly:
      "• Щомісяця: $19.99/місяць — 80 ШІ-генерацій (Економія 50%)",
    newAnnual:
      "• Щорічно: $59.99/рік — 80 ШІ-генерацій (Економія 88%)",
    oldTrial: "• Безкоштовна пробна версія включає 1 ШІ-генерацію",
    newTrial: "• 7-денна безкоштовна пробна версія з річною підпискою",
  },
  vi: {
    oldMonthly:
      "• Hàng tháng: $19.99/tháng — 80 lần tạo AI (Tiết kiệm 50%)",
    newAnnual:
      "• Hàng năm: $59.99/năm — 80 lần tạo AI (Tiết kiệm 88%)",
    oldTrial: "• Bản dùng thử miễn phí bao gồm 1 lần tạo AI",
    newTrial: "• Dùng thử miễn phí 7 ngày với gói năm",
  },
  "zh-Hans": {
    oldMonthly: "• 每月：$19.99/月 — 80次AI生成（节省50%）",
    newAnnual: "• 每年：$59.99/年 — 80次AI生成（节省88%）",
    oldTrial: "• 免费试用包含1次AI生成",
    newTrial: "• 年度计划享7天免费试用",
  },
  "zh-Hant": {
    oldMonthly: "• 每月：$19.99/月 — 80次AI生成（節省50%）",
    newAnnual: "• 每年：$59.99/年 — 80次AI生成（節省88%）",
    oldTrial: "• 免費試用包含1次AI生成",
    newTrial: "• 年度計劃享7天免費試用",
  },
};

let updated = 0;
let errors: string[] = [];

for (const [locale, rep] of Object.entries(replacements)) {
  const filePath = join(ASO_DIR, locale, "metadata.json");

  try {
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    let desc: string = data.full_description;

    if (!desc.includes(rep.oldMonthly)) {
      errors.push(`${locale}: monthly line not found — "${rep.oldMonthly.slice(0, 40)}..."`);
      continue;
    }

    desc = desc.replace(rep.oldMonthly, rep.newAnnual);

    if (desc.includes(rep.oldTrial)) {
      desc = desc.replace(rep.oldTrial, rep.newTrial);
    } else {
      errors.push(`${locale}: trial line not found (non-blocking)`);
    }

    data.full_description = desc;
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
    updated++;
    console.log(`✓ ${locale}`);
  } catch (e: any) {
    errors.push(`${locale}: ${e.message}`);
  }
}

console.log(`\nUpdated: ${updated}/${Object.keys(replacements).length}`);
if (errors.length) {
  console.log("\nIssues:");
  errors.forEach((e) => console.log(`  ⚠ ${e}`));
}
