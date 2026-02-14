/**
 * Spanish locale - merges core + features
 */

import { esCore } from './core';
import { esFeatures } from './features';

export const es = {
  ...esCore,
  ...esFeatures,
};
