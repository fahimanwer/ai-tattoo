/**
 * Finnish locale - merges core + features
 */

import { fiCore } from './core';
import { fiFeatures } from './features';

export const fi = {
  ...fiCore,
  ...fiFeatures,
};
