/**
 * German locale - merges core + features
 */

import { deCore } from './core';
import { deFeatures } from './features';

export const de = {
  ...deCore,
  ...deFeatures,
};
