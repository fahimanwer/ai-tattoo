/**
 * RTL (Right-to-Left) language constants
 *
 * Pure constants and functions with NO imports to avoid circular dependencies.
 */

/**
 * List of RTL language codes supported by Tattoo Design AI
 */
export const RTL_LANGUAGES = ['ar', 'he'] as const;

/**
 * Type for RTL language codes
 */
export type RTLLanguage = (typeof RTL_LANGUAGES)[number];

/**
 * Check if a language code is RTL
 */
export function isRTLLanguage(languageCode: string): boolean {
  const baseCode = languageCode.split('-')[0].toLowerCase();
  return RTL_LANGUAGES.includes(baseCode as RTLLanguage);
}
