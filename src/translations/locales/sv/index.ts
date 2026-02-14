/**
 * Swedish locale - merges core + features
 */

import { svCore } from './core';
import { svFeatures } from './features';

export const sv = {
  ...svCore,
  ...svFeatures,
};
