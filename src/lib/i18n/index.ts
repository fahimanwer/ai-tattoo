/**
 * i18next initialization for Tattoo Design AI
 *
 * Configuration:
 * - Custom language detector with expo-sqlite/kv-store persistence
 * - Fallback to English (en)
 * - compatibilityJSON: "v4" for Android Hermes compatibility
 * - useSuspense: false for React Native
 * - Interpolation escaping disabled (React handles it)
 */
import i18n from 'i18next';
import { I18nManager } from 'react-native';
import { initReactI18next } from 'react-i18next';

import { resources, DEFAULT_LANGUAGE } from '@/src/translations';
import { isRTLLanguage } from './rtl-constants';
import { languageDetector } from './languageDetector';

/**
 * Initialize RTL layout based on current language.
 * Call this early in app startup before rendering.
 */
function initializeRTL(languageCode: string): void {
  const shouldBeRTL = isRTLLanguage(languageCode);
  const currentRTL = I18nManager.isRTL;

  if (shouldBeRTL !== currentRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }
}

/**
 * Check if app needs restart after language change (RTL state changed).
 */
function needsRestartForLanguage(newLanguageCode: string): boolean {
  const newRTL = isRTLLanguage(newLanguageCode);
  const currentRTL = I18nManager.isRTL;
  return newRTL !== currentRTL;
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    debug: __DEV__,
    keySeparator: '.',
    nsSeparator: ':',
    defaultNS: 'translation',
    ns: ['translation'],
    returnEmptyString: false,
    saveMissing: __DEV__,
    missingKeyHandler: (lngs, _ns, key) => {
      if (__DEV__) {
        console.warn(`[i18n] Missing translation: ${key} (${lngs.join(', ')})`);
      }
    },
  });

// Register custom formatters
if (i18n.services.formatter) {
  i18n.services.formatter.add('uppercase', (value) => {
    return typeof value === 'string'
      ? value.toUpperCase()
      : String(value ?? '').toUpperCase();
  });

  i18n.services.formatter.add('lowercase', (value) => {
    return typeof value === 'string'
      ? value.toLowerCase()
      : String(value ?? '').toLowerCase();
  });
} else if (__DEV__) {
  console.warn(
    '[i18n] Formatter service not available - custom formatters not registered'
  );
}

/**
 * Change the current language (persists to kv-store via detector)
 */
async function changeLanguage(languageCode: string): Promise<void> {
  try {
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('[i18n] Failed to change language:', error);
    throw error;
  }
}

/**
 * Get the current language code
 */
function getCurrentLanguage(): string {
  return i18n.language || DEFAULT_LANGUAGE;
}

/**
 * Check if translations are loaded and ready
 */
function isI18nReady(): boolean {
  return i18n.isInitialized;
}

export {
  i18n,
  changeLanguage,
  getCurrentLanguage,
  isI18nReady,
  initializeRTL,
  needsRestartForLanguage,
};
export default i18n;
