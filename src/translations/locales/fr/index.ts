/**
 * French locale - merges core + features
 */

import { frCore } from './core';
import { frFeatures } from './features';

export const fr = {
  ...frCore,
  ...frFeatures,
};
