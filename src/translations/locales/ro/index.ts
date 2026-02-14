/**
 * Romanian locale - merges core + features
 */

import { roCore } from './core';
import { roFeatures } from './features';

export const ro = {
  ...roCore,
  ...roFeatures,
};
