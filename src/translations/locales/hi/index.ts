/**
 * Hindi locale - merges core + features
 */

import { hiCore } from './core';
import { hiFeatures } from './features';

export const hi = {
  ...hiCore,
  ...hiFeatures,
};
