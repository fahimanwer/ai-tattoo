/**
 * Polish locale - merges core + features
 */

import { plCore } from './core';
import { plFeatures } from './features';

export const pl = {
  ...plCore,
  ...plFeatures,
};
