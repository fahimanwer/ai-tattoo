/**
 * Czech locale - merges core + features
 */

import { csCore } from './core';
import { csFeatures } from './features';

export const cs = {
  ...csCore,
  ...csFeatures,
};
