import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { changeLanguage, getCurrentLanguage } from '@/src/lib/i18n';
import {
  SUPPORTED_LANGUAGES,
  getLanguageDisplayName,
} from '@/src/translations';
import {
  getStoredLanguage,
  clearStoredLanguage,
  getDeviceLocale,
} from '@/src/lib/i18n/languageDetector';

const RTL_LANGUAGES = ['ar', 'he'] as const;

/** Special code meaning "follow the device/system language" */
const AUTO_LANGUAGE = 'auto' as const;

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

interface UseLanguageReturn {
  /** Resolved language code currently active (e.g. 'en', 'de') */
  currentLanguage: string;
  /** Display name of the current language in its native script */
  currentLanguageName: string;
  /** Whether the user chose "Auto" (system language) */
  isAutoDetect: boolean;
  /** The user's selection — either 'auto' or a specific code */
  selectedLanguage: string;
  isRTL: boolean;
  changeLanguage: (languageCode: string) => Promise<void>;
  availableLanguages: LanguageOption[];
  isChangingLanguage: boolean;
}

const NATIVE_LANGUAGE_NAMES: Record<string, string> = {
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

function isRTLLanguage(code: string): boolean {
  return RTL_LANGUAGES.includes(code as (typeof RTL_LANGUAGES)[number]);
}

function getNativeLanguageName(code: string): string {
  return NATIVE_LANGUAGE_NAMES[code] || code.toUpperCase();
}

function useLanguage(): UseLanguageReturn {
  const { i18n } = useTranslation();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const currentLanguage = i18n.language || getCurrentLanguage();
  const storedLanguage = getStoredLanguage();
  const isAutoDetect = storedLanguage === null;
  const selectedLanguage = isAutoDetect ? AUTO_LANGUAGE : storedLanguage;

  const isRTL = useMemo(
    () => isRTLLanguage(currentLanguage),
    [currentLanguage]
  );

  const currentLanguageName = useMemo(
    () => getLanguageDisplayName(currentLanguage),
    [currentLanguage]
  );

  const availableLanguages = useMemo<LanguageOption[]>(() => {
    return SUPPORTED_LANGUAGES.map((code) => ({
      code,
      name: getLanguageDisplayName(code),
      nativeName: getNativeLanguageName(code),
      isRTL: isRTLLanguage(code),
    }));
  }, []);

  const handleChangeLanguage = useCallback(
    async (languageCode: string): Promise<void> => {
      setIsChangingLanguage(true);
      try {
        if (languageCode === AUTO_LANGUAGE) {
          // Clear stored preference → detector will use device locale
          clearStoredLanguage();
          const deviceLocale = getDeviceLocale();
          await changeLanguage(deviceLocale);
        } else {
          if (languageCode === currentLanguage) return;
          await changeLanguage(languageCode);
        }
      } finally {
        setIsChangingLanguage(false);
      }
    },
    [currentLanguage]
  );

  return {
    currentLanguage,
    currentLanguageName,
    isAutoDetect,
    selectedLanguage,
    isRTL,
    changeLanguage: handleChangeLanguage,
    availableLanguages,
    isChangingLanguage,
  };
}

export {
  useLanguage,
  isRTLLanguage,
  getNativeLanguageName,
  RTL_LANGUAGES,
  AUTO_LANGUAGE,
};
export type { UseLanguageReturn, LanguageOption };
