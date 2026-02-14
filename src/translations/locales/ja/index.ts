/**
 * Japanese locale - merges core + features
 */

import { jaCore } from './core';
import { jaFeatures } from './features';

export const ja = {
  ...jaCore,
  ...jaFeatures,
};
