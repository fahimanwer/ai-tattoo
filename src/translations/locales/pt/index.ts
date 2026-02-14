/**
 * Portuguese (Brazil) locale - merges core + features
 */

import { ptCore } from './core';
import { ptFeatures } from './features';

export const pt = {
  ...ptCore,
  ...ptFeatures,
};
