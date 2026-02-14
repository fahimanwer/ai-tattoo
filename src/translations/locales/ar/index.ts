/**
 * Arabic locale - merges core + features
 */

import { arCore } from './core';
import { arFeatures } from './features';

export const ar = {
  ...arCore,
  ...arFeatures,
};
