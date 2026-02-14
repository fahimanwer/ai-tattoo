/**
 * Simplified Chinese locale - merges core + features
 */

import { zhCore } from './core';
import { zhFeatures } from './features';

export const zh = {
  ...zhCore,
  ...zhFeatures,
};
