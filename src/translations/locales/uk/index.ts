/**
 * Ukrainian locale - merges core + features
 */
import { ukCore } from './core';
import { ukFeatures } from './features';

export const uk = { ...ukCore, ...ukFeatures };
