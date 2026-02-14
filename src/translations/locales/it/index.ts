/**
 * Italian locale - merges core + features
 */

import { itCore } from './core';
import { itFeatures } from './features';

export const it = {
  ...itCore,
  ...itFeatures,
};
