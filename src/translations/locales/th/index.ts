/**
 * Thai locale - merges core + features
 */

import { thCore } from './core';
import { thFeatures } from './features';

export const th = {
  ...thCore,
  ...thFeatures,
};
