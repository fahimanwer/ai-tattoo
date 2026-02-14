/**
 * Malay locale - merges core + features
 */

import { msCore } from './core';
import { msFeatures } from './features';

export const ms = {
  ...msCore,
  ...msFeatures,
};
