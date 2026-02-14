/**
 * Vietnamese locale - merges core + features
 */

import { viCore } from './core';
import { viFeatures } from './features';

export const vi = {
  ...viCore,
  ...viFeatures,
};
