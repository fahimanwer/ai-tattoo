/**
 * Indonesian locale - merges core + features
 */

import { idCore } from './core';
import { idFeatures } from './features';

export const id = {
  ...idCore,
  ...idFeatures,
};
