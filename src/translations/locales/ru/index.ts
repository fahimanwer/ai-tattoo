/**
 * Russian locale - merges core + features
 */

import { ruCore } from './core';
import { ruFeatures } from './features';

export const ru = {
  ...ruCore,
  ...ruFeatures,
};
