/**
 * Translation resources bundle for i18next
 *
 * Imports all locale files and exports them as a single resources object.
 * All 32 languages (English + 31 translations) are registered below.
 */

import { en } from './locales/en';
// T1
import { de } from './locales/de';
import { fr } from './locales/fr';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { zh } from './locales/zh';
// T2
import { es } from './locales/es';
import { pt } from './locales/pt';
import { it } from './locales/it';
import { ru } from './locales/ru';
import { tr } from './locales/tr';
import { nl } from './locales/nl';
import { ar } from './locales/ar';
import { zhHant } from './locales/zhHant';
// T3
import { pl } from './locales/pl';
import { sv } from './locales/sv';
import { no } from './locales/no';
import { da } from './locales/da';
import { fi } from './locales/fi';
import { hi } from './locales/hi';
import { th } from './locales/th';
import { vi } from './locales/vi';
import { id } from './locales/id';
import { ms } from './locales/ms';
// T4
import { cs } from './locales/cs';
import { ro } from './locales/ro';
import { el } from './locales/el';
import { he } from './locales/he';
import { hu } from './locales/hu';
import { hr } from './locales/hr';
import { uk } from './locales/uk';
import { ptPT } from './locales/ptPT';

/**
 * Supported language codes
 * Ordered by revenue tier (T1 → T4)
 */
const SUPPORTED_LANGUAGES = [
  // T1 (~65% rev)
  'en',
  'de',
  'fr',
  'ja',
  'ko',
  'zh',
  // T2 (~20% rev)
  'es',
  'pt',
  'it',
  'ru',
  'tr',
  'nl',
  'ar',
  'zhHant',
  // T3 (~10% rev)
  'pl',
  'sv',
  'no',
  'da',
  'fi',
  'hi',
  'th',
  'vi',
  'id',
  'ms',
  // T4 (~5% rev)
  'cs',
  'ro',
  'el',
  'he',
  'hu',
  'hr',
  'uk',
  'ptPT',
] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Translation resources for i18next
 * All non-English locales fall back to English
 */
const resources = {
  en: { translation: en },
  // T1
  de: { translation: de },
  fr: { translation: fr },
  ja: { translation: ja },
  ko: { translation: ko },
  zh: { translation: zh },
  // T2
  es: { translation: es },
  pt: { translation: pt },
  it: { translation: it },
  ru: { translation: ru },
  tr: { translation: tr },
  nl: { translation: nl },
  ar: { translation: ar },
  zhHant: { translation: zhHant },
  // T3
  pl: { translation: pl },
  sv: { translation: sv },
  no: { translation: no },
  da: { translation: da },
  fi: { translation: fi },
  hi: { translation: hi },
  th: { translation: th },
  vi: { translation: vi },
  id: { translation: id },
  ms: { translation: ms },
  // T4
  cs: { translation: cs },
  ro: { translation: ro },
  el: { translation: el },
  he: { translation: he },
  hu: { translation: hu },
  hr: { translation: hr },
  uk: { translation: uk },
  ptPT: { translation: ptPT },
} as const;

/**
 * Display names in native script for the language picker
 */
const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  ru: 'Русский',
  tr: 'Türkçe',
  nl: 'Nederlands',
  ar: 'العربية',
  zhHant: '繁體中文',
  pl: 'Polski',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  hi: 'हिन्दी',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  cs: 'Čeština',
  ro: 'Română',
  el: 'Ελληνικά',
  he: 'עברית',
  hu: 'Magyar',
  hr: 'Hrvatski',
  uk: 'Українська',
  ptPT: 'Português (PT)',
};

function getLanguageDisplayName(code: string): string {
  return LANGUAGE_DISPLAY_NAMES[code] || code.toUpperCase();
}

function isLanguageSupported(code: string): code is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(code as SupportedLanguage);
}

function getLanguageOptions(): {
  code: SupportedLanguage;
  name: string;
}[] {
  return SUPPORTED_LANGUAGES.map((code) => ({
    code,
    name: getLanguageDisplayName(code),
  }));
}

export {
  resources,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageDisplayName,
  isLanguageSupported,
  getLanguageOptions,
};

export type { SupportedLanguage };
