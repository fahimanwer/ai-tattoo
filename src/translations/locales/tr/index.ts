/**
 * Turkish locale - merges core + features
 */

import { trCore } from './core';
import { trFeatures } from './features';

export const tr = {
  ...trCore,
  ...trFeatures,
};
