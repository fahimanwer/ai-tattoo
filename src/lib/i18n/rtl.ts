/**
 * RTL (Right-to-Left) support utilities for Tattoo Design AI
 *
 * Provides static functions for StyleSheet and a reactive hook for components.
 */
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

import { i18n } from './index';
import { isRTLLanguage } from './rtl-constants';

export { RTL_LANGUAGES, isRTLLanguage } from './rtl-constants';
export type { RTLLanguage } from './rtl-constants';

/**
 * Apply RTL layout changes via I18nManager.
 * Note: Requires app restart to take effect.
 */
export function applyRTLLayout(shouldBeRTL: boolean): void {
  I18nManager.allowRTL(shouldBeRTL);
  I18nManager.forceRTL(shouldBeRTL);
}

/**
 * Check if the current native layout is RTL
 */
export function isNativeRTL(): boolean {
  return I18nManager.isRTL;
}

/**
 * Get current RTL status based on current i18n language.
 * Use for static StyleSheet definitions outside components.
 */
export function isCurrentLanguageRTL(): boolean {
  const currentLanguage = i18n.language || 'en';
  return isRTLLanguage(currentLanguage);
}

/**
 * Apply RTL-aware flex direction
 */
export function rtlFlexDirection(
  direction: 'row' | 'column'
): 'row' | 'row-reverse' | 'column' {
  if (direction === 'column') return 'column';
  return isCurrentLanguageRTL() ? 'row-reverse' : 'row';
}

/**
 * Apply RTL-aware text alignment
 */
export function rtlTextAlign(align: 'left' | 'right'): 'left' | 'right' {
  if (!isCurrentLanguageRTL()) return align;
  return align === 'left' ? 'right' : 'left';
}

interface UseRTLReturn {
  isRTL: boolean;
  rtlFlexDirection: (
    direction: 'row' | 'column'
  ) => 'row' | 'row-reverse' | 'column';
  rtlTextAlign: (align: 'left' | 'right') => 'left' | 'right';
}

/**
 * Reactive hook for RTL support in components.
 * Automatically updates when language changes.
 */
export function useRTL(): UseRTLReturn {
  const { i18n: i18nInstance } = useTranslation();

  const currentLanguage = i18nInstance.language || 'en';
  const isRTL = isRTLLanguage(currentLanguage);

  const rtlFlexDirectionFn = (
    direction: 'row' | 'column'
  ): 'row' | 'row-reverse' | 'column' => {
    if (direction === 'column') return 'column';
    return isRTL ? 'row-reverse' : 'row';
  };

  const rtlTextAlignFn = (align: 'left' | 'right'): 'left' | 'right' => {
    if (!isRTL) return align;
    return align === 'left' ? 'right' : 'left';
  };

  return {
    isRTL,
    rtlFlexDirection: rtlFlexDirectionFn,
    rtlTextAlign: rtlTextAlignFn,
  };
}
