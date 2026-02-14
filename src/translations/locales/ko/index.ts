/**
 * Korean locale - merges core + features
 */

import { koCore } from './core';
import { koFeatures } from './features';

export const ko = {
  ...koCore,
  ...koFeatures,
};
