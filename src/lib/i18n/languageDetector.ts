/**
 * Custom language detector for i18next
 *
 * Uses expo-sqlite/kv-store for persistence (same as ThemeContext + AppSettings)
 * and expo-localization for device locale detection.
 */
import type { LanguageDetectorModule } from 'i18next';

let _getLocales: (() => { languageCode: string | null }[]) | null = null;
let _Storage: typeof import('expo-sqlite/kv-store').default | null = null;

function getLocalesSafe() {
  try {
    if (!_getLocales) {
      _getLocales = require('expo-localization').getLocales;
    }
    return _getLocales!();
  } catch {
    return [];
  }
}

function getStorage() {
  if (!_Storage) {
    try {
      _Storage = require('expo-sqlite/kv-store').default;
    } catch {
      return null;
    }
  }
  return _Storage;
}

import { isRTLLanguage } from './rtl-constants';

const LANGUAGE_KEY = '@user_language';

/**
 * Get the stored user language preference
 */
function getStoredLanguage(): string | null {
  try {
    const storage = getStorage();
    if (!storage) return null;
    const stored = storage.getItemSync(LANGUAGE_KEY);
    return stored || null;
  } catch (error) {
    console.warn('[i18n] Failed to read stored language:', error);
    return null;
  }
}

/**
 * Store the user's language preference
 */
function storeLanguage(language: string): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.setItemSync(LANGUAGE_KEY, language);
  } catch (error) {
    console.warn('[i18n] Failed to store language:', error);
  }
}

/**
 * Get the device's preferred locale
 * Falls back to 'en' if unable to determine
 */
function getDeviceLocale(): string {
  try {
    const locales = getLocalesSafe();
    if (locales.length > 0) {
      const languageCode = locales[0].languageCode;
      return languageCode || 'en';
    }
  } catch (error) {
    console.warn('[i18n] Failed to get device locale:', error);
  }
  return 'en';
}

/**
 * Clear the stored language preference (reset to device default)
 */
function clearStoredLanguage(): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.removeItemSync(LANGUAGE_KEY);
  } catch (error) {
    console.warn('[i18n] Failed to clear stored language:', error);
  }
}

/**
 * Custom language detector implementing i18next LanguageDetectorModule
 */
const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',

  init: () => {},

  detect: (): string => {
    // Priority 1: User's explicit selection
    const storedLanguage = getStoredLanguage();
    if (storedLanguage) {
      return storedLanguage;
    }

    // Priority 2: Device locale
    return getDeviceLocale();
  },

  cacheUserLanguage: (language: string): void => {
    storeLanguage(language);
  },
};

/**
 * Check if the currently detected language is RTL
 */
function isDetectedLanguageRTL(): boolean {
  const detected = languageDetector.detect();
  const currentLanguage =
    typeof detected === 'string'
      ? detected
      : Array.isArray(detected)
        ? detected[0] || 'en'
        : 'en';
  return isRTLLanguage(currentLanguage);
}

export {
  languageDetector,
  getStoredLanguage,
  storeLanguage,
  clearStoredLanguage,
  getDeviceLocale,
  isDetectedLanguageRTL,
};
