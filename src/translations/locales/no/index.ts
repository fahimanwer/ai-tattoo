/**
 * Norwegian locale - merges core + features
 */

import { noCore } from './core';
import { noFeatures } from './features';

export const no = {
  ...noCore,
  ...noFeatures,
};
