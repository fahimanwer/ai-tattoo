/**
 * English locale - merges core + features
 */

import { enCore } from './core';
import { enFeatures } from './features';

export const en = {
  ...enCore,
  ...enFeatures,
};

export type TranslationKeys = typeof en;
