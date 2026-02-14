/**
 * Danish locale - merges core + features
 */

import { daCore } from './core';
import { daFeatures } from './features';

export const da = {
  ...daCore,
  ...daFeatures,
};
