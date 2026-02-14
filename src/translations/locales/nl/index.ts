/**
 * Dutch locale - merges core + features
 */

import { nlCore } from './core';
import { nlFeatures } from './features';

export const nl = {
  ...nlCore,
  ...nlFeatures,
};
