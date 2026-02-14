/**
 * Traditional Chinese locale - merges core + features
 */

import { zhHantCore } from './core';
import { zhHantFeatures } from './features';

export const zhHant = {
  ...zhHantCore,
  ...zhHantFeatures,
};
